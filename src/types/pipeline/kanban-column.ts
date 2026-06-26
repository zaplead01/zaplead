import { Customer } from "@/src/types/customer/customer";
import { PipelineStage } from "@/src/types/pipeline/pipeline-stage";

export type KanbanColumn = {
  id: string;
  stage: PipelineStage;
  customers: Customer[];
};