import { supabase } from "@/src/lib/supabase/client";

class SettingsRepository {
  async get(userId: string) {
    return supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
  }

  async create(userId: string) {
    return supabase
      .from("user_settings")
      .insert({
        user_id: userId,
      })
      .select()
      .single();
  }

  async update(
    userId: string,
    data: {
      email_notifications?: boolean;
      task_reminders?: boolean;
    }
  ) {
    return supabase
      .from("user_settings")
      .update(data)
      .eq("user_id", userId)
      .select()
      .single();
  }
}

export const settingsRepository = new SettingsRepository();