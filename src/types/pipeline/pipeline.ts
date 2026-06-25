export interface Pipeline {
  id: string;

  organization_id: string;

  name: string;

  color: string | null;

  order: number;

  created_at: string;

  updated_at: string;
}