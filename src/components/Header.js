import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M10 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function BrandMark({ compact = false, light = false }) {
  const stroke = light ? "#ffffff" : "#102522";
  const fill = light ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.82)";
  const textClass = light ? "text-white" : "text-[#22304b]";
  const metaClass = light ? "text-white/62" : "text-muted";

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <svg
        width={compact ? "44" : "56"}
        height={compact ? "44" : "56"}
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke={stroke}
          strokeWidth="2"
          fill={fill}
        />
        <path
          d="M18 20 25 14 27 23 33 17 30 29 36 29Q42 29 39 35Q36 41 28 39L29 44 20 32 26 32Z"
          fill={stroke}
        />
      </svg>
      {!compact ? (
        <div>
          <div className={`text-[11px] uppercase tracking-[0.34em] ${metaClass}`}>
            WATT
          </div>
          <div className={`-mt-1 text-2xl font-semibold tracking-[0.28em] ${textClass}`}>
            PULSE
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ActionIcon({ label }) {
  const icons = {
    alerts: <BellIcon />,
    inbox: <MailIcon />,
  };

  const hrefs = {
    alerts: "/notifications",
    inbox: "/mail",
  };

  return (
    <Link
      href={hrefs[label]}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#e7eaf4] bg-white text-[11px] font-semibold text-[#25304a] transition hover:bg-[#f5f7fc] dark:border-[#353535] dark:bg-[#242424] dark:text-[#f4f7ff] dark:hover:bg-[#2d2d2d]"
      aria-label={label}
    >
      {icons[label]}
    </Link>
  );
}

export default function Header({ title, eyebrow, actions, user, onMenuClick }) {
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex flex-col gap-4 border-b border-[#dfe5f1] bg-white px-5 py-3 md:flex-row md:items-center md:justify-between md:px-7 xl:left-[290px] xl:px-8 dark:border-[#2d2d2d] dark:bg-[#1f1f1f]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#e7eaf4] bg-white text-[#25304a] xl:hidden dark:border-[#353535] dark:bg-[#242424] dark:text-[#f4f7ff]"
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        <Link href="/dashboard" className="hidden sm:block">
          <BrandMark compact />
        </Link>
        <div>
          {eyebrow ? (
            <div className="text-xs uppercase tracking-[0.28em] text-[#6f7b96] dark:text-[#9aa4b8]">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#22304b] dark:text-white xl:text-3xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actions}
        <ThemeToggle />
        <ActionIcon label="alerts" />
        <ActionIcon label="inbox" />
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5a4fd3] text-sm font-semibold text-white">
          {initial}
        </div>
      </div>
    </header>
  );
}
