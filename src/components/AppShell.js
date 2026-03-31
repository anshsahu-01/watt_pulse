"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

export default function AppShell({
  pathname,
  user,
  title,
  eyebrow,
  actions,
  children,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSidebarOpen]);

  return (
    <main className="min-h-screen bg-[#edf1f7] dark:bg-[#121212]">
      <Sidebar
        pathname={pathname}
        user={user}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div className="min-w-0 xl:pl-[290px]">
        <Header
          title={title}
          eyebrow={eyebrow}
          actions={actions}
          user={user}
          onMenuClick={() => setMobileSidebarOpen((current) => !current)}
        />
        <div className="section-grid px-4 py-4 pt-[8.75rem] sm:px-5 sm:pt-[9.25rem] md:px-7 md:py-7 md:pt-28 xl:px-8 xl:py-8 xl:pt-28">
          {children}
        </div>
        <ChatWidget />
      </div>
      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#0f1724]/45 xl:hidden"
        />
      ) : null}
    </main>
  );
}
