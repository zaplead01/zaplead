import {
  BarChart3,
  CheckSquare,
  KanbanSquare,
  MessageCircle,
  Users,
  UserRoundCog,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Vendas pelo WhatsApp",
    description:
      "Centralize todos os clientes que chegam pelo WhatsApp e nunca mais perca uma oportunidade.",
  },
  {
    icon: KanbanSquare,
    title: "Pipeline Inteligente",
    description:
      "Organize seus negócios em etapas e acompanhe facilmente cada negociação.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description:
      "Cadastre clientes, empresas, contatos e mantenha todo o histórico em um único lugar.",
  },
  {
    icon: CheckSquare,
    title: "Tarefas e Follow-up",
    description:
      "Crie lembretes e acompanhe cada contato para aumentar sua taxa de conversão.",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description:
      "Visualize indicadores importantes para tomar decisões e acompanhar o crescimento do negócio.",
  },
  {
    icon: UserRoundCog,
    title: "Equipe",
    description:
      "Convide colaboradores e distribua clientes entre sua equipe com facilidade.",
  },
];

export function Features() {
  return (
    <section
      id="recursos"
      className="py-24"
    >
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Recursos
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Tudo o que você precisa para vender mais
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            O ZapLead reúne todas as ferramentas essenciais para organizar
            clientes, acompanhar negociações e aumentar suas vendas pelo
            WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}