import { supabase } from "@/src/lib/supabase/client";

import { CustomerActivity } from "@/src/types/customer/customer-activity";

class CustomerActivityRepository {
  async list(customerId: string) {
    return await supabase
      .from("customer_activities")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", {
        ascending: false,
      });
  }

  async create(
    activity: Omit<CustomerActivity, "id" | "created_at">
  ) {
    return await supabase
      .from("customer_activities")
      .insert(activity)
      .select()
      .single();
  }
}

export const customerActivityRepository =
  new CustomerActivityRepository();