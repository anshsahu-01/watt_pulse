"use client";

import emailjs from "@emailjs/browser";
import { useState, useTransition } from "react";

const initialState = {
  phone: "",
  message: "",
};

export default function CallbackRequestForm() {
  const [form, setForm] = useState(initialState);
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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setStatus("Email service is not configured.");
        return;
      }

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: "Callback Request",
            email: "callback@wattpulse.local",
            from_name: "Callback Request",
            from_email: "callback@wattpulse.local",
            reply_to: "callback@wattpulse.local",
            title: "New Callback Request",
            subject: "New Callback Request",
            contact_subject: "New Callback Request",
            message: [
              `Phone number: ${form.phone}`,
              `Message: ${form.message || "No message provided."}`,
            ].join("\n"),
            contact_message: [
              `Phone number: ${form.phone}`,
              `Message: ${form.message || "No message provided."}`,
            ].join("\n"),
            app_name: "Watt Pulse",
          },
          { publicKey },
        );

        try {
          const response = await fetch("/api/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          const payload = await response.json();

          if (!response.ok || !payload.success) {
            console.error(
              "Callback request storage failed:",
              payload.message || "Unknown callback storage error.",
            );
          }
        } catch (storageError) {
          console.error("Callback request storage failed:", storageError);
        }

        setStatus("Callback request submitted successfully.");
        setForm(initialState);
        window.alert("Callback request submitted successfully.");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to submit callback request right now.";
        setStatus("Unable to submit callback request right now.");
        setDetail(message);
        window.alert(message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-8 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]"
    >
      <div className="mb-6">
        <h3 className="text-[1.6rem] font-semibold text-[#22304b] dark:text-white">
          Request A Callback
        </h3>
        <p className="mt-2 text-[0.98rem] leading-7 text-[#67758f] dark:text-[#9aa4b8]">
          Share your phone number and an optional message. Our team will review the request and reach out.
        </p>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Phone Number
          </span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={updateField}
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            placeholder="9876543210"
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
            rows={4}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            placeholder="Tell us what you need help with."
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
        {isPending ? "Submitting..." : "Submit Callback Request"}
      </button>
    </form>
  );
}
