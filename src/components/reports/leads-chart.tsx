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
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

interface LeadsChartProps {
  data: {
    day: string;
    leads: number;
  }[];
}

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
};

export function LeadsChart({ data }: LeadsChartProps) {
  const totalLeads = data.reduce((acc, item) => acc + item.leads, 0);

  const ultimoPeriodo = data.at(-1)?.leads ?? 0;

  const media = data.length
    ? Math.round(totalLeads / data.length)
    : 0;

  const pico = Math.max(...data.map((d) => d.leads), 0);

  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">
            Leads por período
          </CardTitle>

          <CardDescription>
            Quantidade de leads cadastrados ao longo do tempo
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[340px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="fillLeads"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-leads)"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="var(--color-leads)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <Area
                type="monotone"
                dataKey="leads"
                stroke="var(--color-leads)"
                strokeWidth={3}
                fill="url(#fillLeads)"
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold">
              {totalLeads}
            </p>

            <p className="text-sm text-muted-foreground">
              Total de Leads
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              {media}
            </p>

            <p className="text-sm text-muted-foreground">
              Média por período
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              {pico}
            </p>

            <p className="text-sm text-muted-foreground">
              Pico de Leads
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-muted/30 p-4">
          <p className="text-sm font-medium">
            📈 Resumo do período
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Foram cadastrados{" "}
            <span className="font-semibold text-foreground">
              {totalLeads} leads
            </span>{" "}
            durante o período selecionado. O maior volume registrado foi de{" "}
            <span className="font-semibold text-foreground">
              {pico} leads
            </span>{" "}
            em um único dia, com uma média de{" "}
            <span className="font-semibold text-foreground">
              {media}
            </span>{" "}
            lead(s) por período.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}