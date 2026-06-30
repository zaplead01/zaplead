"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

export function ReportFilters() {
  return (
    <div className="flex flex-wrap gap-3">

      <Select defaultValue="30 Dias">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Hoje">Hoje</SelectItem>
          <SelectItem value="7 Dias">Últimos 7 dias</SelectItem>
          <SelectItem value="30 Dias">Últimos 30 dias</SelectItem>
          <SelectItem value="Este mês">Este mês</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pipeline" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Todos">Todos</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}