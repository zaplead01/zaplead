"use client"

import { useMemo, useState } from "react"

import { cn } from "@/src/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Button } from "@/src/components/ui/button"
import { tarefas as tarefasIniciais, type Tarefa } from "@/src/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"

const prioridadeStyles: Record<Tarefa["prioridade"], string> = {
  alta: "bg-rose-100 text-rose-700",
  media: "bg-amber-100 text-amber-700",
  baixa: "bg-sky-100 text-sky-700",
}

const prioridadeLabel: Record<Tarefa["prioridade"], string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
}

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function TarefasView() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais)
  const [mesAtual, setMesAtual] = useState(5) // Junho (0-indexed)
  const ano = 2026

  function toggle(id: string) {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    )
  }

  const pendentes = tarefas.filter((t) => !t.concluida)
  const concluidas = tarefas.filter((t) => t.concluida)

  const diasComTarefa = useMemo(() => {
    const set = new Map<number, number>()
    tarefas.forEach((t) => {
      const [y, m, d] = t.vencimento.split("-").map(Number)
      if (y === ano && m - 1 === mesAtual) {
        set.set(d, (set.get(d) ?? 0) + 1)
      }
    })
    return set
  }, [tarefas, mesAtual])

  const primeiroDia = new Date(ano, mesAtual, 1).getDay()
  const diasNoMes = new Date(ano, mesAtual + 1, 0).getDate()
  const celulas: (number | null)[] = [
    ...Array(primeiroDia).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* Lista de tarefas */}
      <div className="flex flex-col gap-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
            <CardDescription>
              {pendentes.length} tarefa(s) aguardando conclusão.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {pendentes.map((t) => (
              <TaskRow key={t.id} t={t} onToggle={toggle} />
            ))}
            {pendentes.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">
                Nenhuma tarefa pendente. Bom trabalho!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Concluídas</CardTitle>
            <CardDescription>{concluidas.length} tarefa(s).</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {concluidas.map((t) => (
              <TaskRow key={t.id} t={t} onToggle={toggle} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Calendário */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {meses[mesAtual]} {ano}
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setMesAtual((m) => (m + 11) % 12)}
                >
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">Mês anterior</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setMesAtual((m) => (m + 1) % 12)}
                >
                  <ChevronRight className="size-4" />
                  <span className="sr-only">Próximo mês</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {diasSemana.map((d) => (
                <div
                  key={d}
                  className="py-1 text-xs font-medium text-muted-foreground"
                >
                  {d}
                </div>
              ))}
              {celulas.map((dia, idx) => {
                const qtd = dia ? diasComTarefa.get(dia) : undefined
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center rounded-lg text-sm",
                      dia ? "hover:bg-accent" : "",
                      qtd && "bg-primary/10 font-medium text-primary",
                    )}
                  >
                    {dia && (
                      <>
                        <span>{dia}</span>
                        {qtd && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-full bg-primary/20 ring-1 ring-primary" />
              Dias com tarefas agendadas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TaskRow({
  t,
  onToggle,
}: {
  t: Tarefa
  onToggle: (id: string) => void
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50",
        t.concluida && "opacity-60",
      )}
    >
      <Checkbox checked={t.concluida} onCheckedChange={() => onToggle(t.id)} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            t.concluida && "line-through text-muted-foreground",
          )}
        >
          {t.titulo}
        </p>
        <p className="text-xs text-muted-foreground">
          {t.cliente} · vence em {t.vencimento}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
          prioridadeStyles[t.prioridade],
        )}
      >
        {prioridadeLabel[t.prioridade]}
      </span>
    </label>
  )
}
