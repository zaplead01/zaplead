import { pipelineRepository } from "@/src/repositories/pipeline.repository";

import { currentOrganizationService } from "@/src/services/current-organization.service";

import { Pipeline } from "@/src/types/pipeline/pipeline";

import {
  success,
  failure,
} from "@/src/lib/result";

import { getErrorMessage } from "@/src/utils/get-error-message";

class PipelineService {
  async list() {
    try {
      const context =
        await currentOrganizationService.get();

      if (!context.success || !context.data) {
        return failure(
          context.message ??
            "Organização não encontrada."
        );
      }

      const { organizationId } =
        context.data;

      const { data, error } =
        await pipelineRepository.list(
          organizationId
        );

      if (error) {
        return failure(
          getErrorMessage(error)
        );
      }

      return success<Pipeline[]>(
        data ?? []
      );
    } catch (error) {
      return failure(
        getErrorMessage(error)
      );
    }
  }

  async moveCustomer(
    customerId: string,
    stageId: string
  ) {
    try {
      const { error } =
        await pipelineRepository.updateCustomerStage(
          customerId,
          stageId
        );

      if (error) {
        return failure(
          getErrorMessage(error)
        );
      }

      return success(true);
    } catch (error) {
      return failure(
        getErrorMessage(error)
      );
    }
  }
}

export const pipelineService =
  new PipelineService();