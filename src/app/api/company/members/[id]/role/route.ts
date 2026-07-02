import { NextResponse } from "next/server";

import { requireCompanyRole } from "@/src/lib/auth/require-company-role";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Params
) {
  const auth = await requireCompanyRole([
    "owner",
  ]);

  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await params;

  const { role } = await request.json();

  if (
    role !== "admin" &&
    role !== "member"
  ) {
    return NextResponse.json(
      {
        error: "Cargo inválido.",
      },
      {
        status: 400,
      }
    );
  }

  // Busca o membro

  const {
    data: member,
    error: memberError,
  } = await auth.supabase
    .from("organization_users")
    .select("*")
    .eq("id", id)
    .eq(
      "organization_id",
      auth.organizationId
    )
    .maybeSingle();

  if (memberError || !member) {
    return NextResponse.json(
      {
        error: "Membro não encontrado.",
      },
      {
        status: 404,
      }
    );
  }

  if (member.role === "owner") {
    return NextResponse.json(
      {
        error:
          "Não é possível alterar o proprietário.",
      },
      {
        status: 403,
      }
    );
  }

  const { error } = await auth.supabase
    .from("organization_users")
    .update({
      role,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}