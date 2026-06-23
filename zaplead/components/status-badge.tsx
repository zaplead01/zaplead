import { cn } from "@/lib/utils"
import { type Status, statusLabels } from "@/lib/data"

const styles: Record<Status, string> = {
  novo: "bg-sky-100 text-sky-700 ring-sky-600/20",
  contato: "bg-amber-100 text-amber-700 ring-amber-600/20",
  negociacao: "bg-violet-100 text-violet-700 ring-violet-600/20",
  proposta: "bg-orange-100 text-orange-700 ring-orange-600/20",
  fechado: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  perdido: "bg-rose-100 text-rose-700 ring-rose-600/20",
}

export function StatusBadge({
  status,
  className,
}: {
  status: Status
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  )
}
