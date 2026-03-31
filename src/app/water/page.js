import AppShell from "@/components/AppShell";
import WaterContent from "@/components/WaterContent";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function WaterPage() {
  const user = await requireUser();
  const initialData = await getDashboardData();

  return (
    <AppShell
      pathname="/water"
      user={user}
      title="WATER USAGE"
      eyebrow="Flow Analytics"
    >
      <WaterContent initialData={initialData} />
    </AppShell>
  );
}
