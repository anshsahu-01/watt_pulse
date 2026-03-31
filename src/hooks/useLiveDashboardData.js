"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

const REFRESH_MS = 1000 * 10;

export default function useLiveDashboardData(initialData) {
  const [data, setData] = useState(initialData);

  const refreshData = useEffectEvent(async () => {
    try {
      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      setData(payload);
    } catch {}
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      startTransition(() => {
        refreshData();
      });
    }, REFRESH_MS);

    return () => window.clearInterval(timer);
  }, []);

  return data;
}
