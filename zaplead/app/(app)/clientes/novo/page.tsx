import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { NovoClienteForm } from "@/components/novo-cliente-form"

export default function NovoClientePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit -ml-2"
        render={<Link href="/clientes" />}
      >
        <ArrowLeft className="size-4" />
        Voltar para clientes
      </Button>
      <PageHeader
        title="Novo Cliente"
        description="Cadastre um novo lead recebido pelo WhatsApp ou outro canal."
      />
      <NovoClienteForm />
    </div>
  )
}
