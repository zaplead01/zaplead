"use client";

import {
  AlertCircle,
  Calendar,
  Clock3,
  DollarSign,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";

import { toast } from "sonner";

import { customerService } from "@/src/services/customer.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";


import { useState } from "react";

import { Customer } from "@/src/types/customer/customer";
import { CustomerSheet } from "@/src/components/pipeline/customer-sheet/customer-sheet";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

import { useFollowUps } from "@/src/hooks/use-follow-ups";

export function FollowUpsCard() {
  const {
    followUps,
    loading,
    reload,
  } = useFollowUps();
  
  const [selectedCustomer, setSelectedCustomer] =
  useState<Customer | null>(null);

const [sheetOpen, setSheetOpen] =
  useState(false);

  async function handleComplete(customerId: string) {
    const result =
      await customerService.completeFollowUp(customerId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    reload();
  }

  function formatFollowUp(date: string | null) {
    if (!date) return "--";

    const [year, month, day] =
      date.split("T")[0].split("-");

    const time = date.slice(11, 16);

    const today = new Date();

    const todayString =
      `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}`;

    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const tomorrowString =
      `${tomorrow.getFullYear()}-${String(
        tomorrow.getMonth() + 1
      ).padStart(2, "0")}-${String(
        tomorrow.getDate()
      ).padStart(2, "0")}`;

    const current =
      `${year}-${month}-${day}`;

    if (current === todayString) {
      return `Hoje às ${time}`;
    }

    if (current === tomorrowString) {
      return `Amanhã às ${time}`;
    }

    return `${day}/${month} às ${time}`;
  }

  function renderCustomers(
    customers: typeof followUps.today,
    badge: "danger" | "warning" | "success"
  ) {
    if (customers.length === 0) {
      return (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhum follow-up.
        </div>
      );
    }
    

    return customers.map((customer) => (
      <>
      <Card
        key={customer.id}
        className="transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <CardContent className="space-y-4 p-5">

          <div className="flex items-center justify-between">

            {badge === "danger" && (
              <Badge variant="destructive">
                ATRASADO
              </Badge>
            )}

            {badge === "warning" && (
              <Badge className="bg-amber-500 hover:bg-amber-600">
                HOJE
              </Badge>
            )}

            {badge === "success" && (
              <Badge className="bg-green-600 hover:bg-green-700">
                AMANHÃ
              </Badge>
            )}

          </div>

          <div>

            <h4 className="text-lg font-semibold leading-none">
              {customer.full_name}
            </h4>

            <p className="mt-1 text-xs text-muted-foreground">
              {customer.company || "Sem empresa"}
            </p>

          </div>

          <div className="border-t" />

          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2 text-muted-foreground">

              <Clock3 size={15} />

              <span>
                {formatFollowUp(
                  customer.next_follow_up_at
                )}
              </span>

            </div>

            <div className="flex items-center gap-2 text-muted-foreground">

              <DollarSign size={15} />

              <span>
                {customer.estimated_value
                  ? customer.estimated_value.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )
                  : "Sem valor"}
              </span>

            </div>

          </div>

          <div className="flex gap-2 pt-2">

            <Button
  variant="outline"
  className="flex-1"
  onClick={() => {
    setSelectedCustomer(customer);
    setSheetOpen(true);
  }}
>
  <FolderOpen className="mr-2 h-4 w-4" />
  Abrir
</Button>

            <Button
              onClick={() =>
                handleComplete(customer.id)
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-4 w-4" />
            </Button>

          </div>

        </CardContent>
      </Card>

      <CustomerSheet
  customer={selectedCustomer}
  open={sheetOpen}
  onOpenChange={(open) => {
    setSheetOpen(open);

    if (!open) {
      reload();
    }
  }}
  onUpdated={() => {
    reload();
  }}
/>

      </>
    ));
  }
  return (
  <Card className="border-primary/20 shadow-md">

    <CardHeader className="border-b">

      <div className="flex items-center justify-between">

        <div>

          <CardTitle className="flex items-center gap-2 text-xl">

            <Calendar size={20} />

            Agenda de Follow-ups

          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe seus contatos agendados para hoje.
          </p>

        </div>

        <Badge variant="secondary">
          {followUps.overdue.length +
            followUps.today.length +
            followUps.tomorrow.length}{" "}
          contatos
        </Badge>

      </div>

    </CardHeader>

    <CardContent className="pt-6">

      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground">
          Carregando follow-ups...
        </div>
      ) : (

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ATRASADOS */}

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <AlertCircle
                  className="text-red-500"
                  size={20}
                />

                <h3 className="font-semibold text-red-600">
                  Atrasados
                </h3>

              </div>

              <Badge variant="destructive">
                {followUps.overdue.length}
              </Badge>

            </div>

            {renderCustomers(
              followUps.overdue,
              "danger"
            )}

          </div>

          {/* HOJE */}

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Clock3
                  className="text-amber-500"
                  size={20}
                />

                <h3 className="font-semibold text-amber-600">
                  Hoje
                </h3>

              </div>

              <Badge className="bg-amber-500 hover:bg-amber-600">
                {followUps.today.length}
              </Badge>

            </div>

            {renderCustomers(
              followUps.today,
              "warning"
            )}

          </div>

          {/* AMANHÃ */}

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Calendar
                  className="text-green-600"
                  size={20}
                />

                <h3 className="font-semibold text-green-600">
                  Amanhã
                </h3>

              </div>

              <Badge className="bg-green-600 hover:bg-green-700">
                {followUps.tomorrow.length}
              </Badge>

            </div>

            {renderCustomers(
              followUps.tomorrow,
              "success"
            )}

          </div>

        </div>

      )}

    </CardContent>

  </Card>

  
);
}