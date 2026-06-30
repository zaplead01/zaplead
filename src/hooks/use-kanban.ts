"use client";

import { useMemo, useState } from "react";

import {
  DragStartEvent,
  DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";

import { pipelineService } from "@/src/services/pipeline.service";

import { usePipeline } from "./use-pipeline";

import { Customer } from "@/src/types/customer/customer";
import { KanbanColumn } from "@/src/types/pipeline/kanban-column";

export function useKanban() {
  const {
    pipelines,
    loading,
    reload,
  } = usePipeline();

  const [activeCustomerId, setActiveCustomerId] =
    useState<string | null>(null);

  const [pipelineState, setPipelineState] =
    useState(pipelines);

  const pipeline =
    pipelineState.length > 0
      ? pipelineState[0]
      : pipelines[0];

  useMemo(() => {
    if (pipelines.length) {
      setPipelineState(pipelines);
    }
  }, [pipelines]);

  const columns: KanbanColumn[] =
    pipeline?.stages.map((stage) => ({
      id: stage.id,
      stage,
      customers: stage.customers ?? [],
    })) ?? [];

  const activeCustomer =
    columns
      .flatMap((column) => column.customers)
      .find(
        (customer) =>
          customer.id === activeCustomerId
      ) ?? null;

  function updateCustomer(
    updatedCustomer: Customer
  ) {
    setPipelineState((previous) =>
      previous.map((pipeline) => ({
        ...pipeline,
        stages: pipeline.stages.map((stage) => ({
          ...stage,
          customers: stage.customers.map((customer) =>
            customer.id === updatedCustomer.id
              ? updatedCustomer
              : customer
          ),
        })),
      }))
    );
  }

  function handleDragStart(
    event: DragStartEvent
  ) {
    setActiveCustomerId(
      event.active.id as string
    );
  }

  async function handleDragEnd(
    event: DragEndEvent
  ) {
    setActiveCustomerId(null);

    const { active, over } = event;

    if (!over) return;

    const customerId =
      active.id as string;

    const destinationStageId =
      over.id as string;

    const previous =
      structuredClone(pipelineState);

    const next =
      structuredClone(pipelineState);

    let movingCustomer: Customer | null = null;

    next.forEach((pipeline) => {
      pipeline.stages.forEach((stage) => {
        const index =
          stage.customers.findIndex(
            (customer) =>
              customer.id === customerId
          );

        if (index >= 0) {
          movingCustomer =
            stage.customers[index];

          stage.customers.splice(index, 1);
        }
      });
    });

    if (!movingCustomer) return;

    next.forEach((pipeline) => {
      pipeline.stages.forEach((stage) => {
        if (stage.id === destinationStageId) {
          stage.customers.unshift({
            ...movingCustomer!,
            pipeline_stage_id:
              destinationStageId,
          });
        }
      });
    });

    setPipelineState(next);

    const result =
      await pipelineService.moveCustomer(
        customerId,
        destinationStageId
      );

    if (!result.success) {
      setPipelineState(previous);
      console.error(result.message);
      return;
    }

    reload();
  }

  return {
    pipeline,

    columns,

    loading,

    activeCustomer,

    updateCustomer,

    handleDragStart,

    handleDragEnd,

    collisionDetection:
      closestCorners,
  };
}