"use client";

import { useState, useTransition } from "react";

const starterMessages = [
  {
    role: "assistant",
    content: "Ask me about electricity usage, water trends, alerts, or reports.",
  },
];

function BotIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden="true">
      <rect x="14" y="18" width="36" height="28" rx="12" fill="white" fillOpacity="0.16" />
      <rect x="18" y="22" width="28" height="20" rx="8" fill="white" />
      <circle cx="28" cy="32" r="3.5" fill="#4e42d4" />
      <circle cx="36" cy="32" r="3.5" fill="#4e42d4" />
      <path d="M25 39c2.5 2 11.5 2 14 0" stroke="#4e42d4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 11v8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="9" r="4" fill="#d9d3ff" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isPending, startTransition] = useTransition();

  function sendMessage(event) {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");

    startTransition(async () => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      const payload = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: payload.reply || "I could not generate a response.",
        },
      ]);
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="mb-4 flex h-[500px] w-[340px] flex-col overflow-hidden rounded-[1.5rem] border border-[#dfe5f1] bg-white shadow-[0_20px_60px_rgba(24,39,75,0.18)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="flex items-center justify-between bg-[#4e42d4] px-4 py-3 text-white">
            <div>
              <div className="text-sm font-semibold">Watt Pulse Assistant</div>
              <div className="text-xs text-white/75">Resource support</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/12 px-3 py-1 text-xs"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f9fd] p-4 dark:bg-[#1b1b1b]">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-[#4e42d4] text-white"
                    : "bg-white text-[#22304b] shadow-sm dark:bg-[#242424] dark:text-white"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="border-t border-[#e5e9f2] bg-white p-4 dark:border-[#353535] dark:bg-[#242424]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-xl border border-[#d7ddeb] px-4 py-3 text-sm outline-none focus:border-[#4e42d4] dark:border-[#353535] dark:bg-[#1b1b1b] dark:text-white"
              />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-[#4e42d4] px-4 py-3 text-sm font-medium text-white disabled:opacity-70"
              >
                {isPending ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="grid h-16 w-16 place-items-center rounded-full bg-[#4e42d4] text-white shadow-[0_18px_40px_rgba(78,66,212,0.35)] transition hover:bg-[#4338ca]"
        aria-label="Open chatbot"
      >
        <BotIcon />
      </button>
    </div>
  );
}
