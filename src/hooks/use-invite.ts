"use client";

import { toast } from "sonner";

import { useCurrentUser } from "./use-current-user";

import { inviteService } from "@/src/services/invite.service";

export function useInvite() {
  const { user } = useCurrentUser();

  async function accept(token: string) {
    if (!user) {
      throw new Error("Faça login para aceitar o convite.");
    }

    try {
      await inviteService.acceptByToken(
        token,
        user.id
      );

      toast.success(
        "Convite aceito com sucesso!"
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao aceitar convite.");
      }

      throw error;
    }
  }

  return {
    accept,
  };
}