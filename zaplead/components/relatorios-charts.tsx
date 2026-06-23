"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { desempenhoMensal, origemDistribuicao } from "@/lib/data"

const barConfig = {
  leads: { label: "Leads", color: "var(--chart-2)" },
  vendas: { label: "Vendas", color: "var(--chart-1)" },
} satisfies ChartConfig

export function LeadsVendasChart() {
  return (
    <ChartContainer config={barConfig} className="h-[300px] w-full">
      <BarChart data={desempenhoMensal} margin={{ left: -12, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="leads" fill="var(--color-leads)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="vendas" fill="var(--color-vendas)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

const cores = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--muted-foreground)",
]

const pieConfig = origemDistribuicao.reduce((acc, item, i) => {
  acc[item.origem] = { label: item.origem, color: cores[i] }
  return acc
}, {} as ChartConfig)

export function OrigemChart() {
  const data = origemDistribuicao.map((d, i) => ({
    ...d,
    fill: cores[i],
  }))
  return (
    <ChartContainer
      config={pieConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="origem" />} />
        <Pie
          data={data}
          dataKey="total"
          nameKey="origem"
          innerRadius={60}
          strokeWidth={2}
        >
          {data.map((entry) => (
            <Cell key={entry.origem} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="origem" />}
          className="flex-wrap gap-2"
        />
      </PieChart>
    </ChartContainer>
  )
}
