import { customerActivityRepository } from "@/src/repositories/customer-activity.repository";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";

import { authService } from "./auth.service";

import { CustomerActivity } from "@/src/types/customer/customer-activity";

import { success, failure } from "@/src/lib/result";
import { Errors } from "@/src/constants/errors";
import { getErrorMessage } from "@/src/utils/get-error-message";

class CustomerActivityService {
  async list(customerId: string) {
    try {
      const { data, error } =
        await customerActivityRepository.list(customerId);

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(data ?? []);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async create(
    activity: Omit<
      CustomerActivity,
      "id" | "created_at" | "organization_id" | "user_id"
    >
  ) {
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

      const { data, error } =
        await customerActivityRepository.create({
          ...activity,
          organization_id: membership.organization_id,
          user_id: user.id,
        });

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(data);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }
}

export const customerActivityService =
  new CustomerActivityService();