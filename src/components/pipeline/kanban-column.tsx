"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { MoreHorizontal } from "lucide-react";

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

  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  });

  const total = customers.reduce(
    (sum, customer) =>
      sum +
      Number(customer.estimated_value ?? 0),
    0
  );

  return (
    <div
      ref={setNodeRef}
      className={`
        flex
        h-full
        min-w-[340px]
        max-w-[340px]
        shrink-0
        flex-col
        rounded-2xl
        border
        bg-muted/30
        transition-all

        ${
          isOver
            ? "border-primary bg-primary/5"
            : ""
        }
      `}
    >
      {/* Header */}
      <div className="border-b bg-background px-4 py-3 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: stage.color,
              }}
            />

            <h3 className="font-semibold">
              {stage.name}
            </h3>

            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {customers.length}
            </span>
          </div>

          <button className="rounded-md p-1 hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 pt-2">
        <SortableContext
          items={customers.map((c) => c.id)}
          strategy={
            verticalListSortingStrategy
          }
        >
          <div className="space-y-3">
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
                      ? "border-primary bg-primary/10"
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
                    onCustomerClick(customer)
                  }
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}