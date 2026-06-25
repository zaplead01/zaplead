"use client";

import { useCallback, useEffect, useState } from "react";

import { dashboardService } from "@/src/services/dashboard.service";
import { DashboardData } from "@/src/types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const data =
        await dashboardService.getDashboard();

      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    dashboard,
    loading,
    reload: load,
  };
}