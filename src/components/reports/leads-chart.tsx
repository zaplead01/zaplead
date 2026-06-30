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
  CartesianGrid,
  Line,
  LineChart,
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

export function LeadsChart({
  data,
}: LeadsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads por período</CardTitle>

        <CardDescription>
          Leads cadastrados
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[320px] w-full"
        >
          <LineChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
            />

            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            <Line
              dataKey="leads"
              type="monotone"
              stroke="var(--color-leads)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}