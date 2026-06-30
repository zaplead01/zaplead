import { Customer } from "@/src/types/customer/customer";

export interface PipelineStage {
  id: string;

  pipeline_id: string;

  name: string;

  position: number;

  color: string;

  is_won: boolean;

  is_lost: boolean;

  created_at: string;

  updated_at: string;

  customers: Customer[];
}