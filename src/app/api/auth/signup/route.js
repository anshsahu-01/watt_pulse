import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { registerUser } from "@/services/authService";

export async function POST(request) {
  const payload = await request.json();
  const result = await registerUser(payload);

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      {
        status: 400,
      },
    );
  }

  const response = NextResponse.json({
    message: result.message,
    redirectTo: "/dashboard",
    user: result.user,
  });

  response.cookies.set(SESSION_COOKIE, result.session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: result.session.expiresAt,
  });

  return response;
}
