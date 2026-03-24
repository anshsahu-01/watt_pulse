import { NextResponse } from "next/server";
import { appendCallbackRequest } from "@/lib/callback-store";
import { createMailTransport, getAdminAddress } from "@/lib/mailer";

export const runtime = "nodejs";

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

export async function POST(request) {
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
    const adminAddress = getAdminAddress();
    const transporter = createMailTransport();

    await transporter.sendMail({
      from: adminAddress,
      to: adminAddress,
      subject: "New Callback Request",
      text: [
        "A new callback request was submitted.",
        "",
        `Phone number: ${trimmedPhone}`,
        `Message: ${trimmedMessage || "No message provided."}`,
        `Timestamp: ${formatTimestamp(createdAt)}`,
      ].join("\n"),
    });

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
