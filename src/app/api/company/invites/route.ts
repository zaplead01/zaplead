import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { requireCompanyRole } from "@/src/lib/auth/require-company-role";
import { sendCompanyInvite } from "@/src/lib/email/send-company-invite";

export async function POST(request: Request) {
  const auth = await requireCompanyRole([
    "owner",
    "admin",
  ]);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { email, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json(
        {
          error: "Dados inválidos.",
        },
        {
          status: 400,
        }
      );
    }

    if (role !== "admin" && role !== "member") {
      return NextResponse.json(
        {
          error: "Cargo inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // Verifica se já existe convite pendente
    const { data: existingInvite } = await auth.supabase
      .from("organization_invites")
      .select("id")
      .eq("organization_id", auth.organizationId)
      .eq("email", email)
      .eq("status", "pending")
      .maybeSingle();

    if (existingInvite) {
      return NextResponse.json(
        {
          error:
            "Já existe um convite pendente para este e-mail.",
        },
        {
          status: 400,
        }
      );
    }

    const token = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Cria o convite
    const { error: inviteError } = await auth.supabase
      .from("organization_invites")
      .insert({
        organization_id: auth.organizationId,
        email,
        role,
        invited_by: auth.user.id,
        token,
        status: "pending",
        expires_at: expiresAt.toISOString(),
      });

    if (inviteError) {
      return NextResponse.json(
        {
          error: inviteError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Busca a empresa
    const { data: company, error: companyError } =
      await auth.supabase
        .from("organizations")
        .select("name")
        .eq("id", auth.organizationId)
        .single();

    if (companyError || !company) {
      return NextResponse.json(
        {
          error: "Empresa não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    // Envia o e-mail
    await sendCompanyInvite({
      email,
      companyName: company.name,
      role,
      token,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error.message ??
          "Erro ao criar convite.",
      },
      {
        status: 500,
      }
    );
  }
}