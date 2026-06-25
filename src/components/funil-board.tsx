"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, GripVertical } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import {
  clientes as clientesIniciais,
  statusOrder,
  statusLabels,
  getInitials,
  formatCurrency,
  type Cliente,
  type Status,
} from "@/src/lib/data"

const colunaAccent: Record<Status, string> = {
  novo: "bg-sky-500",
  contato: "bg-amber-500",
  negociacao: "bg-violet-500",
  proposta: "bg-orange-500",
  fechado: "bg-emerald-500",
  perdido: "bg-rose-500",
}

export function FunilBoard() {
  const router = useRouter()
  const [cards, setCards] = useState<Cliente[]>(clientesIniciais)
  const [arrastando, setArrastando] = useState<string | null>(null)
  const [sobre, setSobre] = useState<Status | null>(null)

  function onDrop(status: Status) {
    if (arrastando) {
      setCards((prev) =>
        prev.map((c) => (c.id === arrastando ? { ...c, status } : c)),
      )
    }
    setArrastando(null)
    setSobre(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {statusOrder.map((status) => {
        const coluna = cards.filter((c) => c.status === status)
        const totalValor = coluna.reduce((acc, c) => acc + c.valor, 0)
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault()
              setSobre(status)
            }}
            onDragLeave={() => setSobre((s) => (s === status ? null : s))}
            onDrop={() => onDrop(status)}
            className={cn(
              "flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/40 transition-colors",
              sobre === status && "border-primary bg-accent/60",
            )}
          >
            <div className="flex items-center gap-2 border-b border-border px-3 py-3">
              <span
                className={cn("size-2.5 rounded-full", colunaAccent[status])}
              />
              <h3 className="text-sm font-semibold">{statusLabels[status]}</h3>
              <span className="ml-auto rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {coluna.length}
              </span>
            </div>

            <div className="flex min-h-24 flex-1 flex-col gap-2.5 p-2.5">
              {coluna.map((c) => (
                <article
                  key={c.id}
                  draggable
                  onDragStart={() => setArrastando(c.id)}
                  onDragEnd={() => setArrastando(null)}
                  onClick={() => router.push(`/clientes/${c.id}`)}
                  className={cn(
                    "group cursor-grab rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing",
                    arrastando === c.id && "opacity-50",
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {getInitials(c.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{c.nome}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="size-3" />
                        {c.telefone}
                      </p>
                    </div>
                    <GripVertical className="size-4 shrink-0 text-muted-foreground/50" />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {c.origem}
                    </span>
                    {c.valor > 0 && (
                      <span className="text-xs font-semibold text-primary">
                        {formatCurrency(c.valor)}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {totalValor > 0 && (
              <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                Total:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(totalValor)}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
