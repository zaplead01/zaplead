"use client";

import {
  DollarSign,
  CalendarDays,
  Clock3,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
} from "@/src/components/ui/card";

import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customer: Customer;
};

export function CustomerKpis({
  customer,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 px-6 mt-6">

      <KpiCard
        icon={<DollarSign className="h-5 w-5" />}
        title="Valor"
        value={formatCurrency(
          customer.estimated_value ?? 0
        )}
      />

      <KpiCard
        icon={<CalendarDays className="h-5 w-5" />}
        title="Follow-up"
        value={
          customer.next_follow_up_at
            ? new Date(
                customer.next_follow_up_at
              ).toLocaleDateString("pt-BR")
            : "-"
        }
      />

      <KpiCard
        icon={<Clock3 className="h-5 w-5" />}
        title="Último contato"
        value={
          customer.last_contact_at
            ? new Date(
                customer.last_contact_at
              ).toLocaleDateString("pt-BR")
            : "-"
        }
      />

    </div>
  );
}

type KpiCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function KpiCard({
  icon,
  title,
  value,
}: KpiCardProps) {
  return (
    <Card
      className="
        border-0
        shadow-sm

        transition-all
        duration-200

        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="flex flex-col items-center p-4">

        <div
          className="
            mb-3

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-xl

            bg-primary/10

            text-primary
          "
        >
          {icon}
        </div>

        <p className="text-xs text-muted-foreground">
          {title}
        </p>

        <p className="mt-1 text-center text-sm font-bold">
          {value}
        </p>

      </CardContent>
    </Card>
  );
}