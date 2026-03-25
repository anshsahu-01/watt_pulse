import AppShell from "@/components/AppShell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const notifications = [
  {
    type: "Sensor Repair",
    priority: "High",
    title: "Water flow sensor needs inspection",
    detail: "The YF-S201 line on Basement Block A has inconsistent readings.",
    when: "10 minutes ago",
  },
  {
    type: "Usage Alert",
    priority: "Medium",
    title: "Electricity usage crossed expected range",
    detail: "Evening consumption is 14% above the weekly average.",
    when: "38 minutes ago",
  },
  {
    type: "Maintenance",
    priority: "Low",
    title: "Scheduled dashboard backup completed",
    detail: "Usage reports and historical trend data were synced successfully.",
    when: "Today, 08:45 AM",
  },
  {
    type: "System",
    priority: "Medium",
    title: "Tank overflow rule triggered",
    detail: "Automatic alert raised for sustained water flow beyond expected refill time.",
    when: "Yesterday",
  },
];

function priorityStyle(priority) {
  if (priority === "High") {
    return "border-[#ffd4d0] bg-[#fff3f1] text-[#c64e40] dark:border-[#5a2a26] dark:bg-[#2b1d1c] dark:text-[#ff8f85]";
  }

  if (priority === "Medium") {
    return "border-[#ffe7bf] bg-[#fff8ec] text-[#b6741e] dark:border-[#56411b] dark:bg-[#2a2417] dark:text-[#ffc96f]";
  }

  return "border-[#d7e5ff] bg-[#f3f7ff] text-[#2d6bff] dark:border-[#21345e] dark:bg-[#1a2131] dark:text-[#7aa2ff]";
}

export default async function NotificationsPage() {
  const user = await requireUser();

  return (
    <AppShell
      pathname="/notifications"
      user={user}
      title="NOTIFICATIONS"
      eyebrow="Activity Center"
    >
      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="text-sm uppercase tracking-[0.24em] text-[#5a4fd3]">Open</div>
          <div className="mt-3 text-[2.2rem] font-semibold text-[#22304b] dark:text-white">4</div>
        </div>
        <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="text-sm uppercase tracking-[0.24em] text-[#5a4fd3]">Critical</div>
          <div className="mt-3 text-[2.2rem] font-semibold text-[#22304b] dark:text-white">1</div>
        </div>
        <div className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <div className="text-sm uppercase tracking-[0.24em] text-[#5a4fd3]">Today</div>
          <div className="mt-3 text-[2.2rem] font-semibold text-[#22304b] dark:text-white">3</div>
        </div>
      </section>

      <section className="space-y-4">
        {notifications.map((item) => (
          <article
            key={`${item.title}-${item.when}`}
            className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${priorityStyle(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8190ac] dark:text-[#9aa4b8]">
                    {item.type}
                  </span>
                </div>
                <h2 className="text-[1.45rem] font-semibold text-[#22304b] dark:text-white">
                  {item.title}
                </h2>
                <p className="max-w-3xl text-[1rem] leading-7 text-[#67758f] dark:text-[#9aa4b8]">
                  {item.detail}
                </p>
              </div>
              <div className="text-sm text-[#67758f] dark:text-[#9aa4b8]">{item.when}</div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
