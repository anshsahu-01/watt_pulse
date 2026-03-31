"use client";

import AreaChart from "@/components/AreaChart";
import BarChart from "@/components/BarChart";
import Card from "@/components/Card";
import CardSection from "@/components/CardSection";
import useLiveDashboardData from "@/hooks/useLiveDashboardData";

export default function ElectricityContent({ initialData }) {
  const data = useLiveDashboardData(initialData);
  const chartData = {
    dailyElectricity: data.dailyUsage.map((item) => item.electricity),
    dailyWater: data.dailyUsage.map(() => 0),
    monthlyElectricity: data.monthlyTrends.map((item) => item.electricity),
    monthlyWater: data.monthlyTrends.map(() => 0),
  };

  return (
    <>
      <CardSection title="Electricity KPIs" subtitle="Monitor usage, cost movement, and efficiency trends.">
        <Card title="Electricity Usage" value={data.electricityUsage} suffix="kWh" detail="Current stored usage" />
        <Card title="Projected Bill" value={data.projectedBill} detail="Estimated from current usage trend" />
        <Card
          title="Daily Trend"
          value={data.insights.dailyElectricityTrend.percentage}
          detail={`Direction ${data.insights.dailyElectricityTrend.direction}`}
        />
        <Card title="Carbon Today" value={data.carbonTodayKg} suffix="kg" detail="Derived from energy usage" />
      </CardSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChart data={chartData} />
        <AreaChart data={chartData} />
      </div>
    </>
  );
}
