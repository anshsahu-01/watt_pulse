import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { getDatabaseErrorMessage } from "@/lib/api-errors";
import { applyRateLimit } from "@/lib/rate-limit";
import { registerUser } from "@/services/authService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const limit = applyRateLimit(request, "auth");

    if (!limit.ok) {
      return NextResponse.json(
        { message: "Too many signup attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

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
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: result.session.expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Signup route failed:", error);

    return NextResponse.json(
      {
        message: getDatabaseErrorMessage(
          error,
          "Signup failed due to a server or database issue.",
        ),
      },
      { status: 500 },
    );
  }
}
