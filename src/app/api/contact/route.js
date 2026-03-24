import { NextResponse } from "next/server";
import { createMailTransport, getAdminAddress } from "@/lib/mailer";

export const runtime = "nodejs";

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function POST(request) {
  const { name, email, subject, message } = await request.json();
  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedSubject = String(subject || "").trim();
  const trimmedMessage = String(message || "").trim();

  if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
    return NextResponse.json(
      { message: "All contact fields are required." },
      { status: 400 },
    );
  }

  try {
    const createdAt = new Date();
    const adminAddress = getAdminAddress();
    const transporter = createMailTransport();

    await transporter.sendMail({
      from: adminAddress,
      to: adminAddress,
      replyTo: trimmedEmail,
      subject: `Customer Care: ${trimmedSubject}`,
      text: [
        "A new customer care message was submitted.",
        "",
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Subject: ${trimmedSubject}`,
        `Message: ${trimmedMessage}`,
        `Timestamp: ${formatTimestamp(createdAt)}`,
      ].join("\n"),
    });

    return NextResponse.json({
      message: "Message sent successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to send your message right now.",
        detail:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}
