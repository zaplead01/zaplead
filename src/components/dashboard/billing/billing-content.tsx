"use client";

import { useBilling } from "@/src/hooks/use-billing";

import { BillingHeader } from "./billing-header";
import { HeroCard } from "./hero-card";
import { UsageSection } from "./usage-section";
import { FeatureList } from "./feature-list";
import { PlansComparison } from "./plans-comparison";
import { UpgradeBanner } from "./upgrade-banner";

export function BillingContent() {
  const { billing, loading } = useBilling();

  if (loading) {
    console.log("BILLING", billing);
    return (
      <div className="flex items-center justify-center py-20">
        Carregando...
      </div>
    );
  }

  if (!billing) {
    return (
      <div className="flex items-center justify-center py-20">
        Não foi possível carregar sua assinatura.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <BillingHeader />

      <HeroCard
        plan={billing.plan}
        status="active"
      />

      <UsageSection
        usage={billing.usage}
      />

      <FeatureList />

      <PlansComparison
        currentPlan={billing.plan.name.toUpperCase()}
      />

      <UpgradeBanner />

    </div>
  );
}