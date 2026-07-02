import { organizationRepository } from "@/src/repositories/organization.repository";

class CompanyService {
  async getCurrent(userId: string) {
    const { data, error } =
      await organizationRepository.getCurrentByUser(userId);

    if (error) {
      throw error;
    }

    return data;
  }

  async update(
    organizationId: string,
    data: {
      name?: string;
      phone?: string | null;
      email?: string | null;
    }
  ) {
    const { data: organization, error } =
      await organizationRepository.update(
        organizationId,
        data
      );

    if (error) {
      throw error;
    }

    return organization;
  }
}

export const companyService = new CompanyService();