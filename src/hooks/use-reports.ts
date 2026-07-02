"use client";

import { useCallback, useEffect, useState } from "react";

import { reportsService } from "@/src/services/reports";
import type { ReportsFilters } from "@/src/components/reports/report-filters";

export function useReports(filters: ReportsFilters) {
  const [reports, setReports] = useState<
    Awaited<ReturnType<typeof reportsService.getReports>> | null
  >(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await reportsService.getReports(filters);

      setReports(data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    reports,
    loading,
    error,
    reload: load,
  };
}