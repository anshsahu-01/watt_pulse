"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart({ data }) {
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

  if (!data || !data.dailyElectricity || !data.dailyWater) {
    return (
      <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-5 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
        <h3 className="mb-4 text-lg font-semibold text-[#22304b] dark:text-white">
          Daily Usage (kWh & Liters)
        </h3>
        <p className="text-[#6b7890] dark:text-[#9aa4b8]">Loading chart...</p>
      </div>
    );
  }

  const options = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#246dec", "#4f35a1"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
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
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: isDark ? "#818b9d" : "#64728b" } },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#818b9d" : "#64728b" } },
    },
  };

  const series = [
    {
      name: "Electricity (kWh)",
      data: data.dailyElectricity || [],
    },
    {
      name: "Water (Liters)",
      data: data.dailyWater || [],
    },
  ];

  return (
    <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-5 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
      <h3 className="mb-4 text-lg font-semibold text-[#22304b] dark:text-white">
        Daily Usage (kWh & Liters)
      </h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
