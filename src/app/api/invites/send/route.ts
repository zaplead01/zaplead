import { NextResponse } from "next/server";
import { resend } from "@/src/lib/resend";

export async function POST(request: Request) {
  try {
    const {
      email,
      companyName,
      role,
      token,
    } = await request.json();

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;

    const { error } = await resend.emails.send({
      from: "ZapLead <onboarding@resend.dev>",
      to: email,
      subject: `Convite para entrar na empresa ${companyName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;">
          <h2>Você foi convidado para o ZapLead 🚀</h2>

          <p>
            Você recebeu um convite para participar da empresa
            <strong>${companyName}</strong>.
          </p>

          <p>
            Cargo:
            <strong>${role === "admin" ? "Administrador" : "Membro"}</strong>
          </p>

          <p>
            Clique no botão abaixo para aceitar o convite.
          </p>

          <a
            href="${inviteUrl}"
            style="
              display:inline-block;
              margin-top:16px;
              padding:12px 20px;
              background:#2563eb;
              color:#fff;
              text-decoration:none;
              border-radius:8px;
              font-weight:bold;
            "
          >
            Aceitar convite
          </a>

          <p style="margin-top:32px;color:#666;font-size:14px;">
            Este convite expira em 7 dias.
          </p>
        </div>
      `,
    });

    if (error) {
  console.error("RESEND ERROR:", error);

  return NextResponse.json(
    {
      error: error.message,
      details: error,
    },
    {
      status: 400,
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
        error: "Erro ao enviar e-mail.",
      },
      {
        status: 500,
      }
    );
  }
}