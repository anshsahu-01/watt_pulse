"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AreaChart({ data }) {
  const safeData = {
    monthlyElectricity: data?.monthlyElectricity || [0, 0, 0, 0, 0, 0, 0],
    monthlyWater: data?.monthlyWater || [0, 0, 0, 0, 0, 0, 0],
  };

  const options = {
    chart: { type: "area", toolbar: { show: false } },
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
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "#5f6c86" },
    },
    grid: {
      borderColor: "#edf1f7",
      strokeDashArray: 4,
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    xaxis: {
      labels: { style: { colors: "#64728b" } },
    },
    yaxis: {
      labels: { style: { colors: "#64728b" } },
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
    <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-5 shadow-[0_12px_35px_rgba(24,39,75,0.06)]">
      <h3 className="mb-4 text-lg font-semibold text-[#22304b]">
        Monthly Consumption Trends
      </h3>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}
