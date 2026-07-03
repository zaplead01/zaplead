import {
  ArrowRight,
  Columns3,
  TrendingUp,
  UserPlus,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Cadastre seus clientes",
    description:
      "Adicione contatos manualmente ou importe rapidamente seus clientes para começar a organizar suas vendas.",
  },
  {
    icon: Columns3,
    title: "Organize no Pipeline",
    description:
      "Arraste negociações entre etapas e acompanhe exatamente em que fase cada cliente está.",
  },
  {
    icon: TrendingUp,
    title: "Venda mais",
    description:
      "Receba lembretes, acompanhe indicadores e nunca mais esqueça de fazer um follow-up.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="bg-muted/30 py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Como funciona
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Comece a vender em apenas 3 passos
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            O ZapLead foi criado para ser simples. Em poucos minutos você já
            estará organizando seus clientes e aumentando suas vendas.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-full top-14 hidden -translate-x-1/2 lg:block">
                  <ArrowRight className="h-8 w-8 text-muted-foreground/40" />
                </div>
              )}

              <div className="rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>

                <div className="mb-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Passo {index + 1}
                </div>

                <h3 className="text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}