"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const questions = [
  {
    question: "O ZapLead possui plano gratuito?",
    answer:
      "Sim. Você pode começar gratuitamente e utilizar os principais recursos para organizar seus clientes e acompanhar suas negociações.",
  },
  {
    question: "Preciso cadastrar cartão de crédito?",
    answer:
      "Não. O plano gratuito pode ser utilizado sem informar cartão de crédito.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Você pode cancelar ou alterar seu plano a qualquer momento, sem fidelidade.",
  },
  {
    question: "O ZapLead funciona para qualquer tipo de negócio?",
    answer:
      "Sim. O ZapLead foi desenvolvido para pequenas empresas, autônomos, corretores, afiliados, consultores e qualquer profissional que venda pelo WhatsApp.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim. Utilizamos uma infraestrutura moderna e segura para proteger todas as informações da sua empresa e dos seus clientes.",
  },
  {
    question: "Existe suporte?",
    answer:
      "Sim. Nossa equipe está disponível para ajudar sempre que necessário. Os planos pagos possuem atendimento prioritário.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-24"
    >
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Perguntas Frequentes
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Ainda ficou alguma dúvida?
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Respondemos as perguntas mais comuns sobre o ZapLead.
          </p>

        </div>

        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border bg-card p-4 md:p-8">

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left text-lg">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="text-base leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>

      </div>
    </section>
  );
}