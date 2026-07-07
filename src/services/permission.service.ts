import { Plan } from "@/src/types/plan/plan";

type PermissionResult = {
  allowed: boolean;
  message?: string;
  code?: string;
};

class PermissionService {
  canCreateCustomers(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        message: "Plano não encontrado.",
        code: "PLAN_NOT_FOUND",
      };
    }

    if (total >= plan.max_customers) {
      return {
        allowed: false,
        message: `Você atingiu o limite de ${plan.max_customers} clientes do plano ${plan.name}. Faça upgrade para continuar.`,
        code: "CUSTOMER_LIMIT",
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
        message: "Plano não encontrado.",
        code: "PLAN_NOT_FOUND",
      };
    }

    if (total >= plan.max_users) {
      return {
        allowed: false,
        message: "Você atingiu o limite de usuários.",
        code: "USER_LIMIT",
      };
    }

    return {
      allowed: true,
    };
  }

  canCreatePipeline(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        message: "Plano não encontrado.",
        code: "PLAN_NOT_FOUND",
      };
    }

    if (total >= plan.max_pipelines) {
      return {
        allowed: false,
        message: "Você atingiu o limite de pipelines.",
        code: "PIPELINE_LIMIT",
      };
    }

    return {
      allowed: true,
    };
  }

  canCreateTag(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        message: "Plano não encontrado.",
        code: "TAG_LIMIT",
      };
    }

    if (total >= plan.max_tags) {
      return {
        allowed: false,
        message: "Limite de tags atingido.",
        code: "TAG_LIMIT",
      };
    }

    return {
      allowed: true,
    };
  }

  canCreateAutomation(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        message: "Plano não encontrado.",
        code: "PLAN_NOT_FOUND",
      };
    }

    if (total >= plan.max_automations) {
      return {
        allowed: false,
        message: "Limite de automações atingido.",
        code: "AUTOMATION_LIMIT",
      };
    }

    return {
      allowed: true,
    };
  }

  canCreateWebhook(
    plan: Plan | null,
    total: number
  ): PermissionResult {
    if (!plan) {
      return {
        allowed: false,
        message: "Plano não encontrado.",
        code: "PLAN_NOT_FOUND",
      };
    }

    if (total >= plan.max_webhooks) {
      return {
        allowed: false,
        message: "Limite de Webhooks atingido.",
        code: "WEBHOOK_LIMIT",
      };
    }

    return {
      allowed: true,
    };
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

  isFree(plan: Plan | null) {
    return plan?.slug === "free";
  }

  isPremium(plan: Plan | null) {
    return plan?.slug === "pro";
  }

  canCreatePipelines(plan: Plan | null, total: number) {
  if (!plan) return false;

  return total < plan.max_pipelines;
}

}

export const permissionService =
  new PermissionService();