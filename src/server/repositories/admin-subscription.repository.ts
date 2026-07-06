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
  const result = await supabaseAdmin
    .from("plans")
    .select("*")
    .eq("slug", "free")
    .maybeSingle();

  console.log("========== FREE PLAN ==========");
  console.log(result);
  console.log("===============================");

  return result;
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