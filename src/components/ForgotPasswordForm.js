"use client";

import emailjs from "@emailjs/browser";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function sendOtpEmail(targetEmail, generatedOtp) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("Email service is not configured.");
    }

    return emailjs.send(
      serviceId,
      templateId,
      {
        name: "Watt Pulse Security",
        email: targetEmail,
        to_email: targetEmail,
        from_name: "Watt Pulse Security",
        from_email: "security@wattpulse.local",
        reply_to: targetEmail,
        title: "Your Watt Pulse OTP",
        subject: "Your Watt Pulse OTP",
        contact_subject: "Your Watt Pulse OTP",
        passcode: generatedOtp,
        time: "10 minutes",
        message: `Your OTP for password reset is ${generatedOtp}. It expires in 10 minutes.`,
        contact_message: `Your OTP for password reset is ${generatedOtp}. It expires in 10 minutes.`,
        app_name: "Watt Pulse",
      },
      { publicKey },
    );
  }

  function requestOtp(event) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/auth/forgot-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || "Unable to request OTP.");
        return;
      }

      if (!payload.otp) {
        setMessage("If the account exists, an OTP has been prepared.");
        return;
      }

      try {
        await sendOtpEmail(email, payload.otp);
        setStep("verify");
        setMessage("OTP sent successfully. Check your email.");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to send OTP email.",
        );
      }
    });
  }

  function resetPassword(event) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || "Unable to reset password.");
        return;
      }

      setMessage(payload.message || "Password updated successfully.");
      window.setTimeout(() => {
        router.push("/login");
      }, 900);
    });
  }

  return step === "request" ? (
    <form onSubmit={requestOtp} className="space-y-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#56637d]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
          placeholder="Enter your email"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#4e42d4] px-4 py-3.5 font-medium text-white transition hover:bg-[#4438bf] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending OTP..." : "Send OTP"}
      </button>

      {message ? (
        <div className="rounded-2xl border border-[#d8ddf2] bg-[#f5f7fd] px-4 py-3 text-sm text-[#445271]">
          {message}
        </div>
      ) : null}
    </form>
  ) : (
    <form onSubmit={resetPassword} className="space-y-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#56637d]">OTP</span>
        <input
          type="text"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          required
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[#56637d]">New Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-[#d7ddeb] bg-white px-4 py-3.5 text-[#1f2d46] outline-none transition focus:border-[#5a4fd3]"
          placeholder="Enter new password"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#4e42d4] px-4 py-3.5 font-medium text-white transition hover:bg-[#4438bf] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Verifying..." : "Verify OTP & Reset Password"}
      </button>

      {message ? (
        <div className="rounded-2xl border border-[#d8ddf2] bg-[#f5f7fd] px-4 py-3 text-sm text-[#445271]">
          {message}
        </div>
      ) : null}
    </form>
  );
}
