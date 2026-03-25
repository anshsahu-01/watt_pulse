import AppShell from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import SettingsForm from "@/components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <AppShell
      pathname="/settings"
      user={user}
      title="SETTINGS"
      eyebrow="Account Settings"
    >
      <section className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex flex-col items-center gap-6 rounded-[1.5rem] border border-[#dfe5f1] bg-white p-8 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="grid h-36 w-36 place-items-center rounded-full border-4 border-[#2d6bff] bg-[#eef3ff] text-5xl font-semibold text-[#22304b] dark:bg-[#1f1f1f] dark:text-white">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-[#22304b] dark:text-white">
              {user.name}
            </div>
            <div className="mt-2 text-sm text-[#6b7890] dark:text-[#9aa4b8]">
              {user.email}
            </div>
          </div>
        </aside>

        <SettingsForm user={user} />
      </section>
    </AppShell>
  );
}
