import { pipelineRepository } from "@/src/repositories/pipeline.repository";
import { pipelineStageRepository } from "@/src/repositories/pipeline-stage.repository";

class OrganizationSetupService {
  async createDefaultPipeline(
  organizationId: string
) {
  console.log("Criando pipeline...");

  const { data: pipeline, error } =
    await pipelineRepository.create(
      organizationId,
      "Vendas"
    );

  console.log("Pipeline:", pipeline);
  console.log("Erro pipeline:", error);

  if (error || !pipeline) {
    throw error ?? new Error("Erro ao criar pipeline.");
  }

  const stages = [
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
  ];

  console.log("Etapas que serão inseridas:", stages);

  try {
    const result =
      await pipelineStageRepository.createMany(stages);

    console.log("Resultado createMany:", result);

    if (result.error) {
      throw result.error;
    }

    console.log("Etapas criadas com sucesso!");
  } catch (err) {
    console.error("Erro criando etapas:", err);
    throw err;
  }

  return pipeline;
}
}

export const organizationSetupService =
  new OrganizationSetupService();