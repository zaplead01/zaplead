export type CustomerActivity = {
  id: string;

  organization_id: string;

  customer_id: string;

  user_id: string | null;

  type: string;

  title: string;

  description: string | null;

  metadata: Record<string, any> | null;

  created_at: string;
};