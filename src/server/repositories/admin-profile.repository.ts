import { supabaseAdmin } from "@/src/lib/supabase/admin";

class AdminProfileRepository {
  async getById(id: string) {
    return await supabaseAdmin
      .from("user_profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  }

  async create(data: {
    id: string;
    full_name: string;
    phone?: string;
    avatar_url?: string | null;
  }) {
    return await supabaseAdmin
      .from("user_profiles")
      .insert(data)
      .select()
      .single();
  }
}

export const adminProfileRepository =
  new AdminProfileRepository();