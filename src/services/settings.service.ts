import { settingsRepository } from "@/src/repositories/settings.repository";

class SettingsService {
  async get(userId: string) {
    let { data } = await settingsRepository.get(userId);

    if (!data) {
      const result = await settingsRepository.create(userId);
      data = result.data;
    }

    return data;
  }

  async update(
    userId: string,
    data: {
      email_notifications?: boolean;
      task_reminders?: boolean;
    }
  ) {
    return settingsRepository.update(userId, data);
  }
}

export const settingsService = new SettingsService();