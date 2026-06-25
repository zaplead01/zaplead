"use client";
import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { usePipeline } from "@/src/hooks/use-pipeline";
import { usePipelineStages } from "@/src/hooks/use-pipeline-stages";

import { Skeleton } from "@/src/components/ui/skeleton";

import { KanbanColumn } from "./kanban-column";

export function PipelineBoard() {
  const {
    pipelines,
    loading,
  } = usePipeline();

  const pipeline = pipelines[0];

  const {
    stages,
    loading: loadingStages,
  } = usePipelineStages(
    pipeline?.id ?? ""
  );

  if (loading || loadingStages) {
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
  function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  console.log("Cliente:", active.id);
  console.log("Destino:", over?.id);
}

  return (
    <DndContext onDragEnd={handleDragEnd}>
  <SortableContext
    items={stages.map((stage) => stage.id)}
    strategy={horizontalListSortingStrategy}
  >
    <div className="flex gap-6 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <KanbanColumn
          key={stage.id}
          stage={stage}
        />
      ))}
    </div>
  </SortableContext>
</DndContext>
  );
}