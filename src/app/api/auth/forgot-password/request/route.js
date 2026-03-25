import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { createOtpCode } from "@/lib/security";
import PasswordResetOtp from "@/models/PasswordResetOtp";
import { applyRateLimit } from "@/lib/rate-limit";
import User from "@/models/User";
import { validateEmail } from "@/utils/validators";

export async function POST(request) {
  const limit = applyRateLimit(request, "auth");

  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many OTP requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const { email } = await request.json();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!validateEmail(normalizedEmail)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  await connectDB();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return NextResponse.json(
      { message: "If the account exists, an OTP has been prepared." },
      { status: 200 },
    );
  }

  const otp = createOtpCode();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  await PasswordResetOtp.findOneAndUpdate(
    { email: normalizedEmail },
    { email: normalizedEmail, otpCode: otp, expiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return NextResponse.json({
    message: "OTP generated successfully.",
    otp,
  });
}
