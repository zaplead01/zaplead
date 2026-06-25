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
    setLoading(true);

    const result =
      await pipelineCustomersService.list(
        stageId
      );

    if (!result.success) {
      console.error(result.message);
      setLoading(false);
      return;
    }

    setCustomers(result.data ?? []);
    setLoading(false);
  }, [stageId]);

  useEffect(() => {
    if (!stageId) return;

    load();
  }, [load, stageId]);

  return {
    customers,
    loading,
    reload: load,
  };
}