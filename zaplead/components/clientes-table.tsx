"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Phone, MapPin, ChevronRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { StatusBadge } from "@/components/status-badge"
import {
  clientes,
  statusOrder,
  statusLabels,
  getInitials,
  formatCurrency,
  type Status,
} from "@/lib/data"

export function ClientesTable() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [status, setStatus] = useState<Status | "todos">("todos")

  const filtrados = useMemo(() => {
    return clientes.filter((c) => {
      const matchBusca = c.nome
        .toLowerCase()
        .includes(busca.trim().toLowerCase())
      const matchStatus = status === "todos" || c.status === status
      return matchBusca && matchStatus
    })
  }, [busca, status])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as Status | "todos")}
        >
          <SelectTrigger className="h-9 w-full sm:w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="todos">Todos os status</SelectItem>
              {statusOrder.map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabels[s]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden p-0">
        {filtrados.length === 0 ? (
          <Empty className="py-16">
            <EmptyHeader>
              <EmptyTitle>Nenhum cliente encontrado</EmptyTitle>
              <EmptyDescription>
                Ajuste a busca ou o filtro de status.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden lg:table-cell">Cidade</TableHead>
                <TableHead className="hidden sm:table-cell">Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden xl:table-cell text-right">
                  Valor
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/clientes/${c.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(c.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{c.nome}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground md:hidden">
                          <Phone className="size-3" />
                          {c.telefone}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {c.telefone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {c.cidade}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {c.origem}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-right font-medium">
                    {c.valor > 0 ? formatCurrency(c.valor) : "—"}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <p className="text-sm text-muted-foreground">
        Mostrando {filtrados.length} de {clientes.length} clientes.
      </p>
    </div>
  )
}
