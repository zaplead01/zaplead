import {
  BarChart3,
  KanbanSquare,
  Users,
  CheckSquare,
} from "lucide-react";

const features = [
  {
    icon: KanbanSquare,
    title: "Pipeline Kanban",
    description: "Acompanhe cada negociação em tempo real.",
  },
  {
    icon: Users,
    title: "Clientes",
    description: "Todas as informações dos seus clientes em um único lugar.",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description: "Visualize métricas importantes para tomar decisões.",
  },
  {
    icon: CheckSquare,
    title: "Tarefas",
    description: "Nunca mais esqueça um follow-up importante.",
  },
];

export function ProductPreview() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Veja o ZapLead em ação
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Um CRM moderno, simples e intuitivo
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Organize clientes, acompanhe negociações e aumente suas vendas com
            uma interface pensada para quem vende pelo WhatsApp.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border bg-card shadow-2xl">

          {/* Placeholder da imagem */}

          <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-muted via-background to-muted">

            <div className="text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <KanbanSquare className="h-10 w-10 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold">
                Screenshot do CRM
              </h3>

              <p className="mt-3 text-muted-foreground">
                Aqui será exibida uma captura real do Dashboard do ZapLead.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <feature.icon className="mb-4 h-8 w-8 text-primary" />

              <h3 className="font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}