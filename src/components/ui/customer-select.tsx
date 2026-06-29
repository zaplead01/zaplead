"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";

import { customerService } from "@/src/services/customer.service";
import { Customer } from "@/src/types/customer/customer";

type Props = {
  value?: string;
  onChange: (customerId: string) => void;
};

export function CustomerSelect({
  value,
  onChange,
}: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);

      try {
        const result = await customerService.list();

        if (result.success && result.data) {
          setCustomers(result.data);
        } else {
          setCustomers([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === value);
  }, [customers, value]);

  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <span className="truncate text-sm">
          {loading
            ? "Carregando clientes..."
            : selectedCustomer
            ? `${selectedCustomer.full_name}${
                selectedCustomer.company
                  ? ` • ${selectedCustomer.company}`
                  : ""
              }`
            : "Selecione um cliente"}
        </span>
      </SelectTrigger>

      <SelectContent>
        {customers.length === 0 ? (
          <SelectItem value="__empty" disabled>
            Nenhum cliente encontrado
          </SelectItem>
        ) : (
          customers.map((customer) => (
            <SelectItem
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
              {customer.company
                ? ` • ${customer.company}`
                : ""}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}