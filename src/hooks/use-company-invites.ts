"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useCurrentUser } from "./use-current-user";

import { companyService } from "@/src/services/company.service";
import { inviteService } from "@/src/services/invite.service";

export function useCompanyInvites() {
  const { user } = useCurrentUser();

  const [invites, setInvites] = useState<any[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const organization =
        await companyService.getCurrent(user.id);

      if (!organization) {
        setInvites([]);
        return;
      }

      setOrganizationId(organization.id);

      const data =
        await inviteService.getByOrganization(
          organization.id
        );

      setInvites(data ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar convites.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function create(
    email: string,
    role: "admin" | "member"
  ) {
    if (!organizationId || !user) return;

    try {
      setSaving(true);

      await inviteService.create({
        organization_id: organizationId,
        email,
        role,
        invited_by: user.id,
      });

      toast.success("Convite enviado com sucesso!");

      await load();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao enviar convite.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function cancel(inviteId: string) {
    try {
      await inviteService.cancel(inviteId);

      toast.success("Convite cancelado.");

      await load();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar convite.");
    }
  }

  return {
    invites,
    loading,
    saving,
    create,
    cancel,
    reload: load,
  };
}