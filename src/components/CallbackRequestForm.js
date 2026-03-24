"use client";

import { useState, useTransition } from "react";

const initialState = {
  name: "",
  phone: "",
  note: "",
};

export default function CallbackRequestForm({ user }) {
  const [form, setForm] = useState({
    ...initialState,
    name: user?.name || "",
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
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      setStatus(payload.message || "Unable to send callback request.");
      setDetail(payload.detail || "");

      if (response.ok) {
        setForm((current) => ({
          ...current,
          phone: "",
          note: "",
        }));
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
          Book A Callback
        </h3>
        <p className="mt-2 text-[0.98rem] leading-7 text-[#67758f] dark:text-[#9aa4b8]">
          Submit your mobile number and a short note. The request can be sent as an SMS to your support number once the SMS gateway is configured.
        </p>
      </div>

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
            Mobile Number
          </span>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            placeholder="+91XXXXXXXXXX"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#22304b] dark:text-white">
            Small Information
          </span>
          <textarea
            name="note"
            value={form.note}
            onChange={updateField}
            rows={4}
            className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
            placeholder="Tell us what service or issue you want a callback for."
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
        {isPending ? "Submitting..." : "Request Callback"}
      </button>
    </form>
  );
}
