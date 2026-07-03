import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

export function PlansCTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border bg-card p-10 shadow-xl lg:p-16">

          {/* Glow */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Pronto para começar?
            </div>

            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Organize seus clientes e venda mais pelo WhatsApp.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Junte-se às empresas que estão utilizando o ZapLead para organizar
              seus atendimentos, acompanhar negociações e aumentar suas vendas.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link href="/register">
                <Button
                  size="lg"
                  className="min-w-[250px]"
                >
                  Criar conta gratuitamente

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[250px]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />

                  Falar com especialista
                </Button>
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">

              <span>✅ Sem cartão de crédito</span>

              <span>🚀 Configuração em menos de 2 minutos</span>

              <span>💬 Suporte online</span>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}