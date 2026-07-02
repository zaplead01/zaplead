import { supabase } from "@/src/lib/supabase/client";

class OrganizationUserRepository {
  async getByUser(userId: string) {
    return await supabase
      .from("organization_users")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
  }

  async create(data: {
    organization_id: string;
    user_id: string;
    role: "owner" | "admin" | "member";
  }) {
    return await supabase
      .from("organization_users")
      .insert(data)
      .select()
      .single();
  }

  async updateRole(
  id: string,
  role: "admin" | "member"
) {
  return await supabase
    .from("organization_users")
    .update({
      role,
    })
    .eq("id", id)
    .select()
    .single();
}

async delete(id: string) {
  return await supabase
    .from("organization_users")
    .delete()
    .eq("id", id);
}

async getById(id: string) {
  return await supabase
    .from("organization_users")
    .select("*")
    .eq("id", id)
    .maybeSingle();
}


}

export const organizationUserRepository =
  new OrganizationUserRepository();