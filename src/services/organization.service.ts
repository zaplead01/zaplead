import { organizationRepository } from "@/src/repositories/organization.repository";
import { organizationUserRepository } from "@/src/repositories/organization-user.repository";

import { organizationSetupService } from "./organization-setup.service";

class OrganizationService {
  private generateSlug(name: string) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async ensureOrganization(
    userId: string,
    profile: {
      full_name: string;
      phone?: string | null;
      email?: string | null;
      business?: string | null;
    }
  ) {
    // Já pertence a uma organização?
    const { data: membership } =
      await organizationUserRepository.getByUser(userId);

    if (membership) {
      return membership.organization_id;
    }

    const organizationName =
      profile.business?.trim() ||
      `${profile.full_name.split(" ")[0]} Negócios`;

    const slug = `${this.generateSlug(organizationName)}-${crypto.randomUUID().slice(0, 8)}`;

    const { data: organization, error } =
      await organizationRepository.create({
        name: organizationName,
        slug,
        phone: profile.phone ?? undefined,
        email: profile.email ?? undefined,
      });

    if (error || !organization) {
      throw error ?? new Error("Erro ao criar organização.");
    }

    const { error: memberError } =
      await organizationUserRepository.create({
        organization_id: organization.id,
        user_id: userId,
        role: "owner",
      });

    if (memberError) {
      throw memberError;
    }

    await organizationSetupService.createDefaultPipeline(
      organization.id
    );

    return organization.id;
  }

  async getCurrent(userId: string) {
  const { data, error } =
    await organizationRepository.getCurrentByUser(userId);

  if (error) {
    throw error;
  }

  return data;
}


}

export const organizationService = new OrganizationService();