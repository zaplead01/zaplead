import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/src/lib/supabase/middleware";
import { createClient } from "@/src/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { user } = await updateSession(request);

    if (!user) {
      return NextResponse.json(
        {
          error: "Usuário não autenticado.",
        },
        {
          status: 401,
        }
      );
    }

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          error: "Token inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = await createClient();

    // Busca o convite
    const { data: invite, error } = await supabase
      .from("organization_invites")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (error || !invite) {
      return NextResponse.json(
        {
          error: "Convite não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    // O convite pertence ao e-mail do usuário logado?
if (
  invite.email.toLowerCase() !==
  user.email?.toLowerCase()
) {
  return NextResponse.json(
    {
      error:
        "Este convite pertence a outro e-mail. Faça login com a conta correta.",
    },
    {
      status: 403,
    }
  );
}

    // Convite já utilizado ou cancelado
    if (invite.status !== "pending") {
      return NextResponse.json(
        {
          error: "Este convite não está mais disponível.",
        },
        {
          status: 400,
        }
      );
    }

    // Expirado
    if (
      invite.expires_at &&
      new Date(invite.expires_at) < new Date()
    ) {
      await supabase
        .from("organization_invites")
        .update({
          status: "expired",
        })
        .eq("id", invite.id);

      return NextResponse.json(
        {
          error: "Este convite expirou.",
        },
        {
          status: 400,
        }
      );
    }

    // Já pertence a uma empresa?
    const { data: membership } = await supabase
      .from("organization_users")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membership) {
      return NextResponse.json(
        {
          error: "Você já pertence a uma empresa.",
        },
        {
          status: 400,
        }
      );
    }

    // Adiciona na empresa
    const { error: memberError } = await supabase
      .from("organization_users")
      .insert({
        organization_id: invite.organization_id,
        user_id: user.id,
        role: invite.role,
      });

    if (memberError) {
      return NextResponse.json(
        {
          error: memberError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Marca convite como aceito
    const { error: inviteError } = await supabase
      .from("organization_invites")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("id", invite.id);

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

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro interno do servidor.",
      },
      {
        status: 500,
      }
    );
  }
}