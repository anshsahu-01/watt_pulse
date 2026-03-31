import AppShell from "@/components/AppShell";
import ElectricityContent from "@/components/ElectricityContent";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function ElectricityPage() {
  const user = await requireUser();
  const initialData = await getDashboardData();

  return (
    <AppShell
      pathname="/electricity"
      user={user}
      title="ELECTRICITY USAGE"
      eyebrow="Consumption Analytics"
    >
      <ElectricityContent initialData={initialData} />
    </AppShell>
  );
}
