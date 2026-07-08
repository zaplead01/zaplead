"use client";

import { useMemo, useState } from "react";

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

import { usePipelineContext } from "@/src/providers/pipeline-provider";

import { Customer } from "@/src/types/customer/customer";

export function PipelineBoard() {
  const {
    pipeline,
    columns,
    loading,
    activeCustomer,
    updateCustomer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    collisionDetection,
  } = usePipelineContext();

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

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

  const board = useMemo(
    () => (
      <div
        className="
          flex
          h-full
          gap-4
          overflow-x-auto
          overflow-y-hidden
          rounded-2xl
          bg-muted/20
          p-2
        "
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onCustomerClick={setSelectedCustomer}
          />
        ))}
      </div>
    ),
    [columns]
  );

  if (loading) {
    return (
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[650px] rounded-2xl"
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
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {board}

        <DragOverlay
          dropAnimation={null}
        >
          {activeCustomer ? (
            <CustomerCard
              customer={activeCustomer}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}