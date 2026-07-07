"use client";

import { LucideIcon } from "lucide-react";

import { Card } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";

type Props = {
  title: string;
  subtitle?: string;

  icon: LucideIcon;

  current: number;
  limit: number;
};

export function UsageCard({
  title,
  subtitle,
  icon: Icon,
  current,
  limit,
}: Props) {
  const percentage =
    limit <= 0
      ? 0
      : Math.min((current / limit) * 100, 100);

  const remaining = Math.max(limit - current, 0);

  const indicatorColor =
    percentage >= 90
      ? "bg-red-500"
      : percentage >= 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  const statusColor =
    percentage >= 90
      ? "text-red-500"
      : percentage >= 70
      ? "text-amber-500"
      : "text-emerald-500";

  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="space-y-6 p-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">

              <Icon className="h-6 w-6 text-primary" />

            </div>

            <div>

              <h3 className="font-semibold">
                {title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {subtitle ?? "Uso do plano"}
              </p>

            </div>

          </div>

          <span
            className={`text-sm font-semibold ${statusColor}`}
          >
            {percentage.toFixed(0)}%
          </span>

        </div>

        {/* Número */}

        <div>

          <h2 className="text-4xl font-bold tracking-tight">

            {current}

            <span className="text-xl font-medium text-muted-foreground">
              {" "}
              / {limit}
            </span>

          </h2>

        </div>

        {/* Barra */}

        <Progress
          value={percentage}
          indicatorClassName={indicatorColor}
        />

        {/* Footer */}

        <div className="flex items-center justify-between text-sm">

          <span className="text-muted-foreground">
            Utilizado
          </span>

          <span className="font-medium">
            Restam {remaining}
          </span>

        </div>

      </div>

    </Card>
  );
}