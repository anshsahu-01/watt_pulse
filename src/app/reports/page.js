import AppShell from "@/components/AppShell";
import AreaChart from "@/components/AreaChart";
import Card from "@/components/Card";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await requireUser();
  const data = await getDashboardData();

  const chartData = {
    monthlyElectricity: data.monthlyTrends.map((item) => item.electricity),
    monthlyWater: data.monthlyTrends.map((item) => item.water),
  };

  const weeklyRows = [
    { label: "Week 1", electricity: 75, water: 600, cost: 45 },
    { label: "Week 2", electricity: 80, water: 650, cost: 48 },
    { label: "Week 3", electricity: 70, water: 580, cost: 42 },
    { label: "Week 4", electricity: 95, water: 670, cost: 52 },
  ];

  return (
    <AppShell
      pathname="/reports"
      user={user}
      title="REPORTS"
      eyebrow="Usage Reports"
    >
      <section className="grid gap-4 xl:grid-cols-5">
        <Card title="Total Electricity" value={data.electricityUsage} suffix="kWh" detail="" />
        <Card title="Total Water" value={data.waterUsage} suffix="L" detail="" />
        <Card title="Carbon Footprint" value="150" suffix="kg CO2" detail="" />
        <Card title="Avg Daily Usage" value="75 kWh / 600 L / 5 kg CO2" detail="" />
        <Card title="Alerts" value={data.alertsCount} detail="" />
      </section>

      <section className="overflow-hidden rounded-[1.5rem] border border-[#dfe5f1] bg-white shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
        <div className="grid grid-cols-4 bg-[#5b9af0] px-6 py-4 text-center text-[1.1rem] font-semibold text-white">
          <div>Week</div>
          <div>Electricity (kWh)</div>
          <div>Water (Liters)</div>
          <div>Cost ($)</div>
        </div>
        {weeklyRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-4 border-t border-[#e5e9f2] px-6 py-5 text-center text-[1.05rem] text-[#22304b] dark:border-[#353535] dark:text-white"
          >
            <div>{row.label}</div>
            <div>{row.electricity}</div>
            <div>{row.water}</div>
            <div>{row.cost}</div>
          </div>
        ))}
      </section>

      <AreaChart data={chartData} title="Monthly Usage Trend" />
    </AppShell>
  );
}
