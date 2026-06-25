"use client";

import { useCallback, useEffect, useState } from "react";

import { pipelineService } from "@/src/services/pipeline.service";

import { Pipeline } from "@/src/types/pipeline/pipeline";

export function usePipeline() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result = await pipelineService.list();
console.log("RESULT", result);
            if (!result.success) {
            console.error(result.message);
            setLoading(false);
            return;
            }

    setPipelines(result.data ?? []);
    console.log("PIPELINES", result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    pipelines,
    loading,
    reload: load,
  };
}