"use client";

import { Clock3 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { useCustomerActivities } from "@/src/hooks/use-customer-activities";

type Props = {
  customerId: string;
};

export function CustomerTimeline({
  customerId,
}: Props) {
  const {
    activities,
    loading,
  } = useCustomerActivities(customerId);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>
          Histórico
        </CardTitle>
      </CardHeader>

      <CardContent>

        {loading && (
          <p className="text-sm text-muted-foreground">
            Carregando...
          </p>
        )}

        {!loading &&
          activities.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade registrada.
            </p>
          )}

        <div className="space-y-6">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-3"
            >
              <div className="mt-1">
                <Clock3
                  className="text-primary"
                  size={16}
                />
              </div>

              <div className="flex-1">

                <p className="font-medium">
                  {activity.title}
                </p>

                {activity.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                )}

                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(
                    activity.created_at
                  ).toLocaleString("pt-BR")}
                </p>

              </div>
            </div>
          ))}

        </div>

      </CardContent>
    </Card>
  );
}