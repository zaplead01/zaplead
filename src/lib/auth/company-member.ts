import { SupabaseClient } from "@supabase/supabase-js";

export async function getCompanyMember(
  supabase: SupabaseClient,
  memberId: string,
  organizationId: string
) {
  const {
    data: member,
    error,
  } = await supabase
    .from("organization_users")
    .select(`
      *,
      user_profiles (
        id,
        full_name,
        email
      )
    `)
    .eq("id", memberId)
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return member;
}