import Link from "next/link";
import { BrandMark } from "@/components/Header";
import LogoutButton from "@/components/LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/electricity", label: "Electricity" },
  { href: "/water", label: "Water" },
  { href: "/carbon", label: "Carbon" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar({ pathname, user }) {
  return (
    <aside className="flex min-h-screen flex-col bg-[#2e3d47] px-5 py-6 text-white">
      <Link href="/dashboard" className="flex items-center justify-between gap-3">
        <BrandMark light />
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          Live
        </span>
      </Link>

      <nav className="mt-8 grid gap-2.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                active
                  ? "bg-white/12 text-white"
                  : "text-white/72 hover:bg-white/8 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-2xl bg-white/6 p-4">
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
