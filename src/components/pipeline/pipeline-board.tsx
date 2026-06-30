"use client";

import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Skeleton } from "@/src/components/ui/skeleton";

import { CustomerSheet } from "./customer-sheet/customer-sheet";
import { CustomerCard } from "./customer-card";
import { KanbanColumn } from "./kanban-column";

import { useKanban } from "@/src/hooks/use-kanban";

import { Customer } from "@/src/types/customer/customer";

export function PipelineBoard() {
  const {
    pipeline,
    columns,
    loading,
    activeCustomer,
    updateCustomer,
    handleDragStart,
    handleDragEnd,
    collisionDetection,
  } = useKanban();

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Customer | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleCustomerUpdated(
    customer: Customer
  ) {
    updateCustomer(customer);
    setSelectedCustomer(customer);
  }

  if (loading) {
    return (
      <div className="flex gap-5">
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            className="h-96 w-80 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed">
        <p className="text-muted-foreground">
          Nenhum pipeline encontrado.
        </p>
      </div>
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
        sensors={sensors}
        collisionDetection={
          collisionDetection
        }
        onDragStart={
          handleDragStart
        }
        onDragEnd={
          handleDragEnd
        }
      >
        <div
          className="
            flex
            items-start
            gap-5
            overflow-x-auto
            pb-4
          "
        >
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
            <div className="rotate-2 scale-105">
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