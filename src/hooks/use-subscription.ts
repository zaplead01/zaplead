"use client";

import { useEffect, useState } from "react";

import { useCurrentUser } from "./use-current-user";

import { organizationRepository } from "@/src/repositories/organization.repository";
import { subscriptionService } from "@/src/services/subscription.service";

export function useSubscription() {
  const { user } = useCurrentUser();

  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!user) return;

    setLoading(true);

    const { data: organization } =
      await organizationRepository.getCurrentByUser(
        user.id
      );

    if (!organization) {
      setLoading(false);
      return;
    }

    const data =
      await subscriptionService.getCurrent(
        organization.id
      );

    setSubscription(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  return {
    subscription,
    loading,
    reload: load,
  };
}