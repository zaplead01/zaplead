import { pipelineRepository } from "@/src/repositories/pipeline.repository";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { authService } from "./auth.service";
import { Pipeline } from "@/src/types/pipeline/pipeline";
import { success, failure } from "@/src/lib/result";
import { Errors } from "@/src/constants/errors";
import { getErrorMessage } from "@/src/utils/get-error-message";

class PipelineService {
  async list() {
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
        await pipelineRepository.list(
          membership.organization_id
        );

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success<Pipeline[]>(data ?? []);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async listStages(
    pipelineId: string
  ) {
    try {
      const { data, error } =
        await pipelineRepository.listStages(
          pipelineId
        );

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(data ?? []);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }
}

export const pipelineService =
  new PipelineService();