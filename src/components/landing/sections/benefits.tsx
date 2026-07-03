import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: Smartphone,
    title: "Feito para quem vende pelo WhatsApp",
    description:
      "Centralize todos os seus contatos e negociações em um único lugar.",
  },
  {
    icon: Clock3,
    title: "Economize tempo",
    description:
      "Automatize sua organização e nunca mais esqueça um follow-up importante.",
  },
  {
    icon: Users,
    title: "Equipe organizada",
    description:
      "Distribua clientes entre vendedores e acompanhe o desempenho de cada um.",
  },
  {
    icon: ShieldCheck,
    title: "Seus dados protegidos",
    description:
      "Segurança e confiabilidade para armazenar todas as informações do seu negócio.",
  },
  {
    icon: Zap,
    title: "Interface rápida",
    description:
      "Um CRM leve, moderno e intuitivo para você vender mais sem complicação.",
  },
  {
    icon: CheckCircle2,
    title: "Tudo em um só lugar",
    description:
      "Clientes, pipeline, tarefas e relatórios integrados em uma única plataforma.",
  },
];

export function Benefits() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Por que escolher o ZapLead?
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Um CRM pensado para simplificar suas vendas
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Enquanto outros CRMs são complexos, o ZapLead foi criado para
            pequenas empresas e profissionais que precisam vender mais pelo
            WhatsApp sem perder tempo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <benefit.icon className="mb-5 h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">
                {benefit.title}
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}