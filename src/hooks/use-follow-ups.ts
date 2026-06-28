"use client";

import { useCallback, useEffect, useState } from "react";

import { customerService } from "@/src/services/customer.service";
import { Customer } from "@/src/types/customer/customer";

type FollowUps = {
  overdue: Customer[];
  today: Customer[];
  tomorrow: Customer[];
};

export function useFollowUps() {
  const [followUps, setFollowUps] = useState<FollowUps>({
    overdue: [],
    today: [],
    tomorrow: [],
  });

  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result =
      await customerService.listFollowUps();

    if (!result.success || !result.data) {
      console.error(result.message);
      setLoading(false);
      return;
    }

    setFollowUps(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    followUps,
    loading,
    reload: load,
  };
}