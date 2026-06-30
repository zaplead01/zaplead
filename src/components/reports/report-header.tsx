import { Button } from "@/src/components/ui/button"
import { Download } from "lucide-react"

export function ReportHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Relatórios
        </h1>

        <p className="mt-1 text-muted-foreground">
          Acompanhe os principais indicadores do seu funil de vendas.
        </p>
      </div>

      <Button>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  )
}