import { PipelineStage } from "./pipeline-stage";

export interface Pipeline {
  id: string;

  organization_id: string;

  name: string;

  description: string | null;

  is_default: boolean;

  is_active: boolean;

  created_at: string;

  updated_at: string;

  stages: PipelineStage[];
}