"use client";

import { CreditCard } from "lucide-react";

export function BillingHeader() {
  return (
    <div className="space-y-3">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-primary/10">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assinatura
          </h1>

          <p className="text-muted-foreground">
            Gerencie seu plano, acompanhe o consumo e faça upgrade quando precisar.
          </p>
        </div>

      </div>

    </div>
  );
}