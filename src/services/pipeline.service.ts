import { pipelineRepository } from "@/src/repositories/pipeline.repository";

import { currentOrganizationService } from "./current-organization.service";

import { Pipeline } from "@/src/types/pipeline/pipeline";
import { PipelineStage } from "@/src/types/pipeline/pipeline-stage";

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

      if (!context.success) {
        return context;
      }

      const { organizationId } =
        context.data!;

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

  async listStages(
    pipelineId: string
  ) {
    try {
      const { data, error } =
        await pipelineRepository.listStages(
          pipelineId
        );

      if (error) {
        return failure(
          getErrorMessage(error)
        );
      }

      return success<PipelineStage[]>(
        data ?? []
      );
    } catch (error) {
      return failure(
        getErrorMessage(error)
      );
    }
  }
}

export const pipelineService =
  new PipelineService();