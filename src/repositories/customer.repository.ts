import { supabase } from "@/src/lib/supabase/client";
import { Customer } from "@/src/types/customer";

class CustomerRepository {
  async list(organizationId: string) {
    return await supabase
      .from("customers")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("is_active", true)
      .order("created_at", { ascending: false });
  }

  async getById(id: string) {
    return await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
  }

  async create(
    customer: Omit<
      Customer,
      "id" | "created_at" | "updated_at"
    >
  ) {
    return await supabase
      .from("customers")
      .insert(customer)
      .select()
      .single();
  }

  async update(
    id: string,
    customer: Partial<Customer>
  ) {
    return await supabase
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();
  }

  async delete(id: string) {
    return await supabase
      .from("customers")
      .update({
        is_active: false,
      })
      .eq("id", id);
  }
}

export const customerRepository =
  new CustomerRepository();