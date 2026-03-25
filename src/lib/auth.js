import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Session from "@/models/Session";
import User from "@/models/User";
import { createSessionToken } from "@/lib/security";

export const SESSION_COOKIE = "wattpulse_session";

export async function createSession(userId) {
  await connectDB();

  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await Session.create({
    userId,
    token,
    expiresAt,
  });

  return { token, expiresAt };
}

export async function deleteSession(token) {
  if (!token) {
    return;
  }

  await connectDB();
  await Session.deleteOne({ token });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  await connectDB();

  const session = await Session.findOne({ token }).lean();

  if (!session) {
    return null;
  }

  if (new Date(session.expiresAt) <= new Date()) {
    await Session.deleteOne({ token });
    return null;
  }

  const user = await User.findById(session.userId).select("-passwordHash").lean();

  if (!user) {
    return null;
  }

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    notificationsEnabled: user.notificationsEnabled ?? true,
  };
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
