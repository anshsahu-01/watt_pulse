"use client";

import Link from "next/link";
import { BrandMark } from "@/components/Header";
import LogoutButton from "@/components/LogoutButton";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13 2 6 14h5l-1 8 8-12h-5l0-8Z" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 15c1.2 1 2.4 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0M4 11c1.2 1 2.4 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0 2.3 1 3.5 0M7 19c1.2 1 2.4 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" />
      <path d="M5 19c2-5 6-9 11-11" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" />
      <path d="M8 16V9M12 16V6M16 16v-4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: <DashboardIcon /> },
  { href: "/electricity", label: "Electricity", icon: <BoltIcon /> },
  { href: "/water", label: "Water", icon: <WaterIcon /> },
  { href: "/carbon", label: "Carbon", icon: <LeafIcon /> },
  { href: "/reports", label: "Reports", icon: <ReportIcon /> },
  { href: "/settings", label: "Settings", icon: <SettingsIcon /> },
];

export default function Sidebar({ pathname, user, isOpen = false, onClose }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[min(84vw,290px)] flex-col bg-[#2e3d47] px-4 py-5 text-white transition-transform duration-300 dark:bg-[#1a1a1a] xl:w-[290px] xl:px-5 xl:py-6 xl:z-30 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0`}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/dashboard" className="flex items-center justify-between gap-3" onClick={onClose}>
          <BrandMark light />
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70 dark:bg-white/5">
            Live
          </span>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white dark:bg-white/5 xl:hidden"
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <nav className="mt-6 grid gap-2.5 xl:mt-8">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                active
                  ? "bg-white/12 text-white dark:bg-[#242424]"
                  : "text-white/72 hover:bg-white/8 hover:text-white dark:text-white/80 dark:hover:bg-[#222222]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-white/90">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 xl:space-y-4">
        <div className="rounded-2xl bg-white/6 p-3.5 dark:bg-[#242424] xl:p-4">
          <div className="text-xs uppercase tracking-[0.28em] text-white/58">
            Signed in as
          </div>
          <div className="mt-3 text-base font-semibold">{user?.name || "User"}</div>
          <div className="mt-1 text-sm text-white/60">{user?.email || ""}</div>
        </div>
        
        <LogoutButton />
      </div>
    </aside>
  );
}
