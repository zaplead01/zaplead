import { Customer } from "../customer/customer";

export interface Task {
  id: string;
  organization_id: string;
  customer_id: string | null;
  assigned_to: string | null;

  title: string;
  description: string | null;

  due_date: string | null;

  priority: "low" | "medium" | "high";

  status: "pending" | "completed";

  completed_at: string | null;

  created_at: string;
  updated_at: string;

  customer?: Customer;
}