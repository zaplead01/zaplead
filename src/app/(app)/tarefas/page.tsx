import { Plus } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { PageHeader } from "@/src/components/page-header"
import { TarefasView } from "@/src/components/tarefas-view"

export default function TarefasPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tarefas"
        description="Acompanhe seus follow-ups e compromissos com os clientes."
      >
        <Button>
          <Plus className="size-4" />
          Nova Tarefa
        </Button>
      </PageHeader>
      <TarefasView />
    </div>
  )
}
