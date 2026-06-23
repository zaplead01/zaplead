"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { desempenhoMensal } from "@/lib/data"

const config = {
  leads: { label: "Leads", color: "var(--chart-2)" },
  vendas: { label: "Vendas", color: "var(--chart-1)" },
} satisfies ChartConfig

export function PerformanceChart() {
  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <AreaChart data={desempenhoMensal} margin={{ left: -12, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillLeads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-vendas)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-vendas)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="mes"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="leads"
          type="monotone"
          stroke="var(--color-leads)"
          strokeWidth={2}
          fill="url(#fillLeads)"
        />
        <Area
          dataKey="vendas"
          type="monotone"
          stroke="var(--color-vendas)"
          strokeWidth={2}
          fill="url(#fillVendas)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
