"use client";

import { useEffect, useState } from "react";
import { pipelineService } from "@/src/services/pipeline.service";

export function usePipelines() {
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await pipelineService.list();
        setPipelines(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    pipelines,
    loading,
  };
}

export const usePipeline = usePipelines;