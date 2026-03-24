import { NextResponse } from "next/server";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(request) {
  const { message } = await request.json();
  const openAiKey = process.env.OPENAI_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { reply: "Please send a valid message." },
      { status: 400 },
    );
  }

  if (!openAiKey && !openRouterKey) {
    return NextResponse.json({
      reply:
        "Chatbot is ready, but it needs a configured API key to respond live.",
    });
  }

  try {
    const usingOpenRouter = Boolean(openRouterKey);

    const response = await fetch(
      usingOpenRouter ? OPENROUTER_CHAT_URL : OPENAI_RESPONSES_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usingOpenRouter ? openRouterKey : openAiKey}`,
          ...(usingOpenRouter
            ? {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Watt Pulse",
              }
            : {}),
        },
        body: JSON.stringify(
          usingOpenRouter
            ? {
                model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are the Watt Pulse assistant. Give short, practical answers about dashboard metrics, electricity usage, water monitoring, alerts, reports, and sustainability.",
                  },
                  {
                    role: "user",
                    content: message,
                  },
                ],
              }
            : {
                model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
                input: [
                  {
                    role: "system",
                    content:
                      "You are the Watt Pulse assistant. Give short, practical answers about dashboard metrics, electricity usage, water monitoring, alerts, reports, and sustainability.",
                  },
                  {
                    role: "user",
                    content: message,
                  },
                ],
              },
        ),
      },
    );

    if (!response.ok) {
      const errorPayload = await response.text();

      return NextResponse.json(
        {
          reply:
            "Chat request failed. Check API key, model access, and billing before retrying.",
          detail: errorPayload,
        },
        { status: 500 },
      );
    }

    const payload = await response.json();

    return NextResponse.json({
      reply:
        payload.output_text ||
        payload.choices?.[0]?.message?.content ||
        "No response text returned.",
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Unable to reach the chat service right now. Check network access and API configuration.",
      },
      { status: 500 },
    );
  }
}
