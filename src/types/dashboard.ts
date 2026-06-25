import { Organization } from "./organization";
import { Subscription } from "./subscription";

export interface DashboardData {
  userName: string;
  organizationName: string;
  plan: string;
  createdAt: string;

  customers: number;
  users: number;

  profile: {
    id: string;
    full_name: string;
    phone: string | null;
    avatar_url: string |null;
  };

  organization: Organization;

  subscription: Subscription | null;
}