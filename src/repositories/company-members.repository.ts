import { supabase } from "@/src/lib/supabase/client";

class CompanyMembersRepository {
  async getMembers(organizationId: string) {
    return await supabase
      .from("organization_users")
      .select(`
        role,
        user_profiles (
          id,
          full_name,
          phone,
          avatar_url
        )
      `)
      .eq("organization_id", organizationId);
  }
}

export const companyMembersRepository =
  new CompanyMembersRepository();