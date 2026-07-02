import { supabase } from "@/src/lib/supabase/client";

class InviteRepository {
  async getByOrganization(organizationId: string) {
    return await supabase
      .from("organization_invites")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", {
        ascending: false,
      });
  }

  async create(data: {
    organization_id: string;
    email: string;
    role: "admin" | "member";
    invited_by: string;
  }) {
    return await supabase
      .from("organization_invites")
      .insert(data)
      .select()
      .single();
  }

  async getByToken(token: string) {
    return await supabase
      .from("organization_invites")
      .select("*")
      .eq("token", token)
      .maybeSingle();
  }

  async updateStatus(
    id: string,
    status:
      | "pending"
      | "accepted"
      | "cancelled"
      | "expired"
  ) {
    const updateData: {
      status: string;
      accepted_at?: string;
    } = {
      status,
    };

    if (status === "accepted") {
      updateData.accepted_at = new Date().toISOString();
    }

    return await supabase
      .from("organization_invites")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
  }

  async delete(id: string) {
    return await supabase
      .from("organization_invites")
      .delete()
      .eq("id", id);
  }
}

export const inviteRepository = new InviteRepository();