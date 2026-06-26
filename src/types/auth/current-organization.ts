import { User } from "@supabase/supabase-js";

import { Membership } from "../dashboard/membership";

export interface CurrentOrganization {
  user: User;
  membership: Membership;
  organizationId: string;
}