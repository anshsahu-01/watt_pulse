import AppShell from "@/components/AppShell";
import DashboardContent from "@/components/DashboardContent";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const initialData = await getDashboardData();

  return (
    <AppShell
      pathname="/dashboard"
      user={user}
      title="DASHBOARD"
      eyebrow="Operations Overview"
    >
      <DashboardContent initialData={initialData} />
    </AppShell>
  );
}
