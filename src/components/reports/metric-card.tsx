import { Card, CardContent } from "@/src/components/ui/card"
import { TrendingUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  description?: string
  trend?: string
  icon?: React.ReactNode
}

export function MetricCard({
  title,
  value,
  description,
  trend,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          {icon}
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {trend && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              {trend}
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  )
}