class OrganizationUserService {
  async updateRole(
    id: string,
    role: "admin" | "member"
  ) {
    const response = await fetch(
      `/api/company/members/${id}/role`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ?? "Erro ao alterar cargo."
      );
    }

    return data;
  }

  async remove(id: string) {
    const response = await fetch(
      `/api/company/members/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ?? "Erro ao remover membro."
      );
    }

    return data;
  }
}

export const organizationUserService =
  new OrganizationUserService();