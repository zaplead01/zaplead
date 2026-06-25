import {
  Building2,
  Crown,
  Users,
  UserRound,
} from "lucide-react";

import { StatCard } from "@/src/components/stat-card";

import { DashboardData } from "@/src/types/dashboard";

interface Props {
  dashboard: DashboardData;
}

export function DashboardStats({ dashboard }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Clientes"
        value={String(dashboard.customers)}
        icon={Users}
        trend="Clientes cadastrados"
      />

      <StatCard
        label="Usuários"
        value={String(dashboard.users)}
        icon={UserRound}
        trend="Equipe"
      />

      <StatCard
        label="Empresa"
        value={dashboard.organizationName}
        icon={Building2}
        trend="Organização"
      />

      <StatCard
        label="Plano"
        value={dashboard.plan}
        icon={Crown}
        trend="Assinatura"
      />
    </div>
  );
}