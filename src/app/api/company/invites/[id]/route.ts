import { NextResponse } from "next/server";

import { requireCompanyRole } from "@/src/lib/auth/require-company-role";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const auth =
    await requireCompanyRole([
      "owner",
      "admin",
    ]);

  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await params;

  const { error } =
    await auth.supabase
      .from("organization_invites")
      .update({
        status: "cancelled",
      })
      .eq("id", id)
      .eq(
        "organization_id",
        auth.organizationId
      );

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