"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
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

export function PipelineChart({
  data,
}: PipelineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[320px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />

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
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}