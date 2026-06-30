"use client";

import { useCallback, useEffect, useState } from "react";
import { reportsService } from "@/src/services/reports.service";

export function useReports() {
  const [reports, setReports] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const data = await reportsService.getReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    reports,
    loading,
    reload: load,
  };
}