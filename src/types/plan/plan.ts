export interface Plan {
  id: string;

  name: string;

  slug: "free" | "pro" | "enterprise";

  price: number;

  max_users: number;

  max_customers: number;

  has_premium_reports: boolean;

  has_tags: boolean;

  has_api: boolean;

  has_integrations: boolean;

  has_priority_support: boolean;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}