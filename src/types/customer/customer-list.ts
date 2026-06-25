export interface CustomerList {
  id: string;

  full_name: string;

  company: string | null;

  phone: string | null;

  estimated_value: number | null;

  pipeline_stage_id: string | null;
}