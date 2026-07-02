import { resend } from "@/src/lib/resend";

type Props = {
  email: string;
  companyName: string;
  role: "admin" | "member";
  token: string;
};

export async function sendCompanyInvite({
  email,
  companyName,
  role,
  token,
}: Props) {
  const inviteUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;

  const { error } =
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL!,
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
<strong>${
  role === "admin"
    ? "Administrador"
    : "Membro"
}</strong>
</p>

<p>
Clique no botão abaixo para aceitar.
</p>

<a
href="${inviteUrl}"
style="
display:inline-block;
padding:12px 20px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
">
Aceitar convite
</a>

<p style="margin-top:30px;color:#666;">
Este convite expira em 7 dias.
</p>

</div>
`,
    });

  if (error) {
    throw new Error(error.message);
  }
}