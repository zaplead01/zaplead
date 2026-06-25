import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Tag,
  Calendar,
  MessageSquare,
  PhoneCall,
  Users2,
  FileText,
  StickyNote,
  CheckCircle2,
  Circle,
} from "lucide-react"

import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Separator } from "@/src/components/ui/separator"
import { StatusBadge } from "@/src/components/status-badge"
import {
  clientes,
  tarefas,
  getInitials,
  formatCurrency,
  type Interacao,
} from "@/src/lib/data"

const interacaoIcons: Record<Interacao["tipo"], typeof MessageSquare> = {
  mensagem: MessageSquare,
  ligacao: PhoneCall,
  reuniao: Users2,
  proposta: FileText,
  nota: StickyNote,
}

export default async function ClienteDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cliente = clientes.find((c) => c.id === id)
  if (!cliente) notFound()

  const tarefasCliente = tarefas.filter((t) => t.cliente === cliente.nome)

  const dados = [
    { icon: Phone, label: "Telefone", value: cliente.telefone },
    { icon: MapPin, label: "Cidade", value: cliente.cidade },
    { icon: Tag, label: "Origem", value: cliente.origem },
    { icon: Calendar, label: "Cliente desde", value: cliente.criadoEm },
  ]

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit -ml-2"
        render={<Link href="/clientes" />}
      >
        <ArrowLeft className="size-4" />
        Voltar para clientes
      </Button>

      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getInitials(cliente.nome)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {cliente.nome}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={cliente.status} />
              <span className="text-sm text-muted-foreground">
                {cliente.ultimaInteracao}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="size-4" />
            Ligar
          </Button>
          <Button>
            <MessageSquare className="size-4" />
            Mensagem
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de interações</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative flex flex-col gap-5 border-l border-border pl-6">
                {cliente.interacoes.map((i) => {
                  const Icon = interacaoIcons[i.tipo]
                  return (
                    <li key={i.id} className="relative">
                      <span className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground ring-4 ring-background">
                        <Icon className="size-3.5" />
                      </span>
                      <p className="text-sm font-medium">{i.descricao}</p>
                      <p className="text-xs text-muted-foreground">{i.data}</p>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cliente.observacao}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados completos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {dados.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{d.label}</p>
                      <p className="truncate text-sm font-medium">{d.value}</p>
                    </div>
                  </div>
                )
              })}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Valor da negociação
                </span>
                <span className="text-lg font-semibold">
                  {cliente.valor > 0 ? formatCurrency(cliente.valor) : "—"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tarefas associadas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {tarefasCliente.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma tarefa para este cliente.
                </p>
              ) : (
                tarefasCliente.map((t) => (
                  <div key={t.id} className="flex items-start gap-2.5">
                    {t.concluida ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    )}
                    <div>
                      <p
                        className={
                          t.concluida
                            ? "text-sm text-muted-foreground line-through"
                            : "text-sm font-medium"
                        }
                      >
                        {t.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Vence em {t.vencimento}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
