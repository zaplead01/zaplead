import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-primary/10" />

      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-card p-8 shadow-2xl lg:p-16">
          {/* Glow */}
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Mais de <strong>10 empresas</strong> já utilizam o ZapLead
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Comece hoje e transforme seu WhatsApp em uma
              <span className="text-primary"> máquina de vendas.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Organize seus clientes, acompanhe negociações, nunca mais esqueça
              um follow-up e tenha controle total do seu funil de vendas.
            </p>

            {/* Botões */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full min-w-[240px]"
                >
                  Criar Conta Gratuitamente

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/planos"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full min-w-[180px]"
                >
                  Ver Planos
                </Button>
              </Link>
            </div>

            {/* Benefícios */}
            <div className="mt-10 grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Sem cartão de crédito
              </div>

              <div className="flex items-center justify-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                Setup em menos de 2 minutos
              </div>

              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Suporte online
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}