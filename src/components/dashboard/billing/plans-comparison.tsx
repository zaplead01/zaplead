"use client";

import {
  Check,
  Crown,
} from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type Props = {
  currentPlan: string;

  onUpgrade?: () => void;
};

export function PlansComparison({
  currentPlan,
  onUpgrade,
}: Props) {
  return (
    <section className="space-y-8">

      <div>

        <h2 className="text-2xl font-bold tracking-tight">
          Compare os planos
        </h2>

        <p className="mt-2 text-muted-foreground">
          Escolha o plano ideal para acompanhar o crescimento da sua empresa.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* FREE */}

        <Card>

          <CardHeader>

            <CardTitle>
              FREE
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <div>

              <h3 className="text-4xl font-bold">
                R$ 0
              </h3>

              <p className="text-muted-foreground">
                Para começar
              </p>

            </div>

            <div className="space-y-3">

              {[
                "100 Clientes",
                "1 Usuário",
                "1 Pipeline",
                "Dashboard",
                "Follow-ups",
              ].map(item => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <Check className="h-4 w-4 text-emerald-500" />

                  {item}

                </div>

              ))}

            </div>

            <Button
              disabled
              className="w-full"
              variant="secondary"
            >
              {currentPlan === "FREE"
                ? "Plano Atual"
                : "Selecionado"}
            </Button>

          </CardContent>

        </Card>

        {/* PREMIUM */}

        <Card className="relative border-primary shadow-xl">

          <Badge className="absolute right-5 top-5">

            <Crown className="mr-1 h-4 w-4" />

            Recomendado

          </Badge>

          <CardHeader>

            <CardTitle>
              PREMIUM
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <div>

              <h3 className="text-4xl font-bold">
                R$ 39,90
              </h3>

              <p className="text-muted-foreground">
                por mês
              </p>

            </div>

            <div className="space-y-3">

              {[
                "Clientes ilimitados",
                "Usuários ilimitados",
                "Pipelines ilimitados",
                "Relatórios Premium",
                "Tags",
                "API",
                "Integrações",
              ].map(item => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <Check className="h-4 w-4 text-primary" />

                  {item}

                </div>

              ))}

            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={onUpgrade}
            >
              Fazer Upgrade
            </Button>

          </CardContent>

        </Card>

      </div>

    </section>
  );
}