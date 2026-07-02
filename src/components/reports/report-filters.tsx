"use client";

import {
  CalendarDays,
  Filter,
  GitBranch,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Badge } from "@/src/components/ui/badge";

import { usePipelines } from "@/src/hooks/use-pipeline";

export type ReportsFilters = {
  period: "today" | "7days" | "30days" | "month" | "90days";
  pipeline: string;
};

type ReportFiltersProps = {
  filters: ReportsFilters;
  onFiltersChange: (filters: ReportsFilters) => void;
};

export function ReportFilters({
  filters,
  onFiltersChange,
}: ReportFiltersProps) {
  const { pipelines, loading } = usePipelines();

  const selectedPipeline =
    filters.pipeline === "all"
      ? "Todos os Pipelines"
      : pipelines.find(
          (pipeline) => pipeline.id === filters.pipeline
        )?.name ?? "Pipeline";

        const selectedPeriod = {
  today: "Hoje",
  "7days": "Últimos 7 dias",
  "30days": "Últimos 30 dias",
  month: "Este mês",
  "90days": "Últimos 90 dias",
}[filters.period];

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />

          <div>
            <h3 className="font-semibold">
              Filtros
            </h3>

            <p className="text-sm text-muted-foreground">
              Personalize os dados exibidos nos relatórios.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="h-4 w-4 text-primary" />
              Período
            </label>

            <Select
              value={filters.period}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  period:
                    value as ReportsFilters["period"],
                })
              }
            >
              <SelectTrigger className="w-[220px] rounded-xl">
  <SelectValue>
    {selectedPeriod}
  </SelectValue>
</SelectTrigger>

              <SelectContent>
                <SelectItem value="today">
                  Hoje
                </SelectItem>

                <SelectItem value="7days">
                  Últimos 7 dias
                </SelectItem>

                <SelectItem value="30days">
                  Últimos 30 dias
                </SelectItem>

                <SelectItem value="month">
                  Este mês
                </SelectItem>

                <SelectItem value="90days">
                  Últimos 90 dias
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <GitBranch className="h-4 w-4 text-primary" />
              Pipeline
            </label>

            <Select
              value={filters.pipeline}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  pipeline: value,
                })
              }
            >
              <SelectTrigger className="w-[220px] rounded-xl">
  <SelectValue>
    {selectedPipeline}
  </SelectValue>
</SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  Todos os Pipelines
                </SelectItem>

                {!loading &&
                  pipelines.map((pipeline) => (
                    <SelectItem
                      key={pipeline.id}
                      value={pipeline.id}
                    >
                      {pipeline.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t pt-5">

        <Badge variant="secondary">
  {selectedPeriod}
</Badge>

        <Badge variant="secondary">
          {selectedPipeline}
        </Badge>

      </div>
    </div>
  );
}