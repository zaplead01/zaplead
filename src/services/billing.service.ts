import { billingRepository } from "@/src/repositories/billing.repository";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { authService } from "./auth.service";

import { success, failure } from "@/src/lib/result";
import { Errors } from "@/src/constants/errors";
import { getErrorMessage } from "@/src/utils/get-error-message";

class BillingService {
  async getBilling() {
    try {
      const {
        data: { user },
      } = await authService.me();

      if (!user) {
        return failure(Errors.USER_NOT_FOUND);
      }

      const { data: membership } =
        await dashboardRepository.getMembership(user.id);

      if (!membership) {
        return failure(Errors.ORGANIZATION_NOT_FOUND);
      }

      const organizationId =
        membership.organization_id;

      const [
        subscriptionResult,
        customersResult,
        usersResult,
        pipelinesResult,
      ] = await Promise.all([
        billingRepository.getSubscription(
          organizationId
        ),
        billingRepository.countCustomers(
          organizationId
        ),
        billingRepository.countUsers(
          organizationId
        ),
        billingRepository.countPipelines(
          organizationId
        ),
      ]);

      if (subscriptionResult.error) {
        return failure(
          getErrorMessage(subscriptionResult.error)
        );
      }

      const subscription =
        subscriptionResult.data;
        console.log("PLAN", subscription.plan);

      if (!subscription) {
        return failure(
          "Assinatura não encontrada."
        );
      }

      return success({
        subscription,

        plan: subscription.plan,

        usage: {
          customers: {
            current:
              customersResult.count ?? 0,
            limit:
              subscription.plan.max_customers,
          },

          users: {
            current:
              usersResult.count ?? 0,
            limit:
              subscription.plan.max_users,
          },

          pipelines: {
            current:
              pipelinesResult.count ?? 0,
            limit:
              subscription.plan.max_pipelines,
          },
        },
      });
    } catch (error) {
      return failure(
        getErrorMessage(error)
      );
    }
  }
}

export const billingService =
  new BillingService();