"use client"

import {
  PieChart,
  Pie,
  Cell,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

const data = [
  { name: "WhatsApp", value: 45 },
  { name: "Instagram", value: 30 },
  { name: "Indicação", value: 15 },
  { name: "Site", value: 10 },
]

const COLORS = [
  "hsl(var(--primary))",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
]

export function SourceChart() {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Origem dos Leads
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="h-[320px]">

          <PieChart width={300} height={300}>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

          </PieChart>

        </div>

      </CardContent>

    </Card>
  )
}