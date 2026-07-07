"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Crown,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/src/components/ui/card";

type Props = {
  plan: {
    name: string;
    description?: string | null;
  };

  status?: "active" | "inactive";

  onUpgrade?: () => void;
};

export function HeroCard({
  plan,
  status = "active",
  onUpgrade,
}: Props) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl">

      {/* Glow */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <CardContent className="relative p-8">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Esquerda */}

          <div className="space-y-6">

            <Badge
              variant="secondary"
              className="w-fit"
            >
              Plano Atual
            </Badge>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15">

                <Crown className="h-8 w-8 text-amber-500" />

              </div>

              <div>

                <h2 className="text-5xl font-bold tracking-tight">
                  {plan.name.toUpperCase()}
                </h2>

                <p className="mt-1 text-muted-foreground">
                  {plan.description ??
                    "CRM para quem vende pelo WhatsApp"}
                </p>

              </div>

            </div>

            <p className="max-w-2xl text-muted-foreground leading-7">

              Seu plano atual oferece todos os
              recursos essenciais para organizar
              seus clientes e vendas.

              Quando sua empresa crescer, você
              poderá desbloquear recursos
              avançados fazendo upgrade para o
              Premium.

            </p>

          </div>

          {/* Direita */}

          <div className="w-full max-w-sm rounded-2xl border bg-background/80 p-6 backdrop-blur">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <BadgeCheck className="h-5 w-5 text-emerald-500" />

                <span className="font-medium">
                  {status === "active"
                    ? "Ativo"
                    : "Inativo"}
                </span>

              </div>

              <Badge>
                {plan.name.toUpperCase()}
              </Badge>

            </div>

            <div className="mt-8">

              <p className="text-sm text-muted-foreground">
                Valor do plano
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-5xl font-bold">
                  R$0
                </span>

                <span className="pb-2 text-muted-foreground">
                  /mês
                </span>

              </div>

            </div>

            <Button
              className="mt-8 w-full"
              size="lg"
              onClick={onUpgrade}
            >
              Fazer Upgrade

              <ArrowUpRight className="ml-2 h-4 w-4" />

            </Button>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}