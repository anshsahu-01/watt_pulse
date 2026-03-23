import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import CardSection from "@/components/CardSection";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export default async function CarbonPage() {
  const user = await requireUser();
  const data = await getDashboardData();

  const monthlyAverage =
    data.monthlyTrends.reduce((sum, item) => sum + item.electricity, 0) /
    data.monthlyTrends.length;

  return (
    <AppShell
      pathname="/carbon"
      user={user}
      title="CARBON FOOTPRINT"
      eyebrow="Impact View"
    >
      <CardSection title="Impact KPIs" subtitle="Follow impact and conservation performance over time.">
        <Card title="Carbon Today" value={data.carbonTodayKg} suffix="kg" detail="Current impact estimate" />
        <Card title="Monthly Avg" value={monthlyAverage.toFixed(1)} suffix="kWh" detail="Average monthly electricity baseline" />
        <Card title="Projected Bill" value={data.projectedBill} detail="Useful for conservation planning" />
        <Card title="Active Alerts" value={data.alertsCount} detail="Potential sources of avoidable waste" />
      </CardSection>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
        <article className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)]">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#22304b]">
            Monthly impact context
          </h2>
          <div className="mt-5 space-y-3">
            {data.monthlyTrends.map((entry) => (
              <div
                key={entry.month}
                className="flex items-center justify-between rounded-[1.25rem] border border-[#e4e9f4] bg-[#f9fbff] px-4 py-4"
              >
                <div>
                  <div className="font-medium text-[#22304b]">{entry.month}</div>
                  <div className="text-sm text-[#67758f]">{entry.electricity} kWh electricity</div>
                </div>
                <div className="metric-text text-xl font-semibold text-[#22304b]">
                  {(entry.electricity * 0.0775).toFixed(1)} kg
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.5rem] bg-[#2f3d47] p-6 text-white">
          <div className="text-xs uppercase tracking-[0.28em] text-white/60">
            Sustainability Note
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
            Better monitoring creates measurable savings.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/76">
            Carbon output is tied directly to energy usage. As electricity waste
            drops, both cost and emissions move down together. This page stays
            ready for future sensor expansion without changing the overall
            interface.
          </p>
        </article>
      </section>
    </AppShell>
  );
}
