import Link from "next/link"
import {
  Users,
  UserPlus,
  Handshake,
  CheckCircle2,
  Percent,
  ArrowUpRight,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import { PerformanceChart } from "@/components/performance-chart"
import { clientes, getInitials, formatCurrency } from "@/lib/data"

export default function DashboardPage() {
  const total = clientes.length
  const leadsHoje = clientes.filter((c) => c.criadoEm === "2026-06-23").length
  const negociacoes = clientes.filter(
    (c) => c.status === "negociacao" || c.status === "proposta",
  ).length
  const fechadas = clientes.filter((c) => c.status === "fechado")
  const conversao = Math.round((fechadas.length / total) * 100)
  const recentes = [...clientes]
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu funil de vendas e leads do WhatsApp."
      >
        <Button render={<Link href="/clientes/novo" />}>
          <UserPlus className="size-4" />
          Novo Cliente
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total de clientes"
          value={String(total)}
          icon={Users}
          trend="+12% este mês"
        />
        <StatCard
          label="Leads do dia"
          value={String(leadsHoje)}
          icon={UserPlus}
          trend="+3 hoje"
        />
        <StatCard
          label="Negociações em andamento"
          value={String(negociacoes)}
          icon={Handshake}
          trend="+5% na semana"
        />
        <StatCard
          label="Vendas fechadas"
          value={String(fechadas.length)}
          icon={CheckCircle2}
          trend="+2 esta semana"
        />
        <StatCard
          label="Taxa de conversão"
          value={`${conversao}%`}
          icon={Percent}
          trend="+4 p.p."
        />
        <StatCard
          label="Receita fechada"
          value={formatCurrency(
            fechadas.reduce((acc, c) => acc + c.valor, 0),
          )}
          icon={ArrowUpRight}
          trend="+18% no mês"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho</CardTitle>
            <CardDescription>
              Leads recebidos e vendas fechadas nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads recentes</CardTitle>
            <CardDescription>
              Últimos clientes que chegaram pelo WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentes.map((c) => (
              <Link
                key={c.id}
                href={`/clientes/${c.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
              >
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {getInitials(c.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.nome}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.ultimaInteracao}
                  </p>
                </div>
                <StatusBadge status={c.status} />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
