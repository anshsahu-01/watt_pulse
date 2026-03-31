import AppShell from "@/components/AppShell";
import CarbonContent from "@/components/CarbonContent";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function CarbonPage() {
  const user = await requireUser();
  const initialData = await getDashboardData();

  return (
    <AppShell
      pathname="/carbon"
      user={user}
      title="CARBON FOOTPRINT"
      eyebrow="Impact Metrics"
    >
      <CarbonContent initialData={initialData} />
    </AppShell>
  );
}
