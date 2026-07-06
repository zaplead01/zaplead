import { supabase } from "@/src/lib/supabase/client";

class BillingRepository {
  async getSubscription(organizationId: string) {
    return await supabase
      .from("subscriptions")
      .select(`
        *,
        plan:plans(*)
      `)
      .eq("organization_id", organizationId)
      .single();
  }

  async countCustomers(organizationId: string) {
    return await supabase
      .from("customers")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId)
      .eq("is_active", true);
  }

  async countUsers(organizationId: string) {
    return await supabase
      .from("organization_users")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId);
  }

  async countPipelines(organizationId: string) {
    return await supabase
      .from("pipelines")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId)
      .eq("is_active", true);
  }
}

export const billingRepository =
  new BillingRepository();