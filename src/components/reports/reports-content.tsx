"use client";

import { useReports } from "@/src/hooks/use-reports";

import {
  ReportHeader,
  ReportFilters,
  MetricCard,
  LeadsChart,
  PipelineChart,
  SourceChart,
  InactiveCustomers,
} from "@/src/components/reports";

import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

export function ReportsContent() {
  const { reports, loading } = useReports();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        Carregando relatórios...
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="flex items-center justify-center py-20">
        Não foi possível carregar os relatórios.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportHeader />

      <ReportFilters />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Leads"
          value={String(reports.metrics.totalLeads)}
          description="Leads ativos"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Conversão"
          value={`${reports.metrics.conversionRate}%`}
          description="Taxa de conversão"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Negócios Ganhos"
          value={String(reports.metrics.wonDeals)}
          description="Clientes convertidos"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Valor do Funil"
          value={reports.metrics.pipelineValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          description="Valor estimado"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <LeadsChart data={reports.leadsChart} />
        <PipelineChart data={reports.pipelineChart} />
      </section>

      <section>
        <SourceChart data={reports.sourceChart} />
      </section>

      <InactiveCustomers
  data={reports.inactiveCustomers}
/>
    </div>
  );
}