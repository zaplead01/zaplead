"use client";

import {
  DollarSign,
  Target,
  Workflow,
  PhoneCall,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";

import { CustomerInfoCard } from "./customer-info-card";

import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customer: Customer;

  editing: boolean;

  form: {
    estimated_value: number;
    lead_source: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

function formatLastContact(date?: string | null) {
  if (!date) return "Nunca realizado";

  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function CustomerNegotiation({
  customer,
  editing,
  form,
  setForm,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Negociação</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        <CustomerInfoCard
          icon={<DollarSign size={18} />}
          title="Valor estimado"
          value={
            editing ? (
              <Input
                type="number"
                value={form.estimated_value}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    estimated_value: Number(
                      e.target.value
                    ),
                  }))
                }
              />
            ) : (
              formatCurrency(
                customer.estimated_value ?? 0
              )
            )
          }
        />

        <CustomerInfoCard
          icon={<Target size={18} />}
          title="Origem"
          value={
            editing ? (
              <Input
                value={form.lead_source}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    lead_source:
                      e.target.value,
                  }))
                }
              />
            ) : (
              customer.lead_source || "-"
            )
          }
        />

        <CustomerInfoCard
          icon={<Workflow size={18} />}
          title="Etapa"
          value={
            customer.pipeline_stage?.name ||
            "Sem etapa"
          }
        />

        <CustomerInfoCard
          icon={<PhoneCall size={18} />}
          title="Último contato"
          value={formatLastContact(customer.last_contact_at)}
        />

      </CardContent>
    </Card>
  );
}