import { authService } from "./auth.service";

import { dashboardRepository } from "@/src/repositories/dashboard.repository";

import { Errors } from "@/src/constants/errors";

import {
  success,
  failure,
} from "@/src/lib/result";

import { ServiceResponse } from "@/src/types/responses/service-response";
import { CurrentOrganization } from "@/src/types/auth/current-organization";

class CurrentOrganizationService {
  async get(): Promise<
    ServiceResponse<CurrentOrganization>
  > {
    try {
      const {
        data: { user },
      } = await authService.me();

      if (!user) {
        return failure(
          Errors.USER_NOT_FOUND
        );
      }

      const { data: membership } =
        await dashboardRepository.getMembership(
          user.id
        );

      if (!membership) {
        return failure(
          Errors.ORGANIZATION_NOT_FOUND
        );
      }

      return success<CurrentOrganization>({
        user,
        membership,
        organizationId:
          membership.organization_id,
      });
    } catch (error) {
      return failure(
        error instanceof Error
          ? error.message
          : "Erro ao recuperar organização."
      );
    }
  }
}

export const currentOrganizationService =
  new CurrentOrganizationService();