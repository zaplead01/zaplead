"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Posso cancelar minha assinatura quando quiser?",
    answer:
      "Sim. Não existe fidelidade. Você pode cancelar a qualquer momento e continuar utilizando seu plano até o final do período contratado.",
  },
  {
    question: "Preciso cadastrar cartão de crédito para começar?",
    answer:
      "Não. O plano Free pode ser utilizado sem cartão de crédito.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim. Você pode fazer upgrade para o Pro ou Enterprise sempre que precisar.",
  },
  {
    question: "O que acontece se eu atingir o limite do plano Free?",
    answer:
      "Você poderá fazer upgrade para o plano Pro e continuar utilizando todos os seus dados normalmente.",
  },
  {
    question: "Como funciona o plano Enterprise?",
    answer:
      "O plano Enterprise é personalizado para empresas que precisam de mais usuários, integrações, API e atendimento dedicado.",
  },
];

export function PlansFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-widest text-primary">
            FAQ
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Perguntas Frequentes
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Tire suas dúvidas antes de escolher um plano.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const active = open === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border bg-card"
              >
                <button
                  onClick={() =>
                    setOpen(active ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      active ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {active && (
                  <div className="px-6 pb-6 text-muted-foreground leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}