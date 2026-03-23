import AppShell from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export default async function ReportsPage() {
  const user = await requireUser();
  const data = await getDashboardData();

  return (
    <AppShell
      pathname="/reports"
      user={user}
      title="REPORTS"
      eyebrow="Monthly Summaries"
    >
      <section className="grid gap-5 xl:grid-cols-3">
        {data.reports.map((report) => (
          <article
            key={report.month}
            className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)]"
          >
            <div className="text-sm uppercase tracking-[0.24em] text-[#5a4fd3]">
              {report.month}
            </div>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#66738f]">Electricity cost</span>
                <span className="metric-text text-lg font-semibold text-[#22304b]">
                  {report.electricityCost}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#66738f]">Water usage</span>
                <span className="metric-text text-lg font-semibold text-[#22304b]">
                  {report.waterUsage}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#66738f]">Carbon footprint</span>
                <span className="metric-text text-lg font-semibold text-[#22304b]">
                  {report.carbon}
                </span>
              </div>
            </div>
            <p className="mt-5 rounded-[1.25rem] border border-[#e4e9f4] bg-[#f9fbff] px-4 py-4 text-sm leading-6 text-[#66738f]">
              {report.note}
            </p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
