import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp = true,
}: {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {trendUp ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {trend}
            </p>
          )}
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  )
}
