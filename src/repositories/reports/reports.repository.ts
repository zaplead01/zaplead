import { supabase } from "@/src/lib/supabase/client";

class ReportsRepository {
  async getCustomers(organizationId: string) {
    return await supabase
      .from("customers")
      .select(`
        id,
        full_name,
        company,
        phone,
        email,
        estimated_value,
        lead_source,
        created_at,
        updated_at,
        last_contact_at,
        next_follow_up_at,
        pipeline_stage:pipeline_stages!customers_pipeline_stage_id_fkey(
          id,
          name,
          color,
          position,
          is_won,
          is_lost
        )
      `)
      .eq("organization_id", organizationId)
      .eq("is_active", true)
      .order("created_at", {
        ascending: true,
      });
  }

  async getCustomersCount(organizationId: string) {
    return await supabase
      .from("customers")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId)
      .eq("is_active", true);
  }

  async getPipelineValue(organizationId: string) {
    return await supabase
      .from("customers")
      .select("estimated_value")
      .eq("organization_id", organizationId)
      .eq("is_active", true);
  }
}

export const reportsRepository = new ReportsRepository();