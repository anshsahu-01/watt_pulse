const hourlyElectricity = [
  { hour: "00:00", value: 1.1 },
  { hour: "03:00", value: 0.9 },
  { hour: "06:00", value: 1.4 },
  { hour: "09:00", value: 2.8 },
  { hour: "12:00", value: 3.6 },
  { hour: "15:00", value: 3.2 },
  { hour: "18:00", value: 4.3 },
  { hour: "21:00", value: 2.5 },
];

const hourlyWater = [
  { hour: "00:00", value: 35 },
  { hour: "03:00", value: 18 },
  { hour: "06:00", value: 62 },
  { hour: "09:00", value: 120 },
  { hour: "12:00", value: 145 },
  { hour: "15:00", value: 96 },
  { hour: "18:00", value: 180 },
  { hour: "21:00", value: 110 },
];

const weeklyUsage = [
  { day: "Mon", electricity: 28.6, water: 640, carbon: 23.4 },
  { day: "Tue", electricity: 25.3, water: 590, carbon: 21.1 },
  { day: "Wed", electricity: 31.8, water: 710, carbon: 26.2 },
  { day: "Thu", electricity: 29.7, water: 665, carbon: 24.6 },
  { day: "Fri", electricity: 34.2, water: 745, carbon: 28.4 },
  { day: "Sat", electricity: 37.5, water: 812, carbon: 31.2 },
  { day: "Sun", electricity: 27.4, water: 601, carbon: 22.5 },
];

const deviceBreakdown = [
  { label: "HVAC", value: 34, detail: "Highest evening load" },
  { label: "Motor Pump", value: 22, detail: "Scheduled twice daily" },
  { label: "Lighting", value: 17, detail: "Peak after sunset" },
  { label: "Kitchen", value: 14, detail: "Lunch and dinner spikes" },
  { label: "Misc", value: 13, detail: "Standby devices" },
];

const waterZones = [
  { label: "Kitchen", value: 140, detail: "Dishwashing and cleaning" },
  { label: "Bathroom", value: 190, detail: "Morning and evening usage" },
  { label: "Garden", value: 120, detail: "Irrigation window at 6 PM" },
  { label: "Tank Overflow", value: 55, detail: "Avoidable waste" },
];

const alerts = [
  {
    title: "Evening peak crossing threshold",
    level: "High",
    description:
      "Power draw crossed the preferred 4.0 kW mark between 6 PM and 7 PM.",
  },
  {
    title: "Tank overflow pattern detected",
    level: "Medium",
    description:
      "Water flow persisted for 12 minutes after tank fill target was reached.",
  },
  {
    title: "Standby consumption is elevated",
    level: "Low",
    description:
      "Night-time base load is 18% higher than the efficient baseline this week.",
  },
];

const tips = [
  "Shift the water motor run from 6:00 PM to 4:30 PM to flatten your combined utility peak.",
  "Replace the two oldest tube lights in the corridor with LEDs to save about 1.8 kWh per week.",
  "Install an automatic tank cut-off to prevent recurring overflow loss.",
];

const monthlyReports = [
  {
    month: "January",
    electricityCost: "Rs 2,860",
    waterUsage: "18,900 L",
    carbon: "0.71 tCO2e",
    note: "Lower than monthly average after reducing pump runtime.",
  },
  {
    month: "February",
    electricityCost: "Rs 2,540",
    waterUsage: "17,600 L",
    carbon: "0.64 tCO2e",
    note: "Best month so far for energy control.",
  },
  {
    month: "March",
    electricityCost: "Rs 2,980",
    waterUsage: "19,420 L",
    carbon: "0.75 tCO2e",
    note: "Garden irrigation and cooling load increased.",
  },
];

export const mockTelemetry = {
  site: {
    name: "EcoSphere Pilot Home",
    location: "Bhopal, Madhya Pradesh",
    mode: "Sensor simulation",
    updatedAt: "2026-03-23T19:45:00+05:30",
  },
  summary: {
    activePowerKw: 3.8,
    dailyEnergyKwh: 29.8,
    waterTodayLitres: 821,
    monthlyBillProjection: "Rs 3,120",
    peakHour: "18:00",
    leakageRisk: "Moderate",
    carbonTodayKg: 24.7,
    optimizationSavings: "Rs 420",
    uptime: "99.2%",
  },
  hourlyElectricity,
  hourlyWater,
  weeklyUsage,
  deviceBreakdown,
  waterZones,
  alerts,
  tips,
  monthlyReports,
};

