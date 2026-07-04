import { supabaseAdmin } from "@/src/lib/supabase/admin";

class AdminOrganizationRepository {
  async create(data: {
    name: string;
    slug: string;
    email?: string | null;
    phone?: string | null;
  }) {
    return await supabaseAdmin
      .from("organizations")
      .insert(data)
      .select()
      .single();
  }

  async getById(id: string) {
    return await supabaseAdmin
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single();
  }
}

export const adminOrganizationRepository =
  new AdminOrganizationRepository();