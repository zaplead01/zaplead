import { supabase } from "@/src/lib/supabase/client";

class SubscriptionRepository {
  async getByOrganization(organizationId: string) {
    return await supabase
      .from("subscriptions")
      .select(`
        *,
        plan:plans(*)
      `)
      .eq("organization_id", organizationId)
      .maybeSingle();
  }

  async createFree(organizationId: string) {
   const { data: freePlan, error } =
    await supabase
      .from("plans")
      .select("id")
      .eq("slug", "free")
      .single();

if (error || !freePlan) {
    throw error ?? new Error("Plano FREE não encontrado.");
}

    return await supabase
      .from("subscriptions")
      .insert({
        organization_id: organizationId,
        plan_id: freePlan!.id,
        status: "active",
      })
      .select(`
        *,
        plan:plans(*)
      `)
      .single();
  }

  async getCurrent(organizationId: string) {
  return await supabase
    .from("subscriptions")
    .select(`
      *,
      plan:plans(*)
    `)
    .eq("organization_id", organizationId)
    .single();
}
}

export const subscriptionRepository =
  new SubscriptionRepository();