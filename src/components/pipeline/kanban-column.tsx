"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDroppable } from "@dnd-kit/core";

import { KanbanColumn as KanbanColumnType } from "@/src/types/pipeline/kanban-column";

import { CustomerCard } from "./customer-card";

import { formatCurrency } from "@/src/utils/currency";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type Props = {
  column: KanbanColumnType;
};

 export function KanbanColumn({
  column,
  onCustomerClick,
}: Props) {
  const stage = column.stage;
  const stageCustomers = column.customers;

  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  });

  const totalValue = stageCustomers.reduce(
    (total, customer) =>
      total + (customer.estimated_value ?? 0),
    0
  );
  type Props = {
  column: KanbanColumnType;
  onCustomerClick: (
    customer: Customer
  ) => void;
};

  return (
    <Card
      ref={setNodeRef}
      className={`
        w-80
        shrink-0
        rounded-2xl
        border
        bg-card/90
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        ${
          isOver
            ? `
              border-primary
              shadow-2xl
              ring-2
              ring-primary/20
              scale-[1.015]
            `
            : ""
        }
      `}
    >
      <CardHeader className="space-y-5 p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full shadow-md"
                style={{
                  backgroundColor: stage.color,
                  boxShadow: `0 0 10px ${stage.color}`,
                }}
              />

              <CardTitle className="text-lg font-bold tracking-tight">
                {stage.name}
              </CardTitle>
            </div>

            <p className="text-sm text-muted-foreground">
              {stageCustomers.length}{" "}
              {stageCustomers.length === 1
                ? "cliente"
                : "clientes"}
            </p>
          </div>

          <div
            className={`
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-full
              text-sm
              font-bold
              transition-all

              ${
                isOver
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            {stageCustomers.length}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Valor da etapa
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {formatCurrency(totalValue)}
          </p>
        </div>
      </CardHeader>

      <div className="mx-5 h-px bg-border" />

      <CardContent className="space-y-3 p-5 min-h-[520px]">
        <SortableContext
          items={stageCustomers.map(
            (customer) => customer.id
          )}
          strategy={
            verticalListSortingStrategy
          }
        >
          {stageCustomers.length === 0 ? (
            <div
              className={`
                flex
                h-24
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                transition-all

                ${
                  isOver
                    ? "border-primary bg-primary/5"
                    : "border-muted"
                }
              `}
            >
              <p className="text-sm text-muted-foreground">
                Arraste um cliente para cá
              </p>
            </div>
          ) : (
            stageCustomers.map((customer) => (
             <CustomerCard
  key={customer.id}
  customer={customer}
  onClick={() =>
    onCustomerClick(customer)
  }
/>
            ))
          )}
        </SortableContext>
      </CardContent>
    </Card>
  );

 
}