import { Card, CardContent } from "@/src/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  description,
  trend,
  positive = true,
  icon,
}: MetricCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              {value}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
        </div>

        {trend && (
          <div
            className={cn(
              "mt-6 flex items-center gap-2 text-sm font-medium",
              positive ? "text-emerald-600" : "text-red-500"
            )}
          >
            {positive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}

            <span>{trend}</span>
          </div>
        )}

        {/* Sparkline */}
        <div className="mt-6">
          <svg
            viewBox="0 0 220 40"
            className="h-10 w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sparkGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 30
                 C20 28 35 24 50 18
                 C70 10 90 12 110 22
                 C130 32 150 28 170 16
                 C190 8 205 14 220 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={cn(
                positive ? "text-emerald-500" : "text-red-500"
              )}
            />

            <path
              d="M0 30
                 C20 28 35 24 50 18
                 C70 10 90 12 110 22
                 C130 32 150 28 170 16
                 C190 8 205 14 220 12
                 L220 40
                 L0 40 Z"
              fill="url(#sparkGradient)"
              className={cn(
                positive ? "text-emerald-500" : "text-red-500"
              )}
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}