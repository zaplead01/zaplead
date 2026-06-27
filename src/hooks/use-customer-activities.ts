"use client";

import { useCallback, useEffect, useState } from "react";

import { customerActivityService } from "@/src/services/customer-activity.service";

import { CustomerActivity } from "@/src/types/customer/customer-activity";

export function useCustomerActivities(
  customerId?: string
) {
  const [activities, setActivities] = useState<CustomerActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!customerId) {
      setActivities([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const result =
      await customerActivityService.list(customerId);

    if (!result.success) {
      console.error(result.message);
      setActivities([]);
      setLoading(false);
      return;
    }

    setActivities(result.data ?? []);
    setLoading(false);
  }, [customerId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    activities,
    loading,
    reload: load,
  };
}