"use client";

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

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <KanbanColumn
          key={stage.id}
          stage={stage}
        />
      ))}
    </div>
  );
}