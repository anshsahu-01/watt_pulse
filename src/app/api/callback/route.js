import { NextResponse } from "next/server";
import { appendCallbackRequest } from "@/lib/callback-store";
import { applyRateLimit } from "@/lib/rate-limit";

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

export async function POST(request) {
  const limit = applyRateLimit(request, "form");

  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: "Too many callback requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const { phone, message = "" } = await request.json();
  const trimmedPhone = String(phone || "").trim();
  const trimmedMessage = String(message || "").trim();

  if (!trimmedPhone) {
    return NextResponse.json(
      { success: false, message: "Phone number is required." },
      { status: 400 },
    );
  }

  if (!isValidPhone(trimmedPhone)) {
    return NextResponse.json(
      {
        success: false,
        message: "Phone number must be numeric and exactly 10 digits.",
      },
      { status: 400 },
    );
  }

  const createdAt = new Date();

  try {
    await appendCallbackRequest({
      phone: trimmedPhone,
      message: trimmedMessage,
      createdAt: createdAt.toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit callback request right now.",
        detail:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}
