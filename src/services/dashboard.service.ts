import { authService } from "./auth.service";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";

class DashboardService {
  async getDashboard() {
    const {
      data: { user },
    } = await authService.me();

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data: profile } =
      await dashboardRepository.getProfile(user.id);

    const { data: membership } =
      await dashboardRepository.getMembership(user.id);

    if (!membership) {
      throw new Error("Organização não encontrada.");
    }

    const organization = membership.organizations;

    const { data: subscription } =
      await dashboardRepository.getSubscription(
        organization.id
      );

    const customers =
      await dashboardRepository.getCustomersCount(
        organization.id
      );

    const users =
      await dashboardRepository.getUsersCount(
        organization.id
      );

    return {
  userName: profile?.full_name ?? "Usuário",

  organizationName: organization.name,

  plan: subscription?.plan?.toUpperCase() ?? "FREE",

  createdAt: new Date(
    organization.created_at
  ).toLocaleDateString("pt-BR"),

  customers: customers.count ?? 0,

  users: users.count ?? 0,

  profile,
  organization,
  subscription,
};
  }
}

export const dashboardService = new DashboardService();