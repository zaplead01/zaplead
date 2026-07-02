import { supabase } from "@/src/lib/supabase/client";
import { organizationUserRepository } from "./organization-user.repository";

class OrganizationRepository {
  async getById(id: string) {
    return await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  }

  async getCurrentByUser(userId: string) {
  const { data: membership, error } =
    await organizationUserRepository.getByUser(userId);

  if (error || !membership) {
    return {
      data: null,
      error,
    };
  }

  const { data: organization, error: organizationError } =
    await this.getById(membership.organization_id);

  if (organizationError || !organization) {
    return {
      data: null,
      error: organizationError,
    };
  }

  return {
    data: {
      ...organization,
      role: membership.role,
    },
    error: null,
  };
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

  async update(
    id: string,
    data: Partial<{
      name: string;
      phone: string | null;
      email: string | null;
    }>
  ) {
    return await supabase
      .from("organizations")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }
}

export const organizationRepository = new OrganizationRepository();