"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart({ data }) {
  if (!data || !data.dailyElectricity || !data.dailyWater) {
    return (
      <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-5 shadow-[0_12px_35px_rgba(24,39,75,0.06)]">
        <h3 className="mb-4 text-lg font-semibold text-[#22304b]">
          Daily Usage (kWh & Liters)
        </h3>
        <p className="text-[#6b7890]">Loading chart...</p>
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
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "#5f6c86" },
    },
    grid: {
      borderColor: "#edf1f7",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#64728b" } },
    },
    yaxis: {
      labels: { style: { colors: "#64728b" } },
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
    <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-5 shadow-[0_12px_35px_rgba(24,39,75,0.06)]">
      <h3 className="mb-4 text-lg font-semibold text-[#22304b]">
        Daily Usage (kWh & Liters)
      </h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
