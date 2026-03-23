import { getTelemetryData } from "@/services/telemetryService";

function calculateTrend(current, previous) {
  const delta = current - previous;
  const direction = delta >= 0 ? "up" : "down";
  const percentage = previous ? Math.abs((delta / previous) * 100).toFixed(1) : "0.0";

  return {
    direction,
    percentage: `${percentage}%`,
  };
}

export async function getDashboardData() {
  const telemetry = await getTelemetryData();
  const latestDay = telemetry.dailyUsage.at(-1);
  const previousDay = telemetry.dailyUsage.at(-2) || latestDay;
  const latestMonth = telemetry.monthlyTrends.at(-1);
  const previousMonth = telemetry.monthlyTrends.at(-2) || latestMonth;

  return {
    ...telemetry,
    insights: {
      electricityTrend: calculateTrend(
        latestMonth.electricity,
        previousMonth.electricity,
      ),
      waterTrend: calculateTrend(latestMonth.water, previousMonth.water),
      dailyElectricityTrend: calculateTrend(
        latestDay.electricity,
        previousDay.electricity,
      ),
      dailyWaterTrend: calculateTrend(latestDay.water, previousDay.water),
    },
  };
}

export function getAlertTone(level) {
  if (level === "High") return "border-[#ffd4d0] bg-[#fff6f5] text-[#c15345]";
  if (level === "Medium") return "border-[#ffe4ba] bg-[#fffbf2] text-[#b67218]";
  return "border-[#d7ddff] bg-[#f4f6ff] text-[#4d5dc9]";
}
