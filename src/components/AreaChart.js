"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AreaChart({ data, title = "Monthly Consumption Trends" }) {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    window.addEventListener("wattpulse-theme-change", syncTheme);
    return () => window.removeEventListener("wattpulse-theme-change", syncTheme);
  }, []);

  const safeData = {
    monthlyElectricity: data?.monthlyElectricity || [0, 0, 0, 0, 0, 0, 0],
    monthlyWater: data?.monthlyWater || [0, 0, 0, 0, 0, 0, 0],
  };

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      animations: { enabled: false },
    },
    colors: ["#246dec", "#4f35a1"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.08,
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: isDark ? "#9aa4b8" : "#5f6c86" },
    },
    grid: {
      borderColor: isDark ? "#4a4a4a" : "#edf1f7",
      strokeDashArray: 4,
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    xaxis: {
      labels: { style: { colors: isDark ? "#818b9d" : "#64728b" } },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#818b9d" : "#64728b" } },
    },
  };

  const series = [
    {
      name: "Electricity (kWh)",
      data: safeData.monthlyElectricity,
    },
    {
      name: "Water (Liters)",
      data: safeData.monthlyWater,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#dfe5f1] bg-white p-4 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424] sm:p-5">
      <h3 className="mb-4 text-lg font-semibold text-[#22304b] dark:text-white">
        {title}
      </h3>
      <Chart options={options} series={series} type="area" height={280} />
    </div>
  );
}
