import { inviteRepository } from "@/src/repositories/invite.repository";
import { organizationRepository } from "@/src/repositories/organization.repository";

import { organizationUserRepository } from "@/src/repositories/organization-user.repository";

class InviteService {
  async getByOrganization(organizationId: string) {
    const { data, error } =
      await inviteRepository.getByOrganization(
        organizationId
      );

    if (error) {
      throw error;
    }

    return data;
  }

  async create(data: {
    organization_id: string;
    email: string;
    role: "admin" | "member";
    invited_by: string;
  }) {
    // Verifica se já existe um convite pendente
    const invites =
      await this.getByOrganization(data.organization_id);

    const existingInvite = invites.find(
      (invite) =>
        invite.email.toLowerCase() ===
          data.email.toLowerCase() &&
        invite.status === "pending"
    );

    if (existingInvite) {
      throw new Error(
        "Já existe um convite pendente para este e-mail."
      );
    }

    // Cria o convite
    const { data: invite, error } =
      await inviteRepository.create(data);

    if (error || !invite) {
      throw error ?? new Error("Erro ao criar convite.");
    }

    // Busca a empresa
    const { data: organization } =
      await organizationRepository.getById(
        data.organization_id
      );

    // Envia o e-mail
    const response = await fetch("/api/invites/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: invite.email,
        role: invite.role,
        token: invite.token,
        companyName:
          organization?.name ?? "ZapLead",
      }),
    });

    if (!response.ok) {
      const result = await response.json();

      console.error(result);

      throw new Error(
        result.error ?? "Erro ao enviar e-mail."
      );
    }

    return invite;
  }

  async cancel(inviteId: string) {
    const { data, error } =
      await inviteRepository.updateStatus(
        inviteId,
        "cancelled"
      );

    if (error) {
      throw error;
    }

    return data;
  }

  async accept(inviteId: string) {
    const { data, error } =
      await inviteRepository.updateStatus(
        inviteId,
        "accepted"
      );

    if (error) {
      throw error;
    }

    return data;
  }

  async expire(inviteId: string) {
    const { data, error } =
      await inviteRepository.updateStatus(
        inviteId,
        "expired"
      );

    if (error) {
      throw error;
    }

    return data;
  }

  async delete(inviteId: string) {
    const { error } =
      await inviteRepository.delete(inviteId);

    if (error) {
      throw error;
    }
  }

  async acceptByToken(token: string, userId: string) {
  const { data: invite, error } =
    await inviteRepository.getByToken(token);

  if (error || !invite) {
    throw new Error("Convite inválido.");
  }

  if (invite.status !== "pending") {
    throw new Error("Este convite não está mais disponível.");
  }

  if (
    invite.expires_at &&
    new Date(invite.expires_at) < new Date()
  ) {
    await this.expire(invite.id);

    throw new Error("Este convite expirou.");
  }

  // Verifica se o usuário já pertence à empresa
  const { data: membership } =
    await organizationUserRepository.getByUser(userId);

  if (membership) {
    throw new Error(
      "Você já faz parte de uma empresa."
    );
  }

  // Adiciona o usuário na empresa
  const { error: memberError } =
    await organizationUserRepository.create({
      organization_id: invite.organization_id,
      user_id: userId,
      role: invite.role,
    });

  if (memberError) {
    throw memberError;
  }

  // Marca o convite como aceito
  await this.accept(invite.id);

  return invite;
}


}

export const inviteService = new InviteService();