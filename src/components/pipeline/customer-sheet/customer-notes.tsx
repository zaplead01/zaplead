"use client";

import { StickyNote } from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Textarea } from "@/src/components/ui/textarea";

type Props = {
  customer: Customer;

  editing: boolean;

  form: {
    notes: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

export function CustomerNotes({
  customer,
  editing,
  form,
  setForm,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          Observações
        </CardTitle>
      </CardHeader>

      <CardContent>
        {editing ? (
          <Textarea
            rows={8}
            value={form.notes}
            placeholder="Digite observações sobre este cliente..."
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />
        ) : (
          <div
            className="
              min-h-40
              whitespace-pre-wrap
              rounded-xl
              border
              bg-muted/30
              p-4
              leading-7
              text-muted-foreground
            "
          >
            {customer.notes ||
              "Nenhuma observação cadastrada."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}