"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || "Unable to continue.");
        return;
      }

      setMessage(payload.message);

      if (payload.redirectTo) {
        router.push(payload.redirectTo);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" ? (
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#56637d]">Full name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={updateField}
            className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
            placeholder="Enter your full name"
            required={mode === "signup"}
          />
        </label>
      ) : null}

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#56637d]">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
          placeholder="Enter your email"
          required
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#56637d]">Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={updateField}
          className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
          placeholder="Enter password"
          required
        />
      </label>

      {mode === "login" ? (
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-[#4e42d4]">
            Forgot password?
          </Link>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#4e42d4] px-4 py-3.5 font-medium text-white transition hover:bg-[#4438bf] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending
          ? "Please wait..."
          : mode === "login"
            ? "Log In"
            : "Create Account"}
      </button>

      {message ? (
        <div className="rounded-2xl border border-[#d8ddf2] bg-[#f5f7fd] px-4 py-3 text-sm text-[#445271]">
          {message}
        </div>
      ) : null}
    </form>
  );
}
