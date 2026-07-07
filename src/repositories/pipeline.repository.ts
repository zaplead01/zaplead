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

  async count(organizationId: string) {
  return await supabase
    .from("pipelines")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("organization_id", organizationId);
}

async create(data: {
  organization_id: string;
  name: string;
}) {
  return await supabase
    .from("pipelines")
    .insert(data)
    .select()
    .single();
}

async createStages(
  stages: {
    pipeline_id: string;
    name: string;
    position: number;
    color?: string | null;
    is_won: boolean;
    is_lost: boolean;
  }[]
) {
  return await supabase
    .from("pipeline_stages")
    .insert(stages);
}

}

export const pipelineRepository =
  new PipelineRepository();