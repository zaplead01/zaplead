"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/src/types/customer/customer";

import { customerService } from "@/src/services/customer.service";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
  console.log("🚀 LOAD CLIENTES");

  setLoading(true);

  const result = await customerService.list();

  console.log("RESULT:", result);

  if (result.success) {
    console.log("CLIENTES:", result.data?.length);

    setCustomers(result.data ?? []);
  } else {
    console.error("ERRO:", result.message);
  }

  setLoading(false);
}

  useEffect(() => {
    load();
  }, []);

  return {
    customers,
    setCustomers,
    loading,
    reload: load,
  };
}