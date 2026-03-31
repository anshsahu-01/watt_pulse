"use client";

import AreaChart from "@/components/AreaChart";
import BarChart from "@/components/BarChart";
import Card from "@/components/Card";
import CardSection from "@/components/CardSection";
import useLiveDashboardData from "@/hooks/useLiveDashboardData";

export default function WaterContent({ initialData }) {
  const data = useLiveDashboardData(initialData);
  const chartData = {
    dailyElectricity: data.dailyUsage.map(() => 0),
    dailyWater: data.dailyUsage.map((item) => item.water),
    monthlyElectricity: data.monthlyTrends.map(() => 0),
    monthlyWater: data.monthlyTrends.map((item) => item.water),
  };

  return (
    <>
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
    </>
  );
}
