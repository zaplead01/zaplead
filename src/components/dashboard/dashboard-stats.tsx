import {
  Building2,
  Crown,
  Users,
  UserRound,
} from "lucide-react";

import { MetricCard } from "@/src/components/reports/metric-card";

import { DashboardData } from "@/src/types/dashboard";

interface Props {
  dashboard: DashboardData;
}

export function DashboardStats({ dashboard }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Clientes"
        value={String(dashboard.customers)}
        description="Clientes cadastrados"
        icon={<Users className="h-5 w-5 text-muted-foreground" />}
      />

      <MetricCard
        title="Usuários"
        value={String(dashboard.users)}
        description="Equipe"
        icon={<UserRound className="h-5 w-5 text-muted-foreground" />}
      />

      <MetricCard
        title="Empresa"
        value={dashboard.organizationName}
        description="Organização"
        icon={<Building2 className="h-5 w-5 text-muted-foreground" />}
      />

      <MetricCard
        title="Plano"
        value={dashboard.plan}
        description="Assinatura"
        icon={<Crown className="h-5 w-5 text-muted-foreground" />}
      />
    </div>
  );
}