import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { TarefasView } from "@/components/tarefas-view"

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
