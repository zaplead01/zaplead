import { pipelineRepository } from "@/src/repositories/pipeline.repository";
import { pipelineStageRepository } from "@/src/repositories/pipeline-stage.repository";

import {
  success,
  failure,
} from "@/src/lib/result";

import { getErrorMessage } from "@/src/utils/get-error-message";

class OrganizationSetupService {
  async setup(
    organizationId: string
  ) {
    try {
      const {
        data: pipeline,
        error,
      } = await pipelineRepository.create(
        organizationId,
        "Vendas"
      );

      if (error || !pipeline) {
        return failure(
          getErrorMessage(error)
        );
      }

      await pipelineStageRepository.createMany([
        {
          pipeline_id: pipeline.id,
          name: "Novo Lead",
          position: 1,
          color: "#3B82F6",
        },
        {
          pipeline_id: pipeline.id,
          name: "Primeiro Contato",
          position: 2,
          color: "#8B5CF6",
        },
        {
          pipeline_id: pipeline.id,
          name: "Negociação",
          position: 3,
          color: "#F59E0B",
        },
        {
          pipeline_id: pipeline.id,
          name: "Proposta",
          position: 4,
          color: "#06B6D4",
        },
        {
          pipeline_id: pipeline.id,
          name: "Fechado",
          position: 5,
          color: "#22C55E",
        },
        {
          pipeline_id: pipeline.id,
          name: "Perdido",
          position: 6,
          color: "#EF4444",
        },
      ]);

      return success();
    } catch (error) {
      return failure(
        getErrorMessage(error)
      );
    }
  }
}

export const organizationSetupService =
  new OrganizationSetupService();