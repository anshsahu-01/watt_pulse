"use client";

import Link from "next/link";
import AreaChart from "@/components/AreaChart";
import BarChart from "@/components/BarChart";
import Card from "@/components/Card";
import CardSection from "@/components/CardSection";
import useLiveDashboardData from "@/hooks/useLiveDashboardData";

function getAlertTone(level) {
  if (level === "High") return "border-[#ffd4d0] bg-[#fff6f5] text-[#c15345]";
  if (level === "Medium") return "border-[#ffe4ba] bg-[#fffbf2] text-[#b67218]";
  return "border-[#d7ddff] bg-[#f4f6ff] text-[#4d5dc9]";
}

export default function DashboardContent({ initialData }) {
  const data = useLiveDashboardData(initialData);
  const chartData = {
    dailyElectricity: data.dailyUsage.map((item) => item.electricity),
    dailyWater: data.dailyUsage.map((item) => item.water),
    monthlyElectricity: data.monthlyTrends.map((item) => item.electricity),
    monthlyWater: data.monthlyTrends.map((item) => item.water),
  };

  return (
    <>
      <CardSection
        title="Usage Summary"
        subtitle={`${data.siteName} - ${data.location}`}
      >
        <Card title="Total Devices" value={data.totalDevices} detail="Active utility points" />
        <Card
          title="Electricity Usage"
          value={data.electricityUsage}
          suffix="kWh"
          detail={`Monthly ${data.insights.electricityTrend.direction} ${data.insights.electricityTrend.percentage}`}
        />
        <Card
          title="Water Usage"
          value={data.waterUsage}
          suffix="L"
          detail={`Monthly ${data.insights.waterTrend.direction} ${data.insights.waterTrend.percentage}`}
        />
        <Card title="Alerts" value={data.alertsCount} detail="Open notifications" />
      </CardSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChart data={chartData} />
        <AreaChart data={chartData} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <h2 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[#22304b] dark:text-white sm:text-[1.75rem] xl:text-[1.9rem]">
            Current Alerts
          </h2>
          <div className="mt-5 space-y-3">
            {data.alerts.map((alert) => (
              <div
                key={alert.title}
                className={`rounded-[1.25rem] border px-4 py-4 ${getAlertTone(alert.level)}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{alert.title}</div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] dark:bg-[#1f1f1f]">
                    {alert.level}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6">{alert.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[#22304b] dark:text-white sm:text-[1.75rem] xl:text-[1.9rem]">
              Recent Reports
            </h2>
            <Link
              href="/reports"
              className="rounded-full border border-[#dbe1ef] bg-white px-4 py-2 text-sm font-medium text-[#22304b] transition hover:bg-[#f5f7fd] dark:border-[#353535] dark:bg-[#242424] dark:text-white dark:hover:bg-[#2b2b2b]"
            >
              Reports
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {data.reports.map((report, index) => (
              <div
                key={report.month}
                className="rounded-[1.25rem] border border-[#e4e9f4] bg-[#f9fbff] px-4 py-4 dark:border-[#353535] dark:bg-[#2b2b2b]"
              >
                <div className="metric-text text-xs text-[#5a4fd3]">
                  Report 0{index + 1}
                </div>
                <p className="mt-2 text-base font-semibold text-[#22304b] dark:text-white">{report.month}</p>
                <p className="mt-2 text-sm leading-6 text-[#67758f] dark:text-[#9aa4b8]">{report.note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
