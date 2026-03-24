import AppShell from "@/components/AppShell";
import CallbackRequestForm from "@/components/CallbackRequestForm";
import ContactForm from "@/components/ContactForm";
import { requireUser } from "@/lib/auth";

export default async function MailPage() {
  const user = await requireUser();

  return (
    <AppShell
      pathname="/mail"
      user={user}
      title="MAIL SUPPORT"
      eyebrow="Customer Care"
    >
      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[1.5rem] border border-[#dfe5f1] bg-white p-8 shadow-[0_12px_35px_rgba(24,39,75,0.06)] dark:border-[#353535] dark:bg-[#242424]">
          <h2 className="text-[2rem] font-semibold text-[#22304b] dark:text-white">
            Contact Customer Care
          </h2>
          <p className="mt-4 text-[1rem] leading-7 text-[#67758f] dark:text-[#9aa4b8]">
            Use this page to report dashboard issues, sensor repair requests,
            account access problems, or product feedback. Messages are sent
            directly through the Watt Pulse support channel.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-[#f6f8fd] px-4 py-4 dark:bg-[#2b2b2b]">
              <div className="text-sm uppercase tracking-[0.2em] text-[#5a4fd3]">
                Support Scope
              </div>
              <div className="mt-3 text-[1rem] text-[#22304b] dark:text-white">
                Dashboard issues, sensor anomalies, billing queries, and deployment support.
              </div>
            </div>
            <div className="rounded-2xl bg-[#f6f8fd] px-4 py-4 dark:bg-[#2b2b2b]">
              <div className="text-sm uppercase tracking-[0.2em] text-[#5a4fd3]">
                Callback Requests
              </div>
              <div className="mt-3 text-[1rem] text-[#22304b] dark:text-white">
                Callback requests are emailed to the admin and also stored locally for quick review.
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <ContactForm user={user} />
          <CallbackRequestForm />
        </div>
      </section>
    </AppShell>
  );
}
