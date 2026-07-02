"use client";

import { Crown } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import { useSubscription } from "@/src/hooks/use-subscription";

export function PlanCard() {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Carregando plano...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Plano
        </CardTitle>

        <CardDescription>
          Gerencie sua assinatura do ZapLead.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex items-center justify-between rounded-lg border p-4">

          <div>

            <p className="font-semibold text-lg capitalize">
              {subscription?.plan ?? "Business"}
            </p>

            <p className="text-sm text-muted-foreground">
              Status:{" "}
              {subscription?.status === "active"
                ? "Ativo"
                : "Inativo"}
            </p>

          </div>

          <Crown className="size-8 text-amber-500" />

        </div>

        <div className="space-y-2">

          <p className="text-sm font-medium">
            Seu plano inclui:
          </p>

          <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
            <li>Clientes ilimitados</li>
            <li>Pipelines ilimitados</li>
            <li>Gestão de tarefas</li>
            <li>Dashboard</li>
            <li>CRM para WhatsApp</li>
          </ul>

        </div>

        <Button
          variant="outline"
          className="w-full"
        >
          Ver planos
        </Button>

      </CardContent>

    </Card>
  );
}