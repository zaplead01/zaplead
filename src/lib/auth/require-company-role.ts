import { NextResponse } from "next/server";

import { createClient } from "@/src/lib/supabase/server";
import { CompanyRole } from "@/src/types/company-role";

export async function requireCompanyRole(
  allowedRoles: CompanyRole[]
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: NextResponse.json(
        {
          error: "Não autenticado.",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const {
    data: membership,
    error: membershipError,
  } = await supabase
    .from("organization_users")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (membershipError || !membership) {
    return {
      error: NextResponse.json(
        {
          error: "Empresa não encontrada.",
        },
        {
          status: 404,
        }
      ),
    };
  }

  if (
    !allowedRoles.includes(
      membership.role as CompanyRole
    )
  ) {
    return {
      error: NextResponse.json(
        {
          error: "Sem permissão.",
        },
        {
          status: 403,
        }
      ),
    };
  }

  return {
    supabase,

    user,

    organizationId:
      membership.organization_id,

    role:
      membership.role as CompanyRole,
  };
}