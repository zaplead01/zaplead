import Link from "next/link"
import { UserPlus } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { PageHeader } from "@/src/components/page-header"
import { CustomersTable } from "@/src/components/customers/clientes-table"

export default function ClientesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Clientes"
        description="Gerencie todos os seus contatos e leads."
      >
        <Button render={<Link href="/clientes/novo" />}>
          <UserPlus className="size-4" />
          Novo Cliente
        </Button>
      </PageHeader>
      <CustomersTable />
    </div>
  )
}
