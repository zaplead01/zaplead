import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Henrique",
    company: "Corretor de Imóveis",
    comment:
      "O ZapLead me ajudou a organizar todos os meus atendimentos pelo WhatsApp. Hoje consigo acompanhar cada negociação sem esquecer nenhum cliente.",
  },
  {
    name: "Juliana Martins",
    company: "Loja de Roupas",
    comment:
      "Antes eu fazia tudo pelo WhatsApp e planilhas. Agora tenho uma visão completa das vendas e economizo muito tempo.",
  },
  {
    name: "Rafael Souza",
    company: "Consultor Comercial",
    comment:
      "A interface é simples, rápida e muito intuitiva. Em poucos minutos já estava utilizando o sistema no dia a dia.",
  },
];

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="bg-muted/30 py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Depoimentos
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Quem usa recomenda
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Veja o que profissionais e empresas estão dizendo sobre o ZapLead.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-primary/20" />

              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-muted-foreground">
                "{testimonial.comment}"
              </p>

              <div className="mt-8 border-t pt-6">
                <h4 className="font-semibold">
                  {testimonial.name}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}