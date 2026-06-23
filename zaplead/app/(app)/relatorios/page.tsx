import { Users, CheckCircle2, Percent, DollarSign } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { LeadsVendasChart, OrigemChart } from "@/components/relatorios-charts"
import { clientes, formatCurrency } from "@/lib/data"

export default function RelatoriosPage() {
  const totalLeads = clientes.length
  const fechadas = clientes.filter((c) => c.status === "fechado")
  const receita = fechadas.reduce((acc, c) => acc + c.valor, 0)
  const conversao = Math.round((fechadas.length / totalLeads) * 100)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Relatórios"
        description="Acompanhe os resultados das suas vendas e a origem dos leads."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total de leads"
          value={String(totalLeads)}
          icon={Users}
          trend="+12% no mês"
        />
        <StatCard
          label="Total de vendas"
          value={String(fechadas.length)}
          icon={CheckCircle2}
          trend="+2 no mês"
        />
        <StatCard
          label="Taxa de conversão"
          value={`${conversao}%`}
          icon={Percent}
          trend="+4 p.p."
        />
        <StatCard
          label="Receita total"
          value={formatCurrency(receita)}
          icon={DollarSign}
          trend="+18% no mês"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leads x Vendas</CardTitle>
            <CardDescription>
              Comparativo mensal de leads recebidos e vendas fechadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsVendasChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Origem dos leads</CardTitle>
            <CardDescription>
              De onde vêm os seus clientes potenciais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrigemChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
