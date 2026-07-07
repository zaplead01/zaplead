"use client";

import {
  CheckCircle2,
  Lock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const currentFeatures = [
  "Dashboard",
  "Clientes",
  "Pipeline",
  "Follow-ups",
  "Histórico de atividades",
  "Exportação CSV",
];

const premiumFeatures = [
  "Clientes ilimitados",
  "Usuários ilimitados",
  "Pipelines ilimitados",
  "Relatórios Premium",
  "Tags",
  "API",
  "Integrações",
  "Automações",
];

export function FeatureList() {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold tracking-tight">
          Recursos
        </h2>

        <p className="mt-1 text-muted-foreground">
          Veja o que está disponível no seu plano e o que pode ser desbloqueado com o Premium.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Plano Atual */}

        <Card>

          <CardHeader>

            <CardTitle>
              Incluso no seu plano
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            {currentFeatures.map(feature => (

              <div
                key={feature}
                className="flex items-center gap-3"
              >

                <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                <span>{feature}</span>

              </div>

            ))}

          </CardContent>

        </Card>

        {/* Premium */}

        <Card className="border-primary/20 bg-primary/5">

          <CardHeader>

            <CardTitle>
              Premium
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            {premiumFeatures.map(feature => (

              <div
                key={feature}
                className="flex items-center gap-3"
              >

                <Lock className="h-5 w-5 text-amber-500" />

                <span>{feature}</span>

              </div>

            ))}

          </CardContent>

        </Card>

      </div>

    </section>
  );
}