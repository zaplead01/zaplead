import { supabase } from "@/src/lib/supabase/client";

class ProfileRepository {
  async getById(id: string) {
    return await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  }

  async create(data: {
    id: string;
    full_name: string;
    phone: string;
    avatar_url?: string | null;
  }) {
    return await supabase.from("user_profiles").insert(data).select().single();
  }

  async update(
    id: string,
    data: Partial<{
      full_name: string;
      phone: string;
      avatar_url: string | null;
    }>
  ) {
    return await supabase
      .from("user_profiles")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }
}

export const profileRepository = new ProfileRepository();