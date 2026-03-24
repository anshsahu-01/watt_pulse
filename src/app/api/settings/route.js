import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/security";
import User from "@/models/User";

export async function PATCH(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const { currentPassword, newPassword, notificationsEnabled } = payload;

  await connectDB();
  const user = await User.findById(currentUser.id);

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  if (typeof notificationsEnabled === "boolean") {
    user.notificationsEnabled = notificationsEnabled;
  }

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json(
        { message: "Current password is required to update password." },
        { status: 400 },
      );
    }

    if (!verifyPassword(currentPassword, user.passwordHash)) {
      return NextResponse.json(
        { message: "Current password is incorrect." },
        { status: 400 },
      );
    }

    if (String(newPassword).trim().length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long." },
        { status: 400 },
      );
    }

    user.passwordHash = hashPassword(newPassword);
  }

  await user.save();

  return NextResponse.json({
    message: "Settings updated successfully.",
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      notificationsEnabled: user.notificationsEnabled ?? true,
    },
  });
}
