export default function Card({
  title,
  value,
  detail,
  suffix,
}) {
  return (
    <article className="rounded-[1.25rem] border border-[#dfe5f1] bg-white px-5 py-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] xl:px-6">
      <div className="text-sm uppercase tracking-[0.18em] text-[#5a68a4]">{title}</div>
      <div className="metric-text mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#22304b]">
        {value}
        {suffix ? <span className="ml-1 text-xl">{suffix}</span> : null}
      </div>
      {detail ? <div className="mt-3 text-sm text-[#6b7890]">{detail}</div> : null}
    </article>
  );
}
