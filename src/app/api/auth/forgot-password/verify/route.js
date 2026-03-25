import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { applyRateLimit } from "@/lib/rate-limit";
import { hashPassword } from "@/lib/security";
import PasswordResetOtp from "@/models/PasswordResetOtp";
import User from "@/models/User";
import { validateEmail, validatePassword } from "@/utils/validators";

export const runtime = "nodejs";

export async function POST(request) {
  const limit = applyRateLimit(request, "auth");

  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many OTP verification attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const { email, otp, password } = await request.json();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedOtp = String(otp || "").trim();

  if (!validateEmail(normalizedEmail)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!/^\d{6}$/.test(normalizedOtp)) {
    return NextResponse.json(
      { message: "Enter the 6-digit OTP." },
      { status: 400 },
    );
  }

  if (!validatePassword(password)) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long." },
      { status: 400 },
    );
  }

  await connectDB();

  const user = await User.findOne({ email: normalizedEmail });
  const otpEntry = await PasswordResetOtp.findOne({ email: normalizedEmail });

  if (!user || !otpEntry) {
    return NextResponse.json(
      { message: "OTP has expired or is invalid." },
      { status: 400 },
    );
  }

  if (new Date(otpEntry.expiresAt) <= new Date()) {
    await PasswordResetOtp.deleteOne({ email: normalizedEmail });

    return NextResponse.json(
      { message: "OTP has expired. Request a new one." },
      { status: 400 },
    );
  }

  if (normalizedOtp !== otpEntry.otpCode) {
    return NextResponse.json(
      { message: "Invalid OTP." },
      { status: 400 },
    );
  }

  user.passwordHash = hashPassword(password);
  await user.save();
  await PasswordResetOtp.deleteOne({ email: normalizedEmail });

  return NextResponse.json({
    message: "Password updated successfully. Please sign in.",
    redirectTo: "/login",
  });
}
