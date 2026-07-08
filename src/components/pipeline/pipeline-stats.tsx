"use client";

import {
  DollarSign,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";
import { KanbanColumn } from "@/src/types/pipeline/kanban-column";

import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customers: Customer[];
  columns: KanbanColumn[];
};

export function PipelineStats({
  customers,
  columns,
}: Props) {
  const totalCustomers = customers.length;

  const totalValue = customers.reduce(
    (sum, customer) =>
      sum + Number(customer.estimated_value ?? 0),
    0
  );

  const wonCustomers =
    columns.find(
      (column) => column.stage.is_won
    )?.customers.length ?? 0;

  const lostCustomers =
    columns.find(
      (column) => column.stage.is_lost
    )?.customers.length ?? 0;

  const conversion =
    totalCustomers === 0
      ? 0
      : Math.round(
          (wonCustomers / totalCustomers) *
            100
        );

  const cards = [
    {
      title: "Clientes",
      value: totalCustomers,
      icon: Users,
    },
    {
      title: "Valor Total",
      value: formatCurrency(totalValue),
      icon: DollarSign,
    },
    {
      title: "Ganhos",
      value: wonCustomers,
      icon: TrendingUp,
    },
    {
      title: "Conversão",
      value: `${conversion}%`,
      icon: Target,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-xl
              border
              bg-card
              px-5 py-3
              transition-all
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {card.title}
              </span>

              <Icon className="h-4 w-4 text-primary" />
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}