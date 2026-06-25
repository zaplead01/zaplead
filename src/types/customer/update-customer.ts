export interface UpdateCustomer {
  full_name?: string;

  company?: string;

  phone?: string;

  email?: string;

  lead_source?: string;

  estimated_value?: number;

  notes?: string;

  pipeline_id?: string;

  pipeline_stage_id?: string;

  assigned_to?: string;

  last_contact_at?: string;

  next_follow_up_at?: string;
}