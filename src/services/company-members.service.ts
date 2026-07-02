import { companyMembersRepository } from "@/src/repositories/company-members.repository";

class CompanyMembersService {
  async getMembers(organizationId: string) {
    const { data, error } =
      await companyMembersRepository.getMembers(
        organizationId
      );

    if (error) {
      throw error;
    }

    return data;
  }
}

export const companyMembersService =
  new CompanyMembersService();