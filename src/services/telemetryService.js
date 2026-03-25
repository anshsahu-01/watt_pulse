import connectDB from "@/lib/db";
import Telemetry from "@/models/Telemetry";

const seedTelemetry = {
  siteName: "EcoSphere Main Campus",
  location: "Bhopal, Madhya Pradesh",
  totalDevices: 12,
  electricityUsage: 320,
  waterUsage: 4500,
  alertsCount: 3,
  carbonTodayKg: 24.8,
  projectedBill: "Rs 3,120",
  dailyUsage: [
    { day: "Mon", electricity: 10, water: 120 },
    { day: "Tue", electricity: 14, water: 98 },
    { day: "Wed", electricity: 8, water: 138 },
    { day: "Thu", electricity: 6, water: 128 },
    { day: "Fri", electricity: 13, water: 108 },
    { day: "Sat", electricity: 7, water: 123 },
    { day: "Sun", electricity: 9, water: 133 },
  ],
  monthlyTrends: [
    { month: "Jan", electricity: 320, water: 4000 },
    { month: "Feb", electricity: 275, water: 4200 },
    { month: "Mar", electricity: 295, water: 3800 },
    { month: "Apr", electricity: 345, water: 4400 },
    { month: "May", electricity: 398, water: 4650 },
    { month: "Jun", electricity: 378, water: 4320 },
    { month: "Jul", electricity: 362, water: 4560 },
  ],
  alerts: [
    {
      title: "Pump runtime exceeded threshold",
      level: "High",
      description: "Motor pump usage stayed above the normal range for 42 minutes.",
    },
    {
      title: "Water tank refill anomaly",
      level: "Medium",
      description: "Refill cycle completed slower than the average over the last week.",
    },
    {
      title: "Night baseline load elevated",
      level: "Low",
      description: "Standby load stayed slightly above the expected overnight baseline.",
    },
  ],
  reports: [
    {
      month: "January",
      electricityCost: "Rs 2,860",
      waterUsage: "18,900 L",
      carbon: "0.71 tCO2e",
      note: "Lower monthly load after rescheduling the water motor.",
    },
    {
      month: "February",
      electricityCost: "Rs 2,540",
      waterUsage: "17,600 L",
      carbon: "0.64 tCO2e",
      note: "Best utility month with stable usage across all days.",
    },
    {
      month: "March",
      electricityCost: "Rs 2,980",
      waterUsage: "19,420 L",
      carbon: "0.75 tCO2e",
      note: "Cooling and irrigation caused a visible upward trend.",
    },
  ],
};

export async function ensureTelemetrySeed() {
  try {
    await connectDB();
    const existing = await Telemetry.findOne().lean();

    if (existing) {
      return existing;
    }

    const created = await Telemetry.create(seedTelemetry);
    return created.toObject();
  } catch {
    return { ...seedTelemetry };
  }
}

export async function getTelemetryData() {
  return ensureTelemetrySeed();
}
