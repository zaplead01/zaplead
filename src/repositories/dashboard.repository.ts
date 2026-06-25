import { supabase } from "@/src/lib/supabase/client";

class DashboardRepository {
  async getProfile(userId: string) {
    return await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
  }

  async getMembership(userId: string) {
    return await supabase
      .from("organization_users")
      .select(`
        *,
        organizations (*)
      `)
      .eq("user_id", userId)
      .single();
  }

  async getSubscription(organizationId: string) {
    return await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", organizationId)
      .single();
  }

  async getCustomersCount(organizationId: string) {
    return await supabase
      .from("customers")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId);
  }

  async getUsersCount(organizationId: string) {
    return await supabase
      .from("organization_users")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("organization_id", organizationId);
  }
}

export const dashboardRepository = new DashboardRepository();