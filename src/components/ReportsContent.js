"use client";

import AreaChart from "@/components/AreaChart";
import Card from "@/components/Card";
import useLiveDashboardData from "@/hooks/useLiveDashboardData";

function getWeeklyRows(data) {
  return [
    {
      label: "Week 1",
      electricity: Number((data.dailyUsage[0].electricity * 6.9).toFixed(1)),
      water: Math.round(data.dailyUsage[0].water * 5.1),
    },
    {
      label: "Week 2",
      electricity: Number((data.dailyUsage[2].electricity * 8.2).toFixed(1)),
      water: Math.round(data.dailyUsage[2].water * 4.8),
    },
    {
      label: "Week 3",
      electricity: Number((data.dailyUsage[4].electricity * 5.9).toFixed(1)),
      water: Math.round(data.dailyUsage[4].water * 5.3),
    },
    {
      label: "Week 4",
      electricity: Number((data.dailyUsage[6].electricity * 8.7).toFixed(1)),
      water: Math.round(data.dailyUsage[6].water * 5),
    },
  ].map((row) => ({
    ...row,
    cost: Math.round(row.electricity * 0.62),
  }));
}

export default function ReportsContent({ initialData }) {
  const data = useLiveDashboardData(initialData);
  const chartData = {
    monthlyElectricity: data.monthlyTrends.map((item) => item.electricity),
    monthlyWater: data.monthlyTrends.map((item) => item.water),
  };
  const totalCarbon = data.monthlyTrends
    .reduce((sum, item) => sum + item.electricity * 0.0775, 0)
    .toFixed(1);
  const avgDailyElectricity = (
    data.dailyUsage.reduce((sum, item) => sum + item.electricity, 0) / data.dailyUsage.length
  ).toFixed(1);
  const avgDailyWater = Math.round(
    data.dailyUsage.reduce((sum, item) => sum + item.water, 0) / data.dailyUsage.length,
  );
  const avgDailyCarbon = (Number(avgDailyElectricity) * 0.0775).toFixed(1);
  const weeklyRows = getWeeklyRows(data);

  return (
    <>
      <section className="grid gap-4 xl:grid-cols-5">
        <Card title="Total Electricity" value={data.electricityUsage} suffix="kWh" detail="" />
        <Card title="Total Water" value={data.waterUsage} suffix="L" detail="" />
        <Card title="Carbon Footprint" value={totalCarbon} suffix="kg CO2" detail="" />
        <Card
          title="Avg Daily Usage"
          value={`${avgDailyElectricity} kWh / ${avgDailyWater} L / ${avgDailyCarbon} kg CO2`}
          detail=""
        />
        <Card title="Alerts" value={data.alertsCount} detail="" />
      </section>

      <section className="overflow-hidden rounded-[1.5rem] border border-[#dfe5f1] bg-white shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
        <div className="hidden grid-cols-4 bg-[#5b9af0] px-6 py-4 text-center text-[1.1rem] font-semibold text-white md:grid">
          <div>Week</div>
          <div>Electricity (kWh)</div>
          <div>Water (Liters)</div>
          <div>Cost ($)</div>
        </div>
        <div className="md:hidden">
          {weeklyRows.map((row) => (
            <div
              key={row.label}
              className="border-t border-[#e5e9f2] px-5 py-4 text-[#22304b] dark:border-[#353535] dark:text-white"
            >
              <div className="text-base font-semibold">{row.label}</div>
              <div className="mt-2 text-sm text-[#67758f] dark:text-[#9aa4b8]">{row.electricity} kWh</div>
              <div className="text-sm text-[#67758f] dark:text-[#9aa4b8]">{row.water} L</div>
              <div className="text-sm text-[#67758f] dark:text-[#9aa4b8]">${row.cost}</div>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
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
        </div>
      </section>

      <AreaChart data={chartData} title="Monthly Usage Trend" />
    </>
  );
}
