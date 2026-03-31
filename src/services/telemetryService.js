import connectDB from "@/lib/db";
import Telemetry from "@/models/Telemetry";

const TELEMETRY_REFRESH_MS = 1000 * 10;

const seedTelemetry = {
  siteName: "EcoSphere Main Campus",
  location: "Bhopal, Madhya Pradesh",
  totalDevices: 12,
  electricityUsage: 319.4,
  waterUsage: 4487,
  alertsCount: 3,
  carbonTodayKg: 24.7,
  projectedBill: "Rs 3,127",
  dailyUsage: [
    { day: "Mon", electricity: 10.8, water: 118 },
    { day: "Tue", electricity: 13.6, water: 101 },
    { day: "Wed", electricity: 8.7, water: 137 },
    { day: "Thu", electricity: 6.4, water: 126 },
    { day: "Fri", electricity: 12.9, water: 109 },
    { day: "Sat", electricity: 7.3, water: 121 },
    { day: "Sun", electricity: 9.6, water: 132 },
  ],
  monthlyTrends: [
    { month: "Jan", electricity: 318.6, water: 4015 },
    { month: "Feb", electricity: 276.2, water: 4188 },
    { month: "Mar", electricity: 294.1, water: 3826 },
    { month: "Apr", electricity: 346.8, water: 4412 },
    { month: "May", electricity: 397.3, water: 4638 },
    { month: "Jun", electricity: 379.1, water: 4337 },
    { month: "Jul", electricity: 361.5, water: 4549 },
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function toFixedNumber(value, digits = 1) {
  return Number(value.toFixed(digits));
}

function formatRupees(value) {
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}

function shouldRefreshTelemetry(telemetry) {
  if (!telemetry?.updatedAt) {
    return true;
  }

  return Date.now() - new Date(telemetry.updatedAt).getTime() >= TELEMETRY_REFRESH_MS;
}

function applyTelemetryDrift(telemetry) {
  telemetry.electricityUsage = toFixedNumber(
    clamp(telemetry.electricityUsage + randomBetween(-2.8, 3.2), 285, 390),
  );
  telemetry.waterUsage = Math.round(
    clamp(telemetry.waterUsage + randomBetween(-35, 42), 4100, 4900),
  );
  telemetry.alertsCount = Math.round(
    clamp(telemetry.alertsCount + randomBetween(-1, 1), 1, 5),
  );
  telemetry.carbonTodayKg = toFixedNumber(
    clamp(telemetry.carbonTodayKg + randomBetween(-0.5, 0.6), 19.5, 31.5),
  );

  const projectedBillValue = Number(
    String(telemetry.projectedBill || "0").replace(/[^\d.]/g, ""),
  );
  telemetry.projectedBill = formatRupees(
    clamp(projectedBillValue + randomBetween(-38, 44), 2600, 3800),
  );

  telemetry.dailyUsage = telemetry.dailyUsage.map((item) => ({
    ...item,
    electricity: toFixedNumber(
      clamp(item.electricity + randomBetween(-0.8, 0.9), 4.5, 16.5),
    ),
    water: Math.round(clamp(item.water + randomBetween(-4, 5), 82, 152)),
  }));

  telemetry.monthlyTrends = telemetry.monthlyTrends.map((item) => ({
    ...item,
    electricity: toFixedNumber(
      clamp(item.electricity + randomBetween(-4.5, 5.5), 250, 430),
    ),
    water: Math.round(clamp(item.water + randomBetween(-55, 60), 3600, 4900)),
  }));
}

export async function ensureTelemetrySeed() {
  try {
    await connectDB();
    let telemetry = await Telemetry.findOne();

    if (!telemetry) {
      telemetry = await Telemetry.create(seedTelemetry);
      return telemetry.toObject();
    }

    if (shouldRefreshTelemetry(telemetry)) {
      applyTelemetryDrift(telemetry);
      await telemetry.save();
    }

    return telemetry.toObject();
  } catch {
    return { ...seedTelemetry };
  }
}

export async function getTelemetryData() {
  return ensureTelemetrySeed();
}
