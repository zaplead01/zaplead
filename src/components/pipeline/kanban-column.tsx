"use client";

import {
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/src/components/ui/card";

import { CustomerCard } from "./customer-card";

import { Customer } from "@/src/types/customer/customer";
import { KanbanColumn as KanbanColumnType } from "@/src/types/pipeline/kanban-column";

import { formatCurrency } from "@/src/utils/currency";

type Props = {
  column: KanbanColumnType;
  onCustomerClick: (
    customer: Customer
  ) => void;
};

export function KanbanColumn({
  column,
  onCustomerClick,
}: Props) {
  const { stage, customers } = column;

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: stage.id,
  });

  const total = customers.reduce(
    (sum, customer) =>
      sum +
      Number(
        customer.estimated_value ?? 0
      ),
    0
  );

  return (
    <Card
      ref={setNodeRef}
      className={`
        w-80
        shrink-0
        rounded-2xl
        transition-all

        ${
          isOver
            ? "border-primary ring-2 ring-primary/20"
            : ""
        }
      `}
    >
      <CardHeader className="pb-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  stage.color,
              }}
            />

            <CardTitle className="text-base">
              {stage.name}
            </CardTitle>

          </div>

          <span className="rounded-full bg-muted px-2 py-1 text-xs">
            {customers.length}
          </span>

        </div>

        <p className="text-sm text-muted-foreground">
          {formatCurrency(total)}
        </p>

      </CardHeader>

      <CardContent
        className="
          flex
          flex-col
          gap-3
          min-h-10
        "
      >
        <SortableContext
          items={customers.map(
            (customer) =>
              customer.id
          )}
          strategy={
            verticalListSortingStrategy
          }
        >
          {customers.length === 0 ? (
            <div
              className={`
                rounded-xl
                border-2
                border-dashed
                p-8
                text-center
                text-sm
                text-muted-foreground

                ${
                  isOver
                    ? "border-primary bg-primary/5"
                    : ""
                }
              `}
            >
              Arraste um cliente aqui
            </div>
          ) : (
            customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onClick={() =>
                  onCustomerClick(
                    customer
                  )
                }
              />
            ))
          )}
        </SortableContext>
      </CardContent>
    </Card>
  );
}