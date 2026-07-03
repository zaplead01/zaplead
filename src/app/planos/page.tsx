import Link from "next/link";
import { Check, Crown, Building2, Zap } from "lucide-react";

import { Header } from "@/src/components/landing/layout/header";
import { Footer } from "@/src/components/landing/layout/footer";
import { Button } from "@/src/components/ui/button";
import { ComparisonTable } from "@/src/components/plans/comparison-table";
import { PlansFAQ } from "@/src/components/plans/plans-faq";
import { PlansCTA } from "@/src/components/plans/plans-cta";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "R$ 0",
    period: "/sempre",
    description: "Ideal para começar a organizar seus clientes.",
    features: [
      "1 usuário",
      "Até 100 clientes",
      "1 Pipeline",
      "Dashboard",
      "Tarefas",
      "Suporte por e-mail",
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
    description: "Para quem vende todos os dias e quer crescer.",
    features: [
      "Até 2 usuários",
      "Clientes ilimitados",
      "Pipelines ilimitados",
      "Dashboard Premium",
      "Relatórios Premium",
      "Etiquetas",
      "Suporte prioritário",
    ],
    button: "Assinar Pro",
    href: "/register",
    highlight: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Sob consulta",
    period: "",
    description: "Para empresas que precisam de uma solução personalizada.",
    features: [
      "Usuários ilimitados",
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

export default function PlanosPage() {
  return (
    <>
      <Header />

      <main className="bg-background">
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-semibold uppercase tracking-widest text-primary">
              Planos
            </span>

            <h1 className="mt-4 text-4xl font-bold lg:text-5xl">
              Escolha o plano ideal para sua empresa
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Comece gratuitamente e evolua conforme o crescimento do seu negócio.
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
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
                      ⭐ Mais Popular
                    </div>
                  )}

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="text-2xl font-bold">{plan.name}</h2>

                  <p className="mt-3 text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>

                    {plan.period && (
                      <span className="pb-1 text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

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
                    Sem fidelidade • Cancele quando quiser
                  </p>
                </div>
                
              );
            })}
          </div>
        </section>
      </main>
      <ComparisonTable />
      <PlansFAQ />
      <PlansCTA />

      <Footer />
    </>
  );
}