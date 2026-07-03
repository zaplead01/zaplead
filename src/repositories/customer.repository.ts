import { supabase } from "@/src/lib/supabase/client";
import { Customer } from "@/src/types/customer/customer";

class CustomerRepository {
  async list(organizationId: string) {
  return await supabase
    .from("customers")
    .select(`
      *,
      pipeline:pipelines!customers_pipeline_id_fkey(
        id,
        name
      ),
      pipeline_stage:pipeline_stages!customers_pipeline_stage_id_fkey(
        id,
        name,
        color
      )
    `)
    .eq("organization_id", organizationId)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });
}

  async getById(id: string) {
  return await supabase
    .from("customers")
    .select(`
      *,
      pipeline:pipelines!customers_pipeline_id_fkey(
        id,
        name
      ),
      pipeline_stage:pipeline_stages!customers_pipeline_stage_id_fkey(
        id,
        name,
        color
      )
    `)
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

  async move(
    customerId: string,
    pipelineStageId: string
  ) {
    return await supabase
      .from("customers")
      .update({
        pipeline_stage_id: pipelineStageId,
      })
      .eq("id", customerId)
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
async listOverdue(organizationId: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return await supabase
    .from("customers")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("is_active", true)
    .not("next_follow_up_at", "is", null)
    .lt("next_follow_up_at", today.toISOString())
    .order("next_follow_up_at");
}

async listToday(
  organizationId: string,
  start: string,
  end: string
) {
  return await supabase
    .from("customers")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("is_active", true)
    .gte("next_follow_up_at", start)
    .lte("next_follow_up_at", end)
    .order("next_follow_up_at");
}

async listTomorrow(
  organizationId: string,
  start: string,
  end: string
) {
  return await supabase
    .from("customers")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("is_active", true)
    .gte("next_follow_up_at", start)
    .lte("next_follow_up_at", end)
    .order("next_follow_up_at");
}


async completeFollowUp(customerId: string) {
  return await supabase
    .from("customers")
    .update({
      last_contact_at: new Date().toISOString(),
      next_follow_up_at: null,
    })
    .eq("id", customerId)
    .select()
    .single();
}

async countByOrganization(
  organizationId: string
) {
  return await supabase
    .from("customers")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("organization_id", organizationId)
    .eq("is_active", true);
}

}

export const customerRepository =
  new CustomerRepository();