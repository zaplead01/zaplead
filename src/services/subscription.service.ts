import { subscriptionRepository } from "@/src/repositories/subscription.repository";

class SubscriptionService {
  async ensureFreePlan(organizationId: string) {
    const { data } =
      await subscriptionRepository.getByOrganization(
        organizationId
      );

    if (data) {
      return data;
    }

    const { data: subscription, error } =
      await subscriptionRepository.createFree(
        organizationId
      );

    if (error) {
      throw error;
    }

    return subscription;
  }

  async getCurrent(organizationId: string) {
    const { data, error } =
      await subscriptionRepository.getCurrent(
        organizationId
      );

    if (error) {
      throw error;
    }

    return data;
  }
}

export const subscriptionService =
  new SubscriptionService();