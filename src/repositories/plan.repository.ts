import { supabase } from "@/src/lib/supabase/client";

class PlanRepository {
  async getById(id: string) {
    return await supabase
      .from("plans")
      .select("*")
      .eq("id", id)
      .single();
  }

  async getBySlug(slug: string) {
    return await supabase
      .from("plans")
      .select("*")
      .eq("slug", slug)
      .single();
  }
}

export const planRepository = new PlanRepository();