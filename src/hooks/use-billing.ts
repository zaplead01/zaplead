"use client";

import { useCallback, useEffect, useState } from "react";

import { billingService } from "@/src/services/billing.service";

type BillingData = Awaited<
  ReturnType<typeof billingService.getBilling>
> extends { data: infer T }
  ? T
  : never;

export function useBilling() {
  const [billing, setBilling] =
    useState<BillingData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result =
      await billingService.getBilling();

    if (result.success) {
      setBilling(result.data ?? null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    billing,
    loading,
    reload: load,
  };
}