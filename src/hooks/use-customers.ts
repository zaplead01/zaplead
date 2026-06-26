"use client";

import { useCallback, useEffect, useState } from "react";

import { customerService } from "@/src/services/customer.service";
import { Customer } from "@/src/types/customer";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    
    setLoading(true);

    const result = await customerService.list();

    if (!result.success) {
      console.error(result.message);
      setCustomers([]);
      setLoading(false);
      return;
    }

    setCustomers(result.data ?? []);
    setLoading(false);
  }, []);

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
