"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface PipelineChartProps {
  data: {
    stage: string;
    total: number;
  }[];
}

const chartConfig = {
  total: {
    label: "Clientes",
    color: "hsl(var(--primary))",
  },
};

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

export function PipelineChart({
  data,
}: PipelineChartProps) {
  const totalClientes = data.reduce(
    (acc, item) => acc + item.total,
    0
  );

  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">
            Funil de Vendas
          </CardTitle>

          <CardDescription>
            Distribuição de leads por etapa do funil
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[340px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="stage"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <Bar
                dataKey="total"
                radius={[12, 12, 0, 0]}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-8 space-y-4">
          {data.map((item, index) => {
            const percentual =
              totalClientes === 0
                ? 0
                : ((item.total / totalClientes) * 100).toFixed(0);

            return (
              <div
                key={item.stage}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {item.stage}
                  </span>

                  <span className="text-muted-foreground">
                    {item.total} • {percentual}%
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentual}%`,
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total no funil
            </p>

            <p className="text-3xl font-bold">
              {totalClientes}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Etapas
            </p>

            <p className="text-3xl font-bold">
              {data.length}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-muted/30 p-4">
          <p className="text-sm font-medium">
            🎯 Resumo do funil
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Existem{" "}
            <span className="font-semibold text-foreground">
              {totalClientes}
            </span>{" "}
            clientes distribuídos em{" "}
            <span className="font-semibold text-foreground">
              {data.length}
            </span>{" "}
            etapas do funil de vendas. Acompanhe a evolução para identificar
            gargalos e oportunidades de conversão.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}