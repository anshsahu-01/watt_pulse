import connectDB from "@/lib/db";
import { createSession } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/security";
import User from "@/models/User";
import { validateEmail, validatePassword } from "@/utils/validators";

export async function authenticateUser({ email, password }) {
  await connectDB();

  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!validateEmail(normalizedEmail)) {
    return {
      ok: false,
      message: "Enter a valid email address.",
    };
  }

  if (!validatePassword(password)) {
    return {
      ok: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  const session = await createSession(user._id);

  return {
    ok: true,
    message: "Login successful.",
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
    },
    session,
  };
}

export async function registerUser({ name, email, password }) {
  await connectDB();

  const trimmedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (trimmedName.length < 2) {
    return {
      ok: false,
      message: "Name must contain at least 2 characters.",
    };
  }

  if (!validateEmail(normalizedEmail)) {
    return {
      ok: false,
      message: "Enter a valid email address.",
    };
  }

  if (!validatePassword(password)) {
    return {
      ok: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  const existingUser = await User.findOne({ email: normalizedEmail }).lean();

  if (existingUser) {
    return {
      ok: false,
      message: "An account with this email already exists.",
    };
  }

  const user = await User.create({
    name: trimmedName,
    email: normalizedEmail,
    passwordHash: hashPassword(password),
  });

  const session = await createSession(user._id);

  return {
    ok: true,
    message: "Account created successfully.",
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
    },
    session,
  };
}
