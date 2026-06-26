"use client";

import { useCallback, useEffect, useState } from "react";

import { pipelineCustomersService } from "@/src/services/pipeline-customers.service";

import { Customer } from "@/src/types/customer/customer";

export function usePipelineCustomers(
  stageId: string
) {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const load = useCallback(async () => {
    if (!stageId) return;

    setLoading(true);

    const result =
      await pipelineCustomersService.list(stageId);

    if (!result.success) {
      console.error(result.message);
      setLoading(false);
      return;
    }

    setCustomers(result.data ?? []);
    setLoading(false);
  }, [stageId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    customers,
    setCustomers,
    loading,
    reload: load,
  };
}