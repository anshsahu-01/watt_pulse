"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const payload = await response.json();

      if (payload.redirectTo) {
        router.push(payload.redirectTo);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/12 disabled:opacity-70"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
