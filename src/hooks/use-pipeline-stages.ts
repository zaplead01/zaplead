"use client";

import { useCallback, useEffect, useState } from "react";

import { pipelineService } from "@/src/services/pipeline.service";

import { PipelineStage } from "@/src/types/pipeline/pipeline-stage";

export function usePipelineStages(
  pipelineId: string
) {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result =
      await pipelineService.listStages(
        pipelineId
      );

    if (!result.success) {
      console.error(result.message);
      setLoading(false);
      return;
    }

    setStages(result.data ?? []);
    setLoading(false);
  }, [pipelineId]);

  useEffect(() => {
    if (!pipelineId) return;

    load();
  }, [load, pipelineId]);

  return {
    stages,
    loading,
    reload: load,
  };
}