"use client";

import { useState } from "react";
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
  Lightbulb,
  CircleCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";

import type { ReportsFilters } from "@/src/components/reports/report-filters";

export function ReportsContent() {
  const [filters, setFilters] = useState<ReportsFilters>({
    period: "30days",
    pipeline: "all",
  });

  const {
    reports,
    loading,
  } = useReports(filters);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        Carregando relatórios...
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="flex items-center justify-center py-24">
        Não foi possível carregar os relatórios.
      </div>
    );
  }

  const totalInactive = reports.inactiveCustomers.length;

  const principalOrigem =
    reports.sourceChart.length > 0
      ? reports.sourceChart.reduce((prev, current) =>
          prev.value > current.value ? prev : current
        )
      : null;

  const principalEtapa =
    reports.pipelineChart.length > 0
      ? reports.pipelineChart.reduce((prev, current) =>
          prev.total > current.total ? prev : current
        )
      : null;

  return (
    <div className="space-y-8 pb-10">
      <ReportHeader />

      <ReportFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Leads"
          value={String(reports.metrics.totalLeads)}
          description="Leads ativos"
          trend="Visão geral do funil"
          positive
          icon={<Users className="h-6 w-6" />}
        />

        <MetricCard
          title="Conversão"
          value={`${reports.metrics.conversionRate}%`}
          description="Taxa de conversão"
          trend={
            reports.metrics.conversionRate > 0
              ? "Clientes convertidos"
              : "Nenhuma conversão"
          }
          positive={reports.metrics.conversionRate > 0}
          icon={<Target className="h-6 w-6" />}
        />

        <MetricCard
          title="Negócios Ganhos"
          value={String(reports.metrics.wonDeals)}
          description="Clientes convertidos"
          trend="Total fechado"
          positive
          icon={<DollarSign className="h-6 w-6" />}
        />

        <MetricCard
          title="Valor do Funil"
          value={reports.metrics.pipelineValue.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
          description="Valor estimado"
          trend="Potencial de receita"
          positive
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <LeadsChart data={reports.leadsChart} />
        <PipelineChart data={reports.pipelineChart} />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SourceChart
            data={reports.sourceChart}
          />
        </div>

        <Card className="rounded-2xl border shadow-sm transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Insights
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {principalOrigem && (
              <div className="flex gap-3 rounded-xl border p-4">
                <Activity className="mt-1 h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">
                    Principal origem
                  </p>

                  <p className="text-sm text-muted-foreground">
                    <strong>{principalOrigem.name}</strong> é responsável por{" "}
                    <strong>{principalOrigem.value}</strong> leads.
                  </p>
                </div>
              </div>
            )}

            {principalEtapa && (
              <div className="flex gap-3 rounded-xl border p-4">
                <CircleCheck className="mt-1 h-5 w-5 text-green-600" />

                <div>
                  <p className="font-medium">
                    Maior etapa do funil
                  </p>

                  <p className="text-sm text-muted-foreground">
                    A etapa{" "}
                    <strong>{principalEtapa.stage}</strong> possui{" "}
                    <strong>{principalEtapa.total}</strong> clientes.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 rounded-xl border p-4">
              <AlertTriangle className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  Follow-up
                </p>

                <p className="text-sm text-muted-foreground">
                  Existem{" "}
                  <strong>{totalInactive}</strong> cliente(s)
                  aguardando contato.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 p-4">
              <p className="text-sm font-semibold">
                💡 Recomendação
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Priorize o contato com clientes
                inativos e concentre seus esforços
                no canal que mais gera
                oportunidades. Pequenas ações de
                follow-up podem aumentar
                significativamente sua taxa de
                conversão.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <InactiveCustomers
        data={reports.inactiveCustomers}
      />
    </div>
  );
}