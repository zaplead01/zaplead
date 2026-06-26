"use client";

import {
  DollarSign,
  Target,
  Workflow,
  UserRound,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { CustomerInfoCard } from "./customer-info-card";

import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customer: Customer;
};

export function CustomerNegotiation({
  customer,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">

      <CardHeader>

        <CardTitle>

          Negociação

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <CustomerInfoCard
          icon={<DollarSign size={18} />}
          title="Valor estimado"
          value={formatCurrency(
            customer.estimated_value ?? 0
          )}
        />

        <CustomerInfoCard
          icon={<Target size={18} />}
          title="Origem"
          value={customer.lead_source}
        />

        <CustomerInfoCard
          icon={<Workflow size={18} />}
          title="Etapa"
          value={
            customer.pipeline_stage?.name ??
            "-"
          }
        />

       <CustomerInfoCard
  icon={<Workflow size={18} />}
  title="Etapa"
  value="-"
/>

<CustomerInfoCard
  icon={<UserRound size={18} />}
  title="Responsável"
  value="-"
/>

      </CardContent>

    </Card>
  );
}