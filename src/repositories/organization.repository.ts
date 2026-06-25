import { supabase } from "@/src/lib/supabase/client";

class OrganizationRepository {
  async getById(id: string) {
    return await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  }

  async create(data: {
    name: string;
    slug: string;
    phone?: string;
    email?: string;
  }) {
    return await supabase
      .from("organizations")
      .insert({
        name: data.name,
        slug: data.slug,
        phone: data.phone,
        email: data.email,
      })
      .select()
      .single();
  }
}

export const organizationRepository = new OrganizationRepository();