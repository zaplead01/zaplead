"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  pointerWithin,
} from "@dnd-kit/core";

import {
  arrayMove,
} from "@dnd-kit/sortable";

import { pipelineService } from "@/src/services/pipeline.service";
import { usePipeline } from "./use-pipeline";

import { Customer } from "@/src/types/customer/customer";
import { KanbanColumn } from "@/src/types/pipeline/kanban-column";

export function useKanban() {
  const {
    pipelines,
    loading,
  } = usePipeline();

  

  const [pipelineState, setPipelineState] =
    useState(pipelines);

  const [activeCustomerId, setActiveCustomerId] =
    useState<string | null>(null);

  useEffect(() => {
    if (pipelines.length) {
      setPipelineState(pipelines);
    }
  }, [pipelines]);

  const pipeline =
    pipelineState[0];

  const columns: KanbanColumn[] =
    useMemo(() => {
      if (!pipeline) return [];

      return pipeline.stages.map((stage) => ({
        id: stage.id,
        stage,
        customers: stage.customers ?? [],
      }));
    }, [pipeline]);

    const customers = useMemo(() => {
  return columns.flatMap((column) => column.customers);
}, [columns]);

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

  function findStage(
    customerId: string
  ) {
    return columns.find((column) =>
      column.customers.some(
        (customer) =>
          customer.id === customerId
      )
    );
  }

  function handleDragStart(
    event: DragStartEvent
  ) {
    setActiveCustomerId(
      event.active.id as string
    );
  }
    function handleDragOver(
    event: DragOverEvent
  ) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn =
      findStage(activeId);

    if (!sourceColumn) return;

    let destinationColumn =
      columns.find(
        (column) => column.stage.id === overId
      );

    if (!destinationColumn) {
      destinationColumn =
        findStage(overId);
    }

    if (!destinationColumn) return;

    if (
      sourceColumn.stage.id ===
      destinationColumn.stage.id
    ) {
      return;
    }

    setPipelineState((previous) => {
      const next =
        structuredClone(previous);

      const pipeline =
        next[0];

      const source =
        pipeline.stages.find(
          (stage) =>
            stage.id === sourceColumn.stage.id
        );

      const destination =
        pipeline.stages.find(
          (stage) =>
            stage.id ===
            destinationColumn.stage.id
        );

      if (!source || !destination) {
        return previous;
      }

      const index =
        source.customers.findIndex(
          (customer) =>
            customer.id === activeId
        );

      if (index === -1) {
        return previous;
      }

      const [customer] =
        source.customers.splice(
          index,
          1
        );

      destination.customers.unshift({
        ...customer,
        pipeline_stage_id:
          destination.id,
      });

      return next;
    });
  }

  async function handleDragEnd(
    event: DragEndEvent
  ) {
    setActiveCustomerId(null);

    const { active, over } = event;

    if (!over) return;

    const activeId =
      active.id as string;

    const overId =
      over.id as string;

    const sourceColumn =
      findStage(activeId);

    if (!sourceColumn) return;

    let destinationColumn =
      columns.find(
        (column) => column.stage.id === overId
      );

    if (!destinationColumn) {
      destinationColumn =
        findStage(overId);
    }

    if (!destinationColumn) return;

    const previousStageId =
      sourceColumn.stage.id;

    const newStageId =
      destinationColumn.stage.id;

    if (
      previousStageId === newStageId
    ) {
      setPipelineState((previous) => {
        const next =
          structuredClone(previous);

        const customers =
          next[0].stages.find(
            (stage) =>
              stage.id === previousStageId
          )!.customers;

        const oldIndex =
          customers.findIndex(
            (customer) =>
              customer.id === activeId
          );

        const newIndex =
          customers.findIndex(
            (customer) =>
              customer.id === overId
          );

        if (
          oldIndex === -1 ||
          newIndex === -1
        ) {
          return previous;
        }

        next[0].stages.find(
          (stage) =>
            stage.id === previousStageId
        )!.customers =
          arrayMove(
            customers,
            oldIndex,
            newIndex
          );

        return next;
      });

      return;
    }

    const result =
      await pipelineService.moveCustomer(
        activeId,
        newStageId
      );

    if (!result.success) {
      console.error(
        result.message
      );

      const fresh =
        await pipelineService.list();

      if (
        fresh.success &&
        fresh.data
      ) {
        setPipelineState(
          fresh.data
        );
      }
    }

 
  }

 return {
  pipeline,

  columns,

  customers,

  loading,

  activeCustomer,

  updateCustomer,

  handleDragStart,

  handleDragOver,

  handleDragEnd,

  collisionDetection: pointerWithin,
};
}