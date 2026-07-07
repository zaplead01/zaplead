import { authService } from "./auth.service";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { pipelineRepository } from "@/src/repositories/pipeline.repository";
import { permissionService } from "./permission.service";

class PipelineService {
  private async getOrganizationContext() {
    const {
      data: { user },
    } = await authService.me();

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data: membership } =
      await dashboardRepository.getMembership(user.id);

    if (!membership) {
      throw new Error("Organização não encontrada.");
    }

    const { data: subscription } =
      await dashboardRepository.getSubscription(
        membership.organization_id
      );

    return {
      user,
      organizationId: membership.organization_id,
      plan: subscription?.plans ?? null,
    };
  }

  async list() {
    const { organizationId } =
      await this.getOrganizationContext();

    const { data, error } =
      await pipelineRepository.list(
        organizationId
      );

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async canCreatePipeline() {
    const {
      organizationId,
      plan,
    } = await this.getOrganizationContext();

    const {
      count,
      error,
    } = await pipelineRepository.count(
      organizationId
    );

    if (error) {
      throw error;
    }

    return permissionService.canCreatePipelines(
      plan,
      count ?? 0
    );
  }

  async create(name: string) {
  const { organizationId, plan } =
    await this.getOrganizationContext();

  const { count, error: countError } =
    await pipelineRepository.count(organizationId);

  if (countError) {
    throw countError;
  }

  if (
    !permissionService.canCreatePipelines(
      plan,
      count ?? 0
    )
  ) {
    throw new Error("PIPELINE_LIMIT");
  }

  const { data: pipeline, error } =
    await pipelineRepository.create({
      organization_id: organizationId,
      name,
    });

  if (error || !pipeline) {
    throw error ?? new Error("Erro ao criar pipeline.");
  }

  const { error: stagesError } =
    await pipelineRepository.createStages([
      {
        pipeline_id: pipeline.id,
        name: "Novo Lead",
        position: 1,
        color: "#3B82F6",
        is_won: false,
        is_lost: false,
      },
      {
        pipeline_id: pipeline.id,
        name: "Contato",
        position: 2,
        color: "#8B5CF6",
        is_won: false,
        is_lost: false,
      },
      {
        pipeline_id: pipeline.id,
        name: "Proposta",
        position: 3,
        color: "#F59E0B",
        is_won: false,
        is_lost: false,
      },
      {
        pipeline_id: pipeline.id,
        name: "Negociação",
        position: 4,
        color: "#EC4899",
        is_won: false,
        is_lost: false,
      },
      {
        pipeline_id: pipeline.id,
        name: "Fechado",
        position: 5,
        color: "#22C55E",
        is_won: true,
        is_lost: false,
      },
      {
        pipeline_id: pipeline.id,
        name: "Perdido",
        position: 6,
        color: "#EF4444",
        is_won: false,
        is_lost: true,
      },
    ]);

  if (stagesError) {
    throw stagesError;
  }

  return pipeline;
}


}



export const pipelineService =
  new PipelineService();