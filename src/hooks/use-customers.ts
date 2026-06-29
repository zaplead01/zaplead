"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/src/types/customer/customer";

import { customerService } from "@/src/services/customer.service";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const result =
      await customerService.list();

    if (result.success) {
      setCustomers(result.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    customers,
    loading,
    reload: load,
  };
}