import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top, rgba(34,197,94,.12), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Conteúdo */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />

              <span className="text-muted-foreground">
                CRM simples para quem vende pelo WhatsApp
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Organize seus clientes e{" "}
              <span className="text-primary">
                venda mais pelo WhatsApp.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Centralize clientes, acompanhe negociações, organize tarefas e
              tenha total controle do seu funil de vendas em uma plataforma
              simples, rápida e intuitiva.
            </p>

            {/* Botões */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Começar gratuitamente

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/planos"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  Ver planos
                </Button>
              </Link>
            </div>

            {/* Benefícios */}
            <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Sem cartão de crédito
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                Setup em 2 minutos
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Dados protegidos
              </div>
            </div>

            {/* Estatísticas */}
           
          </div>

          {/* Dashboard */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-primary/15 blur-3xl" />

            <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl">
              <Image
                src="/images/dashboard-hero.jpg"
                alt="Dashboard do ZapLead"
                width={1280}
                height={960}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}