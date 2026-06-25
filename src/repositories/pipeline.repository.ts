import { supabase } from "@/src/lib/supabase/client";

class PipelineRepository {
  async list(organizationId: string) {
    return await supabase
      .from("pipelines")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("is_active", true)
      .order("created_at", {
        ascending: true,
      });
  }

  async listStages(
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

  async getDefault(
  organizationId: string
) {
  return await supabase
    .from("pipelines")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("is_default", true)
    .single();
}

async getFirstStage(
  pipelineId: string
) {
  return await supabase
    .from("pipeline_stages")
    .select("*")
    .eq("pipeline_id", pipelineId)
    .order("position", {
      ascending: true,
    })
    .limit(1)
    .single();
}

}

export const pipelineRepository =
  new PipelineRepository();