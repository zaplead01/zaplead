"use client";

import { toast } from "sonner";

import { organizationUserService } from "@/src/services/organization-user.service";

import { useCompanyMembers } from "./use-company-members";

export function useOrganizationMembers() {
  const { members, loading, reload } =
    useCompanyMembers();

  async function updateRole(
    id: string,
    role: "admin" | "member"
  ) {
    try {
      await organizationUserService.updateRole(
        id,
        role
      );

      toast.success("Cargo atualizado com sucesso!");

      await reload();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message ??
          "Erro ao atualizar cargo."
      );
    }
  }

  async function remove(id: string) {
    try {
      await organizationUserService.remove(id);

      toast.success("Membro removido.");

      await reload();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message ??
          "Erro ao remover membro."
      );
    }
  }

  return {
    members,
    loading,
    updateRole,
    remove,
  };
}