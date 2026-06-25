"use client";

import { useEffect, useState } from "react";

import { customerService } from "@/src/services/customer.service";
import { Customer } from "@/src/types/customer/customer";

export function useCustomer(id: string) {
  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const result =
        await customerService.getById(id);

      if (result.success) {
        setCustomer(result.data);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  return {
    customer,
    loading,
  };
}