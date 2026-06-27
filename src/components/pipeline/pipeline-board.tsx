"use client";

import { useState } from "react";

import {
  DndContext,
} from "@dnd-kit/core";

import { CustomerSheet } from "./customer-sheet/customer-sheet";
import { KanbanColumn } from "./kanban-column";
import { CustomerCard } from "./customer-card";

import { useKanban } from "@/src/hooks/use-kanban";

import { Customer } from "@/src/types/customer/customer";

import { Skeleton } from "@/src/components/ui/skeleton";

import {
  DragOverlay,
} from "@dnd-kit/core";

export function PipelineBoard() {
  const {
    
    pipeline,
    columns,
    loading,
    activeCustomer,
    updateCustomer,
    handleDragStart,
    handleDragEnd,
  } = useKanban();

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Customer | null>(null);

  function handleCustomerUpdated(customer: Customer) {
  updateCustomer(customer);
  setSelectedCustomer(customer);
}


  if (loading) {
    return (
      <div className="flex gap-4">
        <Skeleton className="h-[600px] w-80" />
        <Skeleton className="h-[600px] w-80" />
        <Skeleton className="h-[600px] w-80" />
      </div>
    );
  }

  if (!pipeline) {
    return (
      <p className="text-muted-foreground">
        Nenhum pipeline encontrado.
      </p>
    );
  }

  return (
    <>
 <CustomerSheet
  customer={selectedCustomer}
  open={!!selectedCustomer}
  updateCustomer={handleCustomerUpdated}
  onOpenChange={(open) => {
    if (!open) {
      setSelectedCustomer(null);
    }
  }}
/>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onCustomerClick={
                setSelectedCustomer
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeCustomer ? (
            <div className="rotate-2 scale-105 opacity-95">
              <CustomerCard
                customer={activeCustomer}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}