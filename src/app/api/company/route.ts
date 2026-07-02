import { NextResponse } from "next/server";

import { requireCompanyRole } from "@/src/lib/auth/require-company-role";

export async function GET() {
  const auth = await requireCompanyRole([
    "owner",
    "admin",
    "member",
  ]);

  if ("error" in auth) {
    return auth.error;
  }

  const { data, error } = await auth.supabase
    .from("organizations")
    .select("*")
    .eq("id", auth.organizationId)
    .single();

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

  return NextResponse.json(data);
}