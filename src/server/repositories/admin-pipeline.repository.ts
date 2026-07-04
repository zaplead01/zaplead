import { supabaseAdmin } from "@/src/lib/supabase/admin";

class AdminPipelineRepository {
  async getDefault(organizationId: string) {
    return await supabaseAdmin
      .from("pipelines")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("is_default", true)
      .maybeSingle();
  }

  async create(data: {
    organization_id: string;
    name: string;
    description?: string | null;
    is_default: boolean;
    is_active: boolean;
  }) {
    return await supabaseAdmin
      .from("pipelines")
      .insert(data)
      .select()
      .single();
  }

  async createStages(
  pipelineId: string,
  stages: {
    name: string;
    position: number;
    color: string;
    is_won: boolean;
    is_lost: boolean;
  }[]
) {
  return await supabaseAdmin
    .from("pipeline_stages")
    .insert(
      stages.map((stage) => ({
        pipeline_id: pipelineId,
        ...stage,
      }))
    )
    .select();
}

  async listStages(pipelineId: string) {
    return await supabaseAdmin
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("position");
  }
}

export const adminPipelineRepository =
  new AdminPipelineRepository();