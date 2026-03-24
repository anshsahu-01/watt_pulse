import { NextResponse } from "next/server";

const TWILIO_BASE_URL = "https://api.twilio.com/2010-04-01/Accounts";

function formatCallbackMessage({ name, phone, note }) {
  return [
    "New Watt Pulse callback request.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Info: ${note || "No extra details provided."}`,
  ].join("\n");
}

export async function POST(request) {
  const { name, phone, note } = await request.json();

  if (!name || !phone) {
    return NextResponse.json(
      { message: "Name and mobile number are required." },
      { status: 400 },
    );
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const toNumber = process.env.TWILIO_TO_NUMBER;

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    return NextResponse.json(
      {
        message:
          "Callback SMS is not configured yet. Add Twilio credentials to enable it.",
      },
      { status: 500 },
    );
  }

  const body = new URLSearchParams({
    To: toNumber,
    From: fromNumber,
    Body: formatCallbackMessage({ name, phone, note }),
  });

  try {
    const response = await fetch(
      `${TWILIO_BASE_URL}/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        {
          message: "Unable to send the callback SMS right now.",
          detail,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Callback request sent successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the SMS service right now." },
      { status: 500 },
    );
  }
}
