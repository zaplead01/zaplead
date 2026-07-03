"use client";

import { Organization } from "@/src/types/organization";
import { Subscription } from "@/src/types/subscription";
import { Plan } from "@/src/types/plan/plan";

import { organizationService } from "@/src/services/organization.service";
import { subscriptionService } from "@/src/services/subscription.service";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "@supabase/supabase-js";
import { authService } from "@/src/services/auth.service";

type AuthContextType = {
  user: User | null;

  organization: Organization | null;

  subscription: Subscription | null;

  plan: Plan | null;

  loading: boolean;

  refreshUser: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] =
  useState<Organization | null>(null);

const [subscription, setSubscription] =
  useState<Subscription | null>(null);

const [plan, setPlan] =
  useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    setLoading(true);

    try {
      const { data } = await authService.me();

const currentUser = data.user ?? null;

setUser(currentUser);

if (currentUser) {

  const currentOrganization =
    await organizationService.getCurrent(
      currentUser.id
    );

  setOrganization(currentOrganization);

  if (currentOrganization) {

    const currentSubscription =
      await subscriptionService.getCurrent(
        currentOrganization.id
      );

    setSubscription(currentSubscription);

    setPlan(
      currentSubscription?.plan ?? null
    );

  } else {

    setSubscription(null);
    setPlan(null);

  }

} else {

  setOrganization(null);
  setSubscription(null);
  setPlan(null);

}
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
  value={{
    user,
    organization,
    subscription,
    plan,
    loading,
    refreshUser,
  }}
>
  {children}
</AuthContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useCurrentUser deve ser utilizado dentro do AuthProvider"
    );
  }

  return context;
}