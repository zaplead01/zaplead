"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { origens, statusOrder, statusLabels } from "@/lib/data"

export function NovoClienteForm() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Cliente cadastrado com sucesso!")
    router.push("/clientes")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input id="nome" placeholder="Nome do cliente" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
                <Input id="telefone" placeholder="(11) 99999-9999" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="cidade">Cidade</FieldLabel>
                <Input id="cidade" placeholder="Cidade, UF" />
              </Field>
              <Field>
                <FieldLabel htmlFor="origem">Origem</FieldLabel>
                <Select defaultValue="WhatsApp">
                  <SelectTrigger id="origem" className="w-full">
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {origens.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select defaultValue="novo">
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusOrder.map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="observacao">Observação</FieldLabel>
              <Textarea
                id="observacao"
                placeholder="Anotações sobre o cliente, interesse, próximos passos..."
                rows={4}
              />
              <FieldDescription>
                Essas notas aparecem nos detalhes do cliente.
              </FieldDescription>
            </Field>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/clientes")}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar cliente</Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
