"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Phone,
  Search,
  Building2,
  Mail,
} from "lucide-react";

import { useCustomers } from "@/src/hooks/use-customers";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Skeleton } from "@/src/components/ui/skeleton";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/src/components/ui/empty";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { getInitials } from "@/src/utils/initials";
import { formatCurrency } from "@/src/utils/currency";

export function CustomersTable() {
  const router = useRouter();

  const { customers, loading } = useCustomers();

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const value = search.toLowerCase();

      return (
        customer.full_name.toLowerCase().includes(value) ||
        (customer.company ?? "")
          .toLowerCase()
          .includes(value) ||
        (customer.phone ?? "")
          .toLowerCase()
          .includes(value) ||
        (customer.email ?? "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [customers, search]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="relative">

        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />

      </div>

      <Card className="overflow-hidden p-0">

        {filteredCustomers.length === 0 ? (

          <Empty className="py-16">

            <EmptyHeader>

              <EmptyTitle>
                Nenhum cliente encontrado
              </EmptyTitle>

              <EmptyDescription>
                Cadastre seu primeiro cliente.
              </EmptyDescription>

            </EmptyHeader>

          </Empty>

        ) : (

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>Cliente</TableHead>

                <TableHead>Empresa</TableHead>

                <TableHead>WhatsApp</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Origem</TableHead>

                <TableHead className="text-right">
                  Valor
                </TableHead>

                <TableHead className="w-10" />

              </TableRow>

            </TableHeader>

            <TableBody>

              {filteredCustomers.map((customer) => (                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() =>
                    router.push(`/clientes/${customer.id}`)
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(customer.full_name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {customer.full_name}
                        </p>

                        <p className="text-xs text-muted-foreground md:hidden">
                          {customer.phone ?? "Sem telefone"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="size-4" />
                      {customer.company ?? "—"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-4" />
                      {customer.phone ?? "—"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-4" />
                      {customer.email ?? "—"}
                    </span>
                  </TableCell>

                  <TableCell>
                    {customer.lead_source ?? "—"}
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {customer.estimated_value
                      ? formatCurrency(customer.estimated_value)
                      : "—"}
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
        Mostrando {filteredCustomers.length} de {customers.length} clientes.
      </p>

    </div>
  );
}