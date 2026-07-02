"use client";

import { useState, useEffect } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

import {
  BarChart3,
  Download,
  RefreshCw,
  CalendarDays,
} from "lucide-react";

interface ReportHeaderProps {
  onRefresh?: () => void;
}

export function ReportHeader({
  onRefresh,
}: ReportHeaderProps) {
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    updateDate();
  }, []);

  function updateDate() {
    setLastUpdate(
      new Date().toLocaleString("pt-BR")
    );
  }

  function handleRefresh() {
    updateDate();

    onRefresh?.();
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="space-y-4">
        <Badge
          variant="secondary"
          className="w-fit gap-2 px-3 py-1"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Dashboard Analítico
        </Badge>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Relatórios
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Acompanhe os principais indicadores do seu CRM,
            monitore o desempenho do funil de vendas e descubra
            oportunidades para aumentar suas conversões.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />

          Atualizado em {lastUpdate}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />

          Atualizar
        </Button>

        <Button
          size="lg"
          className="gap-2 rounded-xl"
          disabled
        >
          <Download className="h-4 w-4" />

          Exportar (Em breve)
        </Button>
      </div>
    </div>
  );
}