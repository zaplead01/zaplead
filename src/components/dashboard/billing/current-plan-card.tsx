"use client";

import { Crown } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type Props = {
  plan: {
    name: string;
    description?: string | null;
  };

  onUpgrade?: () => void;
};

export function CurrentPlanCard({
  plan,
  onUpgrade,
}: Props) {
  return (
    <Card className="border-2 border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-amber-500" />
            {plan.name.toUpperCase()}
          </CardTitle>

          <CardDescription className="mt-2">
            {plan.description ??
              "Plano atual da sua organização."}
          </CardDescription>
        </div>

        <Button onClick={onUpgrade}>
          Fazer Upgrade
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="font-medium">
            Plano Atual
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Você está utilizando o plano{" "}
            <strong>{plan.name}</strong>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}