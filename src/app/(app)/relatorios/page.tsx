import {
  MetricCard,
  ReportFilters,
  ReportHeader,
} from "@/src/components/reports"

import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">

      <ReportHeader />

      <ReportFilters />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Leads"
          value="156"
          description="Leads cadastrados"
          trend="+18%"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Conversão"
          value="42%"
          description="Últimos 30 dias"
          trend="+5%"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Ganhos"
          value="R$ 32.500"
          description="Negócios fechados"
          trend="+12%"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          title="Funil"
          value="R$ 87.000"
          description="Valor total"
          trend="+9%"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />

      </section>

    </div>
  )
}