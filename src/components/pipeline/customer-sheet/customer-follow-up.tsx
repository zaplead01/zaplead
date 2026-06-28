"use client";

import { Calendar } from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

type Props = {
  customer: Customer;

  editing: boolean;

  form: {
    next_follow_up_at: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

export function CustomerFollowUp({
  customer,
  editing,
  form,
  setForm,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} />
          Follow-up
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        <div className="space-y-2">

          <Label>
            Próximo contato
          </Label>

          {editing ? (
            <Input
              type="datetime-local"
              value={form.next_follow_up_at}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  next_follow_up_at:
                    e.target.value,
                }))
              }
            />
          ) : (
            <div className="rounded-md border p-3 text-sm">

              {customer.next_follow_up_at
                ? new Date(
                    customer.next_follow_up_at
                  ).toLocaleString("pt-BR")
                : "Nenhum follow-up agendado"}

            </div>
          )}

        </div>

      </CardContent>

    </Card>
  );
}