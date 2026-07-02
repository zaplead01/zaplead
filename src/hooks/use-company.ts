"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useCurrentUser } from "./use-current-user";

import { companyService } from "@/src/services/company.service";

export function useCompany() {
  const { user } = useCurrentUser();

  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await companyService.getCurrent(user.id);
      setCompany(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar empresa.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function update(
    data: {
      name?: string;
      phone?: string | null;
      email?: string | null;
    }
  ) {
    if (!company) return;

    try {
      setSaving(true);

      const updated = await companyService.update(
        company.id,
        data
      );

      setCompany(updated);

      toast.success("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar empresa.");
    } finally {
      setSaving(false);
    }
  }

  return {
    company,
    loading,
    saving,
    reload: load,
    update,
  };
}