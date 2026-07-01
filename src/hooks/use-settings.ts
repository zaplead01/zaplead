"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useCurrentUser } from "@/src/hooks/use-current-user";
import { settingsService } from "@/src/services/settings.service";

type Settings = {
  user_id: string;
  email_notifications: boolean;
  task_reminders: boolean;
  created_at: string;
  updated_at: string;
};

export function useSettings() {
  const { user } = useCurrentUser();

  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    try {
      const data = await settingsService.get(user.id);

      setSettings(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function update(data: {
    email_notifications?: boolean;
    task_reminders?: boolean;
  }) {
    if (!user) return;

    setSaving(true);

    try {
      const { data: updated, error } =
        await settingsService.update(user.id, data);

      if (error) {
        toast.error(error.message);
        return;
      }

      setSettings(updated);

      toast.success("Configurações salvas.");
    } finally {
      setSaving(false);
    }
  }

  return {
    settings,
    loading,
    saving,
    update,
    reload: load,
  };
}