export interface Customer {
  id: string;

  organization_id: string;

  pipeline_id: string | null;

  pipeline_stage_id: string | null;

  assigned_to: string | null;

  full_name: string;

  company: string | null;

  phone: string | null;

  email: string | null;

  lead_source: string | null;

  estimated_value: number | null;

  notes: string | null;

  last_contact_at: string | null;

  next_follow_up_at: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}