import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppShell({
  pathname,
  user,
  title,
  eyebrow,
  actions,
  children,
}) {
  return (
    <main className="min-h-screen bg-[#edf1f7]">
      <div className="grid min-h-screen xl:grid-cols-[290px_minmax(0,1fr)]">
        <Sidebar pathname={pathname} user={user} />
        <div className="min-w-0">
          <Header title={title} eyebrow={eyebrow} actions={actions} user={user} />
          <div className="section-grid px-5 py-5 md:px-7 md:py-7 xl:px-8 xl:py-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
