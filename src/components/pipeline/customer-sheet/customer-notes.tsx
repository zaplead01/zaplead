"use client";

import { StickyNote } from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";

type Props = {
  customer: Customer;
};

export function CustomerNotes({
  customer,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <StickyNote className="h-5 w-5 text-primary" />

          Observações

        </CardTitle>

      </CardHeader>

      <CardContent>

        {customer.notes ? (

          <div
            className="
              rounded-xl
              border
              bg-muted/30
              p-4

              leading-7

              whitespace-pre-wrap
            "
          >
            {customer.notes}
          </div>

        ) : (

          <div
            className="
              flex
              h-32

              items-center
              justify-center

              rounded-xl

              border-2
              border-dashed

              text-center

              text-muted-foreground
            "
          >
            Nenhuma observação cadastrada.
          </div>

        )}

      </CardContent>

    </Card>
  );
}