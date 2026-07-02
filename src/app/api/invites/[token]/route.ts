import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/src/lib/supabase/server";
import { updateSession } from "@/src/lib/supabase/middleware";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { token } = await params;

    const { user } =
      await updateSession(request);

    const supabase =
      await createClient();

    const { data: invite, error } =
      await supabase
        .from("organization_invites")
        .select("*")
        .eq("token", token)
        .maybeSingle();

    if (error || !invite) {
      return NextResponse.json(
        {
          valid: false,
          message: "Convite não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const { data: organization } =
      await supabase
        .from("organizations")
        .select("name")
        .eq("id", invite.organization_id)
        .maybeSingle();

    const expired =
      invite.expires_at &&
      new Date(invite.expires_at) <
        new Date();

    let alreadyMember = false;

    if (user) {
      const { data: membership } =
        await supabase
          .from("organization_users")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

      alreadyMember = !!membership;
    }

    const emailMatches =
      !!user &&
      invite.email.toLowerCase() ===
        user.email?.toLowerCase();

    return NextResponse.json({
      valid: true,

      companyName:
        organization?.name,

      email: invite.email,

      role: invite.role,

      status: invite.status,

      expired,

      emailMatches,

      alreadyMember,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro interno.",
      },
      {
        status: 500,
      }
    );
  }
}