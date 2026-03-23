import mongoose from "mongoose";

const DailyUsageSchema = new mongoose.Schema(
  {
    day: String,
    electricity: Number,
    water: Number,
  },
  { _id: false },
);

const MonthlyTrendSchema = new mongoose.Schema(
  {
    month: String,
    electricity: Number,
    water: Number,
  },
  { _id: false },
);

const AlertSchema = new mongoose.Schema(
  {
    title: String,
    level: String,
    description: String,
  },
  { _id: false },
);

const ReportSchema = new mongoose.Schema(
  {
    month: String,
    electricityCost: String,
    waterUsage: String,
    carbon: String,
    note: String,
  },
  { _id: false },
);

const TelemetrySchema = new mongoose.Schema(
  {
    siteName: { type: String, required: true },
    location: { type: String, required: true },
    totalDevices: { type: Number, required: true },
    electricityUsage: { type: Number, required: true },
    waterUsage: { type: Number, required: true },
    alertsCount: { type: Number, required: true },
    carbonTodayKg: { type: Number, required: true },
    projectedBill: { type: String, required: true },
    dailyUsage: { type: [DailyUsageSchema], default: [] },
    monthlyTrends: { type: [MonthlyTrendSchema], default: [] },
    alerts: { type: [AlertSchema], default: [] },
    reports: { type: [ReportSchema], default: [] },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Telemetry ||
  mongoose.model("Telemetry", TelemetrySchema);
