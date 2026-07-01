"use client";

import { Crown } from "lucide-react";

import { Label } from "@/src/components/ui/label";
import { ToggleSwitch } from "@/src/components/ui/toggle-switch";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import { useSettings } from "@/src/hooks/use-settings";
import { useSubscription } from "@/src/hooks/use-subscription";

export function SettingsForm() {
  const {
    settings,
    loading,
    saving,
    update,
  } = useSettings();

  const {
    subscription,
    loading: loadingSubscription,
  } = useSubscription();

  return (
    <div className="space-y-6">

      {/* Conta */}

      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>

          <CardDescription>
            Informações da assinatura da sua empresa.
          </CardDescription>
        </CardHeader>

        <CardContent>

          {loadingSubscription ? (
            <p className="text-sm text-muted-foreground">
              Carregando assinatura...
            </p>
          ) : (
            <div className="space-y-4">

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm text-muted-foreground">
                  Plano
                </span>

                <span className="font-medium uppercase">
                  {subscription?.plan ?? "FREE"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm text-muted-foreground">
                  Status
                </span>

                <span className="font-medium">
                  {subscription?.status === "active"
                    ? "Ativo"
                    : "Inativo"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Próxima cobrança
                </span>

                <span className="font-medium">
                  —
                </span>
              </div>

              <Button
                className="mt-4 w-full"
                variant="outline"
              >
                <Crown className="mr-2 h-4 w-4" />
                Fazer Upgrade para PRO
              </Button>

            </div>
          )}

        </CardContent>
      </Card>

      {/* Preferências */}

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>

          <CardDescription>
            Personalize sua experiência no ZapLead.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mais opções estarão disponíveis nas próximas versões.
          </p>
        </CardContent>
      </Card>

      {/* Notificações */}

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>

          <CardDescription>
            Escolha como deseja receber avisos.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando configurações...
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg border p-4">

                <div className="space-y-1">
                  <Label htmlFor="email-notifications">
                    Receber notificações por e-mail
                  </Label>

                  <p className="text-sm text-muted-foreground">
                    Enviaremos novidades e avisos importantes para o seu e-mail.
                  </p>
                </div>

                <ToggleSwitch
                  checked={settings?.email_notifications ?? true}
                  disabled={saving}
                  onChange={(checked) =>
                    update({
                      email_notifications: checked,
                    })
                  }
                />

              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">

                <div className="space-y-1">
                  <Label htmlFor="task-reminders">
                    Receber lembretes de tarefas
                  </Label>

                  <p className="text-sm text-muted-foreground">
                    Receba lembretes das tarefas próximas do vencimento.
                  </p>
                </div>

                <ToggleSwitch
                  checked={settings?.task_reminders ?? true}
                  disabled={saving}
                  onChange={(checked) =>
                    update({
                      task_reminders: checked,
                    })
                  }
                />

              </div>
            </>
          )}

        </CardContent>
      </Card>

      {/* Zona de perigo */}

      <Card>

        <CardHeader>

          <CardTitle className="text-red-600">
            Zona de Perigo
          </CardTitle>

          <CardDescription>
            Funcionalidades sensíveis da conta.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <Button
            variant="destructive"
            disabled
          >
            Excluir Conta (Em breve)
          </Button>

          <p className="mt-2 text-sm text-muted-foreground">
            A exclusão permanente da conta estará disponível em uma próxima atualização.
          </p>

        </CardContent>

      </Card>

    </div>
  );
}