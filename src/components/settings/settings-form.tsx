"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";

export function SettingsForm() {
  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>
            Personalize sua experiência no ZapLead.
          </CardDescription>
        </CardHeader>

        <CardContent>
          Em breve...
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Escolha como deseja receber avisos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          Em breve...
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">
            Zona de Perigo
          </CardTitle>

          <CardDescription>
            Ações irreversíveis relacionadas à sua conta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          Em breve...
        </CardContent>
      </Card>

    </div>
  );
}
