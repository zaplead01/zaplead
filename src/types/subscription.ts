export type PlanType =
  | "free"
  | "premium"
  | "business";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "expired";

export interface Subscription {
  id: string;
  organization_id: string;

  plan: PlanType;

  status: SubscriptionStatus;

  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;

  trial_ends_at: string | null;
  current_period_end: string | null;

  created_at: string;
  updated_at: string;
}