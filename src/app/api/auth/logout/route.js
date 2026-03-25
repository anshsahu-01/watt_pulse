import { NextResponse } from "next/server";
import { deleteSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request) {
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  await deleteSession(sessionToken);

  const response = NextResponse.json({
    message: "Logged out successfully.",
    redirectTo: "/login",
  });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
