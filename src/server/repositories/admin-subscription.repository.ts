import { supabaseAdmin } from "@/src/lib/supabase/admin";

class AdminSubscriptionRepository {
  async getByOrganization(
    organizationId: string
  ) {
    return await supabaseAdmin
      .from("subscriptions")
      .select(`
        *,
        plan:plans(*)
      `)
      .eq("organization_id", organizationId)
      .maybeSingle();
  }

  async getFreePlan() {
    return await supabaseAdmin
      .from("plans")
      .select("*")
      .eq("slug", "free")
      .single();
  }

  async create(data: {
    organization_id: string;
    plan_id: string;
    status: "active";
  }) {
    return await supabaseAdmin
      .from("subscriptions")
      .insert(data)
      .select(`
        *,
        plan:plans(*)
      `)
      .single();
  }
}

export const adminSubscriptionRepository =
  new AdminSubscriptionRepository();