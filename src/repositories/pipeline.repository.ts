import { supabase } from "@/src/lib/supabase/client";

class PipelineRepository {
  async list(organizationId: string) {
    return await supabase
      .from("pipelines")
      .select(`
        *,
        stages:pipeline_stages(
          *,
          customers(*)
        )
      `)
      .eq("organization_id", organizationId)
      .eq("is_active", true)
      .order("created_at", {
        ascending: true,
      });
  }

  async getDefault(organizationId: string) {
    return await supabase
      .from("pipelines")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("is_default", true)
      .maybeSingle();
  }

  async getFirstStage(pipelineId: string) {
    return await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("position", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();
  }

  async getStageById(id: string) {
    return await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  }

  async updateCustomerStage(
    customerId: string,
    stageId: string
  ) {
    return await supabase
      .from("customers")
      .update({
        pipeline_stage_id: stageId,
      })
      .eq("id", customerId);
  }
}

export const pipelineRepository =
  new PipelineRepository();