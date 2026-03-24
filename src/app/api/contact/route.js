import { NextResponse } from "next/server";

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { message: "All contact fields are required." },
      { status: 400 },
    );
  }

  if (!serviceId || !templateId || !publicKey) {
    return NextResponse.json(
      { message: "Mail service is not configured correctly." },
      { status: 500 },
    );
  }

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name,
        email,
        from_name: name,
        from_email: email,
        reply_to: email,
        subject,
        contact_subject: subject,
        message,
        contact_message: message,
        app_name: "Watt Pulse",
      },
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    const response = await fetch(EMAILJS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        {
          message: "Unable to send your message right now.",
          detail,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Message sent successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the mail service right now." },
      { status: 500 },
    );
  }
}
