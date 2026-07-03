import { Plan } from "@/src/types/plan/plan";

class PlanService {
  canCreateCustomer(
    plan: Plan | null,
    totalCustomers: number
  ) {
    if (!plan) return false;

    return totalCustomers < plan.max_customers;
  }

  canInviteUser(
    plan: Plan | null,
    totalUsers: number
  ) {
    if (!plan) return false;

    return totalUsers < plan.max_users;
  }

  canUseTags(plan: Plan | null) {
    return !!plan?.has_tags;
  }

  canUsePremiumReports(plan: Plan | null) {
    return !!plan?.has_premium_reports;
  }

  canUseApi(plan: Plan | null) {
    return !!plan?.has_api;
  }

  canUseIntegrations(plan: Plan | null) {
    return !!plan?.has_integrations;
  }
}

export const planService = new PlanService();