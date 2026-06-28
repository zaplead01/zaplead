"use client";

import { useDashboard } from "@/src/hooks/use-dashboard";
import { FollowUpsCard } from "./follow-ups-card";
import { DashboardHeader } from "./dashboard-header";
import { DashboardStats } from "./dashboard-stats";

export function DashboardContent() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        Carregando dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        Não foi possível carregar o dashboard.
      </div>
    );
  }

return (
  <div className="flex flex-col gap-6">
    <DashboardHeader dashboard={dashboard} />

    <DashboardStats dashboard={dashboard} />

    <FollowUpsCard />
  </div>

);
}