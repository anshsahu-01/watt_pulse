import AppShell from "@/components/AppShell";
import AreaChart from "@/components/AreaChart";
import Card from "@/components/Card";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export default async function CarbonPage() {
  const user = await requireUser();
  const data = await getDashboardData();

  const chartData = {
    monthlyElectricity: data.monthlyTrends.map((item) => item.electricity),
    monthlyWater: data.monthlyTrends.map((item) => (item.electricity * 0.0775).toFixed(1)),
  };

  return (
    <AppShell
      pathname="/carbon"
      user={user}
      title="CARBON FOOTPRINT"
      eyebrow="Impact Metrics"
    >
      <section className="grid gap-4 xl:grid-cols-4">
        <Card title="Carbon Today" value={data.carbonTodayKg} suffix="kg" detail="Current impact estimate" />
        <Card title="Monthly Avg" value="150" suffix="kg CO2" detail="Average monthly footprint" />
        <Card title="Projected Bill" value={data.projectedBill} detail="Electricity linked cost" />
        <Card title="Alerts" value={data.alertsCount} detail="Open impact alerts" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <AreaChart data={chartData} title="Monthly Carbon Trend" />

        <article className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <h2 className="text-[1.9rem] font-semibold text-[#22304b] dark:text-white">
            Carbon Breakdown
          </h2>
          <div className="mt-6 space-y-3">
            {data.monthlyTrends.map((entry) => (
              <div
                key={entry.month}
                className="flex items-center justify-between rounded-[1.25rem] border border-[#e4e9f4] bg-[#f9fbff] px-4 py-4 dark:border-[#353535] dark:bg-[#2b2b2b]"
              >
                <div>
                  <div className="text-lg font-medium text-[#22304b] dark:text-white">{entry.month}</div>
                  <div className="text-sm text-[#67758f] dark:text-[#9aa4b8]">
                    {entry.electricity} kWh electricity
                  </div>
                </div>
                <div className="metric-text text-xl font-semibold text-[#22304b] dark:text-[#2d6bff]">
                  {(entry.electricity * 0.0775).toFixed(1)} kg
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
