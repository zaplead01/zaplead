import { supabase } from "@/src/lib/supabase/client";

class PipelineCustomersRepository {
  async list(stageId: string) {
   

    const result = await supabase
      .from("customers")
      .select("*")
      .eq("pipeline_stage_id", stageId)
      .eq("is_active", true)
      .order("updated_at", {
        ascending: false,
      });

    

    return result;
  }
}

export const pipelineCustomersRepository =
  new PipelineCustomersRepository();