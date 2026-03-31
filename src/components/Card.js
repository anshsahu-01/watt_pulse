function CardIcon({ title }) {
  const strokeMap = {
    default: "#2d6bff",
    electricity: "#f59e0b",
    water: "#2d6bff",
    alerts: "#ef4444",
    carbon: "#1f7a55",
    reports: "#2d6bff",
  };

  const key = title.toLowerCase();
  const stroke = key.includes("electric")
    ? strokeMap.electricity
    : key.includes("water")
      ? strokeMap.water
      : key.includes("alert")
        ? strokeMap.alerts
        : key.includes("carbon")
          ? strokeMap.carbon
          : key.includes("report") || key.includes("device")
            ? strokeMap.reports
            : strokeMap.default;

  if (key.includes("water")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={stroke} strokeWidth="2">
        <path d="M3 9c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1" />
        <path d="M3 14c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1" />
      </svg>
    );
  }

  if (key.includes("electric")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={stroke}>
        <path d="M11 2 6 13h4l-1 9 7-12h-4l2-8Z" />
      </svg>
    );
  }

  if (key.includes("alert")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={stroke} strokeWidth="2">
        <path d="M12 5a4 4 0 0 0-4 4v3.6c0 .5-.2 1-.6 1.4L6 15h12l-1.4-1.4c-.4-.4-.6-.9-.6-1.4V9a4 4 0 0 0-4-4Z" />
        <path d="M10.8 18a1.7 1.7 0 0 0 2.4 0" />
      </svg>
    );
  }

  if (key.includes("carbon")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={stroke} strokeWidth="2">
        <path d="M19 5c-6.5 0-11 3.6-11 8.9 0 2.6 1.9 4.1 4.3 4.1 4.9 0 7.7-5.7 6.7-13Z" />
        <path d="M7 19c1.7-3.2 4.5-5.8 8-7.5" />
      </svg>
    );
  }

  if (key.includes("device")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={stroke} strokeWidth="2">
        <path d="M4 7h11v10H4z" />
        <path d="M16 10h4v7h-4z" />
        <path d="M2 18h16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={stroke} strokeWidth="2">
      <path d="M4 4h6v7H4zM14 4h6v4h-6zM14 10h6v10h-6zM4 13h6v7H4z" />
    </svg>
  );
}

export default function Card({
  title,
  value,
  detail,
  suffix,
}) {
  return (
    <article className="rounded-[0.95rem] border border-[#dbe3f0] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(24,39,75,0.08)] dark:border-[#3a3a3a] dark:bg-[#242424] sm:px-5 xl:px-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[0.82rem] font-medium uppercase tracking-[0.08em] text-[#2d6bff] dark:text-[#2d6bff] sm:text-[0.95rem]">
            {title}
          </div>
          <div className="mt-3 text-[1rem] font-medium text-[#2d6bff] dark:text-[#2d6bff] sm:text-[1.05rem]">
            <span className="font-medium text-[1rem] sm:text-[1.05rem]">
              {value}
            </span>
            {suffix ? <span className="ml-1">{suffix}</span> : null}
          </div>
        </div>
        <div className="shrink-0 pt-0.5">
          <CardIcon title={title} />
        </div>
      </div>
      {detail ? <div className="mt-3 text-[0.78rem] leading-5 text-[#7b879e] dark:text-[#9aa4b8] sm:text-[0.84rem]">{detail}</div> : null}
    </article>
  );
}
