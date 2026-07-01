"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { profileService } from "@/src/services/profile.service";

type Profile = {
  id: string;
  full_name: string;
  phone: string;
  avatar_url: string | null;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } =
        await profileService.getCurrentProfile();

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data) {
        toast.error("Perfil não encontrado.");
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function update(data: {
    full_name: string;
    phone: string;
  }) {
    if (!profile) return false;

    setSaving(true);

    try {
      const { error } = await profileService.updateProfile(
        profile.id,
        {
          full_name: data.full_name,
          phone: data.phone,
        }
      );

      if (error) {
        toast.error(error.message);
        return false;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: data.full_name,
              phone: data.phone,
            }
          : prev
      );

      toast.success("Perfil atualizado com sucesso!");

      return true;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  return {
    profile,
    loading,
    saving,
    update,
    reload: loadProfile,
  };
}