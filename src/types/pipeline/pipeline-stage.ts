export interface PipelineStage {
  id: string;

  pipeline_id: string;

  name: string;

  color: string | null;

  order: number;

  created_at: string;

  updated_at: string;
}