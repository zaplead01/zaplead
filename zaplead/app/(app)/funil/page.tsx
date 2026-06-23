import { PageHeader } from "@/components/page-header"
import { FunilBoard } from "@/components/funil-board"

export default function FunilPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Funil de Vendas"
        description="Arraste os cards entre as colunas para atualizar o estágio de cada negociação."
      />
      <FunilBoard />
    </div>
  )
}
