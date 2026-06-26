import { supabase } from "@/src/lib/supabase/client";

class PipelineStageRepository {
  async list(
    pipelineId: string
  ) {
    return await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("position", {
        ascending: true,
      });
  }

  async createMany(
    stages: {
      pipeline_id: string;
      name: string;
      position: number;
      color: string;
    }[]
  ) {
    const result = await supabase
  .from("pipeline_stages")
  .insert(stages)
  .select();

    return result;
  }
}

export const pipelineStageRepository =
  new PipelineStageRepository();