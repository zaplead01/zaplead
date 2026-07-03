import { Plan } from "@/src/types/plan/plan";

class PermissionService {
  canCreateCustomers(plan: Plan | null, total: number) {
    if (!plan) return false;

    return total < plan.max_customers;
  }

  canInviteUsers(plan: Plan | null, total: number) {
    if (!plan) return false;

    return total < plan.max_users;
  }

  canUsePremiumReports(plan: Plan | null) {
    return plan?.has_premium_reports === true;
  }

  canUseTags(plan: Plan | null) {
    return plan?.has_tags === true;
  }

  canUseApi(plan: Plan | null) {
    return plan?.has_api === true;
  }

  canUseIntegrations(plan: Plan | null) {
    return plan?.has_integrations === true;
  }
}

export const permissionService = new PermissionService();