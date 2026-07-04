import { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/src/lib/supabase/admin";

import { adminProfileRepository } from "@/src/server/repositories/admin-profile.repository";
import { adminOrganizationRepository } from "@/src/server/repositories/admin-organization.repository";
import { adminOrganizationUserRepository } from "@/src/server/repositories/admin-organization-user.repository";
import { adminPipelineRepository } from "@/src/server/repositories/admin-pipeline.repository";
import { adminSubscriptionRepository } from "@/src/server/repositories/admin-subscription.repository";

export class AccountInitializeService {
  async initialize(userId: string) {
    console.log("===== ACCOUNT INITIALIZE =====");

    const { data, error } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (error || !data.user) {
      throw new Error("Usuário não encontrado.");
    }

    const user = data.user;

    await this.ensureProfile(user);

    const organizationId =
      await this.ensureOrganization(user);

    await this.ensureDefaultPipeline(
      organizationId
    );

    await this.ensureFreeSubscription(
      organizationId
    );

    console.log("===== ACCOUNT READY =====");

    return user;
  }

  private async ensureProfile(user: User) {
    const { data: profile } =
      await adminProfileRepository.getById(user.id);

    if (profile) {
      console.log("ℹ️ Profile já existe");
      return;
    }

    const metadata = user.user_metadata ?? {};

    const { error } =
      await adminProfileRepository.create({
        id: user.id,
        full_name: metadata.full_name ?? "",
        phone: metadata.phone ?? "",
        avatar_url: metadata.avatar_url ?? null,
      });

    if (error) {
      throw error;
    }

    console.log("✅ Profile criado");
  }

  private async ensureOrganization(
    user: User
  ): Promise<string> {
    const { data: membership } =
      await adminOrganizationUserRepository.getByUser(
        user.id
      );

    if (membership) {
      console.log("ℹ️ Organização já existe");
      return membership.organization_id;
    }

    const metadata = user.user_metadata ?? {};

    const organizationName =
      metadata.business?.trim() ||
      `${(metadata.full_name ?? "Minha").split(" ")[0]} Negócios`;

    const slug = organizationName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const {
      data: organization,
      error,
    } =
      await adminOrganizationRepository.create({
        name: organizationName,
        slug,
        email: user.email ?? null,
        phone: metadata.phone ?? null,
      });

    if (error || !organization) {
      throw error;
    }

    const {
      error: membershipError,
    } =
      await adminOrganizationUserRepository.create({
        organization_id: organization.id,
        user_id: user.id,
        role: "owner",
      });

    if (membershipError) {
      throw membershipError;
    }

    console.log("✅ Organização criada");

    return organization.id;
  }

  private async ensureDefaultPipeline(
    organizationId: string
  ) {
    const { data: pipeline } =
      await adminPipelineRepository.getDefault(
        organizationId
      );

    if (pipeline) {
      console.log("ℹ️ Pipeline já existe");
      return;
    }

    const {
      data: createdPipeline,
      error,
    } =
      await adminPipelineRepository.create({
        organization_id: organizationId,
        name: "Pipeline de Vendas",
        description: "Pipeline padrão",
        is_default: true,
        is_active: true,
      });

    if (error || !createdPipeline) {
      throw error;
    }

    const { error: stageError } =
      await adminPipelineRepository.createStages(
        createdPipeline.id,
        [
          {
            name: "Novos Leads",
            position: 1,
            color: "#3B82F6",
            is_won: false,
            is_lost: false,
          },
          {
            name: "Contato",
            position: 2,
            color: "#8B5CF6",
            is_won: false,
            is_lost: false,
          },
          {
            name: "Proposta",
            position: 3,
            color: "#F59E0B",
            is_won: false,
            is_lost: false,
          },
          {
            name: "Negociação",
            position: 4,
            color: "#EC4899",
            is_won: false,
            is_lost: false,
          },
          {
            name: "Fechado",
            position: 5,
            color: "#22C55E",
            is_won: true,
            is_lost: false,
          },
          {
            name: "Perdido",
            position: 6,
            color: "#EF4444",
            is_won: false,
            is_lost: true,
          },
        ]
      );

    if (stageError) {
      throw stageError;
    }

    console.log("✅ Pipeline criado");
  }

  private async ensureFreeSubscription(
    organizationId: string
  ) {
    const { data: subscription } =
      await adminSubscriptionRepository.getByOrganization(
        organizationId
      );

    if (subscription) {
      console.log("ℹ️ Assinatura já existe");
      return;
    }

    const { data: freePlan } =
      await adminSubscriptionRepository.getFreePlan();

    if (!freePlan) {
      throw new Error(
        "Plano FREE não encontrado."
      );
    }

    const { error } =
      await adminSubscriptionRepository.create({
        organization_id: organizationId,
        plan_id: freePlan.id,
        status: "active",
      });

    if (error) {
      throw error;
    }

    console.log("✅ Plano FREE criado");
  }
}