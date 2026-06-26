"use client";

import { useMemo, useState } from "react";
import {
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";

import { KanbanColumn } from "@/src/types/pipeline/kanban-column";

import { usePipeline } from "./use-pipeline";
import { usePipelineStages } from "./use-pipeline-stages";
import { useCustomers } from "./use-customers";

import { customerService } from "@/src/services/customer.service";

export function useKanban() {
  const {
    pipelines,
    loading: loadingPipeline,
  } = usePipeline();

  const pipeline = pipelines[0];

  const {
    stages,
    loading: loadingStages,
  } = usePipelineStages(
    pipeline?.id ?? ""
  );

  const {
    customers,
    setCustomers,
    loading: loadingCustomers,
  } = useCustomers();

  const [
    activeCustomerId,
    setActiveCustomerId,
  ] = useState<string | null>(null);

  const columns = useMemo<KanbanColumn[]>(() => {
    return stages.map((stage) => ({
      id: stage.id,
      stage,
      customers: customers.filter(
        (customer) =>
          customer.pipeline_stage_id === stage.id
      ),
    }));
  }, [stages, customers]);

  const activeCustomer =
    customers.find(
      (customer) =>
        customer.id === activeCustomerId
    ) ?? null;

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
    const { active, over } = event;

    setActiveCustomerId(null);

    if (!over) return;

    const customerId =
      active.id as string;

    const stageId =
      over.id as string;

    const current =
      customers.find(
        (customer) =>
          customer.id === customerId
      );

    if (
      !current ||
      current.pipeline_stage_id === stageId
    ) {
      return;
    }

    const previousCustomers =
      customers;

    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              pipeline_stage_id: stageId,
            }
          : customer
      )
    );

    const result =
      await customerService.move(
        customerId,
        stageId
      );

    if (!result.success) {
      setCustomers(previousCustomers);
      console.error(result.message);
    }
  }

  return {
    pipeline,
    columns,

    customers,

    activeCustomer,

    loading:
      loadingPipeline ||
      loadingStages ||
      loadingCustomers,

    handleDragStart,
    handleDragEnd,
  };
}