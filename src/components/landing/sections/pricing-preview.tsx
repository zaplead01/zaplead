import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  Building2,
  Zap,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "R$ 0",
    period: "/mês",
    description: "Ideal para conhecer o ZapLead.",
    features: [
      "Até 100 clientes",
      "1 usuário",
      "Pipeline",
      "Dashboard",
      "Tarefas",
    ],
    button: "Começar grátis",
    href: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "R$ 39,90",
    period: "/mês",
    description: "Tudo que você precisa para vender mais.",
    features: [
      "Clientes ilimitados",
      "Funil ilimitados",
      "Relatórios Premium",
      "Etiquetas",
      "Suporte prioritário",
    ],
    button: "Assinar Pro",
    href: "/planos",
    highlight: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Sob consulta",
    period: "",
    description: "Projetos personalizados para empresas.",
    features: [
      "Tudo do Pro",
      "API",
      "Integrações",
      "Treinamento",
      "Gerente de conta",
    ],
    button: "Falar com especialista",
    href: "/contato",
    highlight: false,
  },
];

export function PricingPreview() {
  return (
    <section
      id="planos"
      className="py-24"
    >
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-widest text-primary">
            Planos
          </span>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Escolha o plano ideal para crescer
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Comece gratuitamente e evolua conforme sua empresa cresce.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.highlight
                    ? "border-primary shadow-2xl ring-2 ring-primary/20"
                    : "bg-card hover:shadow-xl"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
                    ⭐ Mais escolhido
                  </div>
                )}

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-2xl font-bold">
                  {plan.name}
                </h3>

                <div className="mt-5 flex items-end gap-1">

                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>

                  {plan.period && (
                    <span className="pb-1 text-muted-foreground">
                      {plan.period}
                    </span>
                  )}

                </div>

                <p className="mt-5 leading-7 text-muted-foreground">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-4">

                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <Check className="h-5 w-5 text-primary" />

                      <span>{feature}</span>
                    </li>
                  ))}

                </ul>

                <div className="mt-10">

                  <Link href={plan.href}>
                    <Button
                      className="w-full"
                      size="lg"
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      {plan.button}
                    </Button>
                  </Link>

                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Sem fidelidade • Cancelamento quando quiser
                </p>

              </div>
            );
          })}

        </div>

        <div className="mt-20 rounded-3xl border bg-card p-8 text-center shadow-sm lg:p-12">
  <h3 className="text-3xl font-bold tracking-tight">
    Não sabe qual plano escolher?
  </h3>

  <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
    Compare todos os recursos lado a lado e descubra qual plano faz mais
    sentido para o momento da sua empresa.
  </p>

  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
    <Link href="/planos" className="w-full sm:w-auto">
      <Button size="lg" className="w-full min-w-[260px]">
        Comparar todos os planos

        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>

    <Link href="/contato" className="w-full sm:w-auto">
      <Button
        variant="outline"
        size="lg"
        className="w-full min-w-[220px]"
      >
        Falar com um especialista
      </Button>
    </Link>
  </div>
</div>

      </div>
    </section>
  );
}