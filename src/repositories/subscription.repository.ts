import { supabase } from "@/src/lib/supabase/client";

class SubscriptionRepository {
  async getByOrganization(organizationId: string) {
    return await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", organizationId)
      .maybeSingle();
  }

  async createFree(organizationId: string) {
    return await supabase
      .from("subscriptions")
      .insert({
        organization_id: organizationId,
        plan: "free",
        status: "active",
      })
      .select()
      .single();
  }
}

export const subscriptionRepository =
  new SubscriptionRepository();