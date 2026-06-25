import { authService } from "@/src/services/auth.service";
import { profileRepository } from "@/src/repositories/profile.repository";
import { organizationService } from "@/src/services/organization.service";
import { subscriptionService } from "@/src/services/subscription.service";

class OnboardingService {
  async initialize() {
    const { data: session } = await authService.session();

    if (!session.session?.user) {
      return;
    }

    const user = session.session.user;

    // Procura o perfil
    const { data: profile } = await profileRepository.getById(user.id);

    let currentProfile = profile;

    // Se não existir, cria
    if (!currentProfile) {
      const metadata = user.user_metadata;

      const { data: newProfile, error } =
        await profileRepository.create({
          id: user.id,
          full_name: metadata.full_name ?? "",
          phone: metadata.phone ?? "",
          avatar_url: metadata.avatar_url ?? null,
        });

      if (error || !newProfile) {
        throw error ?? new Error("Erro ao criar perfil.");
      }

      currentProfile = newProfile;
    }

    // Cria organização caso não exista
    const organizationId =
      await organizationService.ensureOrganization(
        user.id,
        {
          full_name: currentProfile.full_name,
          phone: currentProfile.phone,
          email: user.email,
          business:
            user.user_metadata?.business ??
            null,
        }
      );

    // Cria plano FREE
    await subscriptionService.ensureFreePlan(
      organizationId
    );
  }
}

export const onboardingService =
  new OnboardingService();