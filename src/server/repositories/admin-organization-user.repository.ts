import { supabaseAdmin } from "@/src/lib/supabase/admin";

class AdminOrganizationUserRepository {
  async getByUser(userId: string) {
    return await supabaseAdmin
      .from("organization_users")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
  }

  async create(data: {
    organization_id: string;
    user_id: string;
    role: "owner";
  }) {
    return await supabaseAdmin
      .from("organization_users")
      .insert(data)
      .select()
      .single();
  }
}

export const adminOrganizationUserRepository =
  new AdminOrganizationUserRepository();