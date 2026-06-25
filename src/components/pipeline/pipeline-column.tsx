"use client";

import { Pipeline } from "@/src/types/pipeline/pipeline";

import { usePipelineStages } from "@/src/hooks/use-pipeline-stages";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Skeleton } from "@/src/components/ui/skeleton";

import { PipelineStage } from "./pipeline-stage";

type Props = {
  pipeline: Pipeline;
};

export function PipelineColumn({
  pipeline,
}: Props) {
  const {
    stages,
    loading,
  } = usePipelineStages(pipeline.id);

  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>
          {pipeline.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        ) : (
          stages.map((stage) => (
            <PipelineStage
              key={stage.id}
              stage={stage}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}