export interface CreateCustomer {
  full_name: string;

  company?: string;

  phone?: string;

  email?: string;

  lead_source?: string;

  estimated_value?: number;

  notes?: string;
}