import { profileRepository } from "@/src/repositories/profile.repository";

class ProfileService {
  async getCurrentProfile() {
    return await profileRepository.getCurrent();
  }

  async updateProfile(
    id: string,
    data: {
      full_name?: string;
      phone?: string;
      avatar_url?: string | null;
    }
  ) {
    return await profileRepository.update(id, data);
  }
}

export const profileService = new ProfileService();