import Link from "next/link"
import { MessageCircle, CheckCircle2 } from "lucide-react"

const beneficios = [
  "Centralize os leads do WhatsApp em um só lugar",
  "Acompanhe cada negociação no funil de vendas",
  "Nunca esqueça um follow-up com tarefas e lembretes",
]

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Painel de marca */}
      <div className="relative hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
            <MessageCircle className="size-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight">ZapLead</span>
        </Link>

        <div className="max-w-md">
          <h1 className="text-3xl font-semibold leading-tight text-balance">
            O CRM feito para quem vende pelo WhatsApp
          </h1>
          <p className="mt-4 text-primary-foreground/80 leading-relaxed">
            Organize clientes, acompanhe negociações e feche mais vendas — sem
            planilhas e sem perder nenhum lead.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span className="text-primary-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-primary-foreground/70">
          Organize seus clientes desde o primeiro dia.
        </p>
      </div>

      {/* Formulário */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
