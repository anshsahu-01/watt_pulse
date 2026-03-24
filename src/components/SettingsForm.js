"use client";

import { useState, useTransition } from "react";

function ToggleRow({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-2xl bg-[#f6f8fd] px-4 py-4 dark:bg-[#2b2b2b]"
    >
      <span className="text-base font-medium text-[#22304b] dark:text-white">
        Notifications
      </span>
      <span
        className={`flex h-8 w-16 items-center rounded-full px-1 transition ${
          enabled ? "bg-[#8bc0f1]" : "bg-[#c8d0df] dark:bg-[#3d4656]"
        }`}
      >
        <span
          className={`h-6 w-6 rounded-full bg-white transition ${
            enabled ? "ml-auto" : "ml-0"
          }`}
        />
      </span>
    </button>
  );
}

export default function SettingsForm({ user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user.notificationsEnabled ?? true,
  );
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          notificationsEnabled,
        }),
      });

      const payload = await response.json();
      setMessage(payload.message || "Unable to update settings.");

      if (response.ok) {
        setCurrentPassword("");
        setNewPassword("");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-8 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]"
    >
      <div className="space-y-10">
        <div>
          <h2 className="text-[2rem] font-semibold text-[#22304b] dark:text-white">
            Profile Information
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[#8bc0f1]" />
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#22304b] dark:text-[#f4f7ff]">
                Name
              </span>
              <input
                readOnly
                value={user.name}
                className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#22304b] dark:text-[#f4f7ff]">
                Email
              </span>
              <input
                readOnly
                value={user.email}
                className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
              />
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-[2rem] font-semibold text-[#22304b] dark:text-white">
            Change Password
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[#8bc0f1]" />
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#22304b] dark:text-[#f4f7ff]">
                Current Password
              </span>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#22304b] dark:text-[#f4f7ff]">
                New Password
              </span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="rounded-2xl border border-[#d9dfeb] bg-white px-4 py-3.5 text-base text-[#22304b] outline-none dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white"
              />
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-[2rem] font-semibold text-[#22304b] dark:text-white">
            Preferences
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[#8bc0f1]" />
          <div className="mt-6">
            <ToggleRow
              enabled={notificationsEnabled}
              onToggle={() => setNotificationsEnabled((current) => !current)}
            />
          </div>
        </div>

        {message ? (
          <div className="rounded-2xl border border-[#d9dfeb] bg-[#f6f8fd] px-4 py-3 text-sm text-[#22304b] dark:border-[#4a4a4a] dark:bg-[#2b2b2b] dark:text-white">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-[#8bc0f1] px-5 py-4 text-lg font-medium text-[#10131a] transition hover:bg-[#79b4ea] disabled:opacity-70"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
