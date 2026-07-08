"use client";

import { usePipelineContext } from "@/src/providers/pipeline-provider";

import { PipelineToolbar } from "./pipeline-toolbar";
import { PipelineStats } from "./pipeline-stats";
import { PipelineBoard } from "./pipeline-board";

export function PipelineContent() {
  const { customers, columns } =
    usePipelineContext();

  return (
    <div className="flex h-[calc(100vh-110px)] flex-col overflow-hidden">

      <PipelineToolbar />

      <div className="mt-3">
        <PipelineStats
          customers={customers}
          columns={columns}
        />
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-hidden">
        <PipelineBoard />
      </div>

    </div>
  );
}