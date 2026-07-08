"use client";

import { PipelineProvider } from "@/src/providers/pipeline-provider";

import { PipelineToolbar } from "./pipeline-toolbar";
import { PipelineStats } from "./pipeline-stats";
import { PipelineBoard } from "./pipeline-board";
import { PipelineContent } from "./pipeline-content";

export function PipelineLayout() {
  return (
    <PipelineProvider>
      <PipelineContent />
    </PipelineProvider>
  );
}