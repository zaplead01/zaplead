"use client";

import { useBilling } from "@/src/hooks/use-billing";

import { CurrentPlanCard } from "./current-plan-card";

export function BillingContent() {
  const { billing, loading } = useBilling();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!billing) {
    return (
      <div>
        Não foi possível carregar a assinatura.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Assinatura
        </h1>

        <p className="text-muted-foreground">
          Gerencie seu plano e acompanhe o uso da sua conta.
        </p>
      </div>

      <CurrentPlanCard
        plan={billing.plan}
      />

    </div>
  );
}