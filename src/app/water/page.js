import AppShell from "@/components/AppShell";
import AreaChart from "@/components/AreaChart";
import BarChart from "@/components/BarChart";
import Card from "@/components/Card";
import CardSection from "@/components/CardSection";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function WaterPage() {
  const user = await requireUser();
  const data = await getDashboardData();
  const chartData = {
    dailyElectricity: data.dailyUsage.map(() => 0),
    dailyWater: data.dailyUsage.map((item) => item.water),
    monthlyElectricity: data.monthlyTrends.map(() => 0),
    monthlyWater: data.monthlyTrends.map((item) => item.water),
  };

  return (
    <AppShell
      pathname="/water"
      user={user}
      title="WATER USAGE"
      eyebrow="Flow Analytics"
    >
      <CardSection title="Water KPIs" subtitle="Track flow patterns, alerts, and daily changes.">
        <Card title="Water Usage" value={data.waterUsage} suffix="L" detail="Current stored usage" />
        <Card
          title="Daily Trend"
          value={data.insights.dailyWaterTrend.percentage}
          detail={`Direction ${data.insights.dailyWaterTrend.direction}`}
        />
        <Card title="Alerts" value={data.alertsCount} detail="Current warning count" />
        <Card title="Site" value={data.siteName} detail={data.location} />
      </CardSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChart data={chartData} />
        <AreaChart data={chartData} />
      </div>
    </AppShell>
  );
}
