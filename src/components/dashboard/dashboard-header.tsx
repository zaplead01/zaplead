import Link from "next/link";
import { UserPlus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { PageHeader } from "@/src/components/page-header";

import { DashboardData } from "@/src/types/dashboard";

interface Props {
  dashboard: DashboardData;
}

export function DashboardHeader({ dashboard }: Props) {
  
  return (
    <PageHeader
      title={`Olá, ${dashboard.userName}!`}
      description={`${dashboard.organizationName} • Plano ${dashboard.plan}`}
    >
      <Button
  nativeButton={false}
  render={<Link href="/clientes/novo" />}
>
  <UserPlus className="size-4" />
  Novo Cliente
</Button>
    </PageHeader>
  );
}