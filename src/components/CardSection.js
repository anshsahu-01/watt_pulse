export default function CardSection({ title, subtitle, children, columns = 4 }) {
  const gridClass =
    columns === 4
      ? "xl:grid-cols-4"
      : columns === 3
        ? "xl:grid-cols-3"
        : "xl:grid-cols-2";

  return (
    <section className="section-grid">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[1.85rem] font-semibold tracking-[-0.03em] text-[#22304b] dark:text-white xl:text-[2.1rem]">{title}</h2>
          {subtitle ? <p className="mt-2 text-[0.95rem] text-[#6b7890] dark:text-[#9aa4b8]">{subtitle}</p> : null}
        </div>
      </div>
      <div className={`grid gap-5 md:grid-cols-2 ${gridClass}`}>{children}</div>
    </section>
  );
}
