import AppShell from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

const settings = [
  {
    title: "Data Mode",
    value: "Live Demo",
    detail: "Current values power the dashboard, reports, and alerts view.",
  },
  {
    title: "Session Mode",
    value: "Cookie Auth",
    detail: "Login state is stored in an httpOnly session cookie.",
  },
  {
    title: "Telemetry Source",
    value: "Usage Feed",
    detail: "Dashboard values stay consistent across overview, reports, and charts.",
  },
  {
    title: "Protection",
    value: "Authenticated Routes",
    detail: "Dashboard pages redirect to login when no active session exists.",
  },
];

export default async function SettingsPage() {
  const user = await requireUser();
  const data = await getDashboardData();

  return (
    <AppShell
      pathname="/settings"
      user={user}
      title="SETTINGS"
      eyebrow="System Configuration"
    >
      <section className="grid gap-5 md:grid-cols-2">
        {settings.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)]"
          >
            <div className="text-sm text-[#66738f]">{item.title}</div>
            <div className="mt-3 text-2xl font-semibold text-[#22304b]">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-[#66738f]">{item.detail}</p>
          </article>
        ))}
      </section>

      <article className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)]">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#22304b]">
          Current dataset
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#66738f]">
          Site: {data.siteName} | Location: {data.location} | Devices: {data.totalDevices}
        </p>
      </article>
    </AppShell>
  );
}
