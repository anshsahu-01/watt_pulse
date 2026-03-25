"use client";

import emailjs from "@emailjs/browser";
import { useState, useTransition } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm({ user }) {
  const [form, setForm] = useState({
    ...initialState,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setDetail("");

    startTransition(async () => {
      try {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          setStatus("Email service is not configured.");
          return;
        }

        await emailjs.send(
          serviceId,
          templateId,
          {
            name: form.name,
            email: form.email,
            from_name: form.name,
            from_email: form.email,
            reply_to: form.email,
            title: form.subject,
            subject: form.subject,
            contact_subject: form.subject,
            message: form.message,
            contact_message: form.message,
            app_name: "Watt Pulse",
          },
          { publicKey },
        );

        setStatus("Message sent successfully.");
        setForm((current) => ({
          ...current,
          subject: "",
          message: "",
        }));
        window.alert("Message sent successfully.");
      } catch (error) {
        setStatus("Unable to send your message right now.");
        setDetail(error instanceof Error ? error.message : "Unexpected EmailJS error.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-8 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Name
          </span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Email
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Subject
          </span>
          <input
            name="subject"
            value={form.subject}
            onChange={updateField}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Message
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            rows={6}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            required
          />
        </label>
      </div>

      {status ? (
        <div className="mt-5 rounded-2xl border border-[#d9dfeb] bg-[#f6f8fd] px-4 py-3 text-sm text-[#22304b] dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white">
          <div>{status}</div>
          {detail ? <div className="mt-2 text-xs opacity-80">{detail}</div> : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-2xl bg-[#8bc0f1] px-5 py-4 text-lg font-medium text-[#10131a] transition hover:bg-[#79b4ea] disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
