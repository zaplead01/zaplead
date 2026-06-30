import { supabase } from "@/src/lib/supabase/client";

class PipelineStageRepository {
  async list(pipelineId: string) {
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
      is_won?: boolean;
      is_lost?: boolean;
    }[]
  ) {
    return await supabase
      .from("pipeline_stages")
      .insert(stages)
      .select();
  }

  async create(stage: {
    pipeline_id: string;
    name: string;
    position: number;
    color: string;
    is_won?: boolean;
    is_lost?: boolean;
  }) {
    return await supabase
      .from("pipeline_stages")
      .insert(stage)
      .select()
      .single();
  }

  async update(
    id: string,
    stage: {
      name?: string;
      position?: number;
      color?: string;
      is_won?: boolean;
      is_lost?: boolean;
    }
  ) {
    return await supabase
      .from("pipeline_stages")
      .update(stage)
      .eq("id", id)
      .select()
      .single();
  }

  async delete(id: string) {
    return await supabase
      .from("pipeline_stages")
      .delete()
      .eq("id", id);
  }

  async setWonStage(
    pipelineId: string,
    stageId: string
  ) {
    // Remove a marcação de todas as etapas
    await supabase
      .from("pipeline_stages")
      .update({ is_won: false })
      .eq("pipeline_id", pipelineId);

    // Define a etapa vencedora
    return await supabase
      .from("pipeline_stages")
      .update({ is_won: true })
      .eq("id", stageId)
      .select()
      .single();
  }

  async setLostStage(
    pipelineId: string,
    stageId: string
  ) {
    // Remove a marcação de todas as etapas
    await supabase
      .from("pipeline_stages")
      .update({ is_lost: false })
      .eq("pipeline_id", pipelineId);

    // Define a etapa perdida
    return await supabase
      .from("pipeline_stages")
      .update({ is_lost: true })
      .eq("id", stageId)
      .select()
      .single();
  }
}

export const pipelineStageRepository =
  new PipelineStageRepository();