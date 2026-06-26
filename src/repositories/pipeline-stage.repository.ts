import { supabase } from "@/src/lib/supabase/client";

class PipelineStageRepository {
  async createMany(
    stages: {
      pipeline_id: string;
      name: string;
      position: number;
      color: string;
    }[]
  ) {
    return await supabase
      .from("pipeline_stages")
      .insert(stages);
  }

  async list(pipelineId: string) {
    return await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("position");
  }
}

export const pipelineStageRepository =
  new PipelineStageRepository();