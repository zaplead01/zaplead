"use client";

import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

type Props = {
  onUpgrade?: () => void;
};

export function UpgradeBanner({
  onUpgrade,
}: Props) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl">

      {/* Glow */}

      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="space-y-4">

          <div className="flex items-center gap-2">

            <Sparkles className="h-5 w-5" />

            <span className="font-semibold uppercase tracking-wider">
              Premium
            </span>

          </div>

          <h2 className="max-w-2xl text-4xl font-bold leading-tight">
            Leve o ZapLead para o próximo nível.
          </h2>

          <p className="max-w-2xl text-primary-foreground/80">
            Desbloqueie clientes ilimitados,
            relatórios avançados, API,
            integrações e muito mais para
            acelerar o crescimento da sua
            empresa.
          </p>

        </div>

        <Button
          size="lg"
          variant="secondary"
          onClick={onUpgrade}
          className="h-12 px-8 text-base"
        >
          Fazer Upgrade

          <ArrowUpRight className="ml-2 h-5 w-5" />
        </Button>

      </div>

    </Card>
  );
}