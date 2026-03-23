import Link from "next/link";

export function BrandMark({ compact = false, light = false }) {
  const stroke = light ? "#ffffff" : "#102522";
  const fill = light ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.82)";
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
  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-full border border-[#e7eaf4] bg-white text-[11px] font-semibold text-[#25304a] transition hover:bg-[#f5f7fc]"
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default function Header({ title, eyebrow, actions, user }) {
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="flex flex-col gap-4 border-b border-[#dfe5f1] bg-white px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7 xl:px-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="hidden sm:block">
          <BrandMark compact />
        </Link>
        <div>
          {eyebrow ? (
            <div className="text-xs uppercase tracking-[0.28em] text-[#6f7b96]">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[#22304b] xl:text-4xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actions}
        <ActionIcon label="UI" />
        <ActionIcon label="AL" />
        <ActionIcon label="EM" />
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5a4fd3] text-sm font-semibold text-white">
          {initial}
        </div>
      </div>
    </header>
  );
}
