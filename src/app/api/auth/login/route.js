import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { applyRateLimit } from "@/lib/rate-limit";
import { authenticateUser } from "@/services/authService";

export async function POST(request) {
  try {
    const limit = applyRateLimit(request, "auth");

    if (!limit.ok) {
      return NextResponse.json(
        { message: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    const payload = await request.json();
    const result = await authenticateUser(payload);

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
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: result.session.expiresAt,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Login failed due to a server or database issue." },
      { status: 500 },
    );
  }
}
