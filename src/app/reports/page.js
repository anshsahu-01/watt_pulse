import AppShell from "@/components/AppShell";
import ReportsContent from "@/components/ReportsContent";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await requireUser();
  const initialData = await getDashboardData();

  return (
    <AppShell
      pathname="/reports"
      user={user}
      title="REPORTS"
      eyebrow="Usage Reports"
    >
      <ReportsContent initialData={initialData} />
    </AppShell>
  );
}
