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
}

export const organizationUserRepository =
  new OrganizationUserRepository();