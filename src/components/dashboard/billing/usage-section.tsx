"use client";

import {
  Users,
  UserRound,
  Workflow,
} from "lucide-react";

import { UsageCard } from "./usage-card";

type Props = {
  usage: {
    customers: {
      current: number;
      limit: number;
    };

    users: {
      current: number;
      limit: number;
    };

    pipelines: {
      current: number;
      limit: number;
    };
  };
};

export function UsageSection({
  usage,
}: Props) {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold tracking-tight">
          Uso do Plano
        </h2>

        <p className="mt-1 text-muted-foreground">
          Acompanhe os limites do seu plano em
          tempo real.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <UsageCard
          title="Clientes"
          subtitle="Clientes cadastrados"
          icon={Users}
          current={usage.customers.current}
          limit={usage.customers.limit}
        />

        <UsageCard
          title="Usuários"
          subtitle="Membros da organização"
          icon={UserRound}
          current={usage.users.current}
          limit={usage.users.limit}
        />

        <UsageCard
          title="Pipelines"
          subtitle="Funis disponíveis"
          icon={Workflow}
          current={usage.pipelines.current}
          limit={usage.pipelines.limit}
        />

      </div>

    </section>
  );
}