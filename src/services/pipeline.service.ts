import { authService } from "./auth.service";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { pipelineRepository } from "@/src/repositories/pipeline.repository";

class PipelineService {
  async list() {
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

    const organizationId =
      membership.organizations.id;

    const { data, error } =
      await pipelineRepository.list(
        organizationId
      );

    if (error) {
      throw error;
    }

    return data ?? [];
  }
}

export const pipelineService =
  new PipelineService();