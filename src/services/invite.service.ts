import { inviteRepository } from "@/src/repositories/invite.repository";

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
    const response = await fetch(
      "/api/company/invites",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          role: data.role,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Erro ao criar convite."
      );
    }

    return result;
  }

  async cancel(id: string) {
    const response = await fetch(
      `/api/company/invites/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Erro ao cancelar convite."
      );
    }

    return result;
  }

  async acceptByToken(
    token: string,
    userId: string
  ) {
    const response = await fetch(
      "/api/company/invites/accept",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          token,
          userId,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Erro ao aceitar convite."
      );
    }

    return result;
  }
}

export const inviteService =
  new InviteService();