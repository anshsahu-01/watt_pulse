"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function AuthPanel() {
  const [mode, setMode] = useState("login");

  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[2rem] bg-white p-8 xl:p-10">
      <div className="mb-8 flex rounded-full bg-[#f1f4fb] p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
            mode === "login"
              ? "bg-[#4e42d4] text-white"
              : "text-[#5a6887] hover:text-[#24324b]"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
            mode === "signup"
              ? "bg-[#4e42d4] text-white"
              : "text-[#5a6887] hover:text-[#24324b]"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#1f2d46]">
        {mode === "login" ? "Sign In" : "Sign Up"}
      </h2>

      <div className="mt-8">
        <AuthForm mode={mode} />
      </div>

      <div className="mt-8 text-center text-sm text-[#7b86a0]">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-semibold text-[#4e42d4]"
        >
          {mode === "login" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
}
