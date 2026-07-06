import { Plan } from "@/src/types/plan/plan";

export type PermissionResult = {
  allowed: boolean;
  code?: string;
  message?: string;
};

class PermissionService {
  canCreateCustomers(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "NO_PLAN",
        message: "Plano não encontrado.",
      };
    }

    if (
      plan.max_customers !== null &&
      total >= plan.max_customers
    ) {
      return {
        allowed: false,
        code: "PLAN_LIMIT",
        message: `Você atingiu o limite de ${plan.max_customers} clientes do plano ${plan.name}. Faça upgrade para continuar.`,
      };
    }

    return {
      allowed: true,
    };
  }

  canInviteUsers(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "NO_PLAN",
        message: "Plano não encontrado.",
      };
    }

    if (
      plan.max_users !== null &&
      total >= plan.max_users
    ) {
      return {
        allowed: false,
        code: "USER_LIMIT",
        message: `Seu plano permite apenas ${plan.max_users} usuário(s).`,
      };
    }

    return {
      allowed: true,
    };
  }

  canUsePremiumReports(
    plan: Plan | null
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "NO_PLAN",
        message: "Plano não encontrado.",
      };
    }

    if (!plan.has_premium_reports) {
      return {
        allowed: false,
        code: "PREMIUM_REPORTS",
        message:
          "Relatórios Premium disponíveis apenas no plano Premium.",
      };
    }

    return {
      allowed: true,
    };
  }

  canUseTags(
    plan: Plan | null
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "NO_PLAN",
        message: "Plano não encontrado.",
      };
    }

    if (!plan.has_tags) {
      return {
        allowed: false,
        code: "TAGS_PREMIUM",
        message:
          "Tags estão disponíveis apenas no plano Premium.",
      };
    }

    return {
      allowed: true,
    };
  }

  canUseApi(
    plan: Plan | null
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "API_PREMIUM",
        message: "Plano não encontrado.",
      };
    }

    if (!plan.has_api) {
      return {
        allowed: false,
        code: "API_PREMIUM",
        message:
          "A API está disponível apenas no plano Premium.",
      };
    }

    return {
      allowed: true,
    };
  }

  canUseIntegrations(
    plan: Plan | null
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        code: "NO_PLAN",
        message: "Plano não encontrado.",
      };
    }

    if (!plan.has_integrations) {
      return {
        allowed: false,
        code: "INTEGRATIONS_PREMIUM",
        message:
          "Integrações estão disponíveis apenas no plano Premium.",
      };
    }

    return {
      allowed: true,
    };
  }
}

export const permissionService =
  new PermissionService();