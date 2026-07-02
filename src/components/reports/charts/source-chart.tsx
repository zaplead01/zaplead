"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface SourceChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export function SourceChart({ data }: SourceChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const topSource =
    data.length > 0
      ? data.reduce((prev, current) =>
          prev.value > current.value ? prev : current
        )
      : null;

  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">
          Origem dos Leads
        </CardTitle>

        <CardDescription>
          Distribuição dos canais de aquisição
        </CardDescription>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[320px] items-center justify-center text-muted-foreground">
            Nenhum dado disponível.
          </div>
        ) : (
          <>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value: number) => [
                        `${value} Leads`,
                        "Quantidade",
                      ]}
                    />

                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={75}
                      outerRadius={110}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">
                    {total}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    Leads
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {data.map((item, index) => {
                  const percentage =
                    total === 0
                      ? 0
                      : Math.round((item.value / total) * 100);

                  return (
                    <div
                      key={item.name}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor:
                                COLORS[index % COLORS.length],
                            }}
                          />

                          <span className="font-medium">
                            {item.name}
                          </span>
                        </div>

                        <span className="text-muted-foreground">
                          {item.value} • {percentage}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor:
                              COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total de Leads
                </p>

                <p className="text-3xl font-bold">
                  {total}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Canais
                </p>

                <p className="text-3xl font-bold">
                  {data.length}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border bg-muted/30 p-4">
              <p className="text-sm font-medium">
                📢 Insight
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {topSource ? (
                  <>
                    O canal com melhor desempenho é{" "}
                    <span className="font-semibold text-foreground">
                      {topSource.name}
                    </span>
                    , responsável por{" "}
                    <span className="font-semibold text-foreground">
                      {Math.round(
                        (topSource.value / total) * 100
                      )}
                      %
                    </span>{" "}
                    dos leads cadastrados neste período.
                  </>
                ) : (
                  "Ainda não há dados suficientes para gerar insights."
                )}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}