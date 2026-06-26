"use client";

import {
  Calendar,
  MessageCircle,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import { Button } from "@/src/components/ui/button";

type Props = {
  customer: Customer;
};

export function CustomerActions({
  customer,
}: Props) {
  function openWhatsapp() {
    if (!customer.phone) return;

    const phone = customer.phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/55${phone}`,
      "_blank"
    );
  }

  return (
    <div>

      <div className="grid grid-cols-2 gap-3">

        <Button
          onClick={openWhatsapp}
          className="gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>

        <Button
          variant="outline"
          className="gap-2"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>

        <Button
          variant="outline"
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          Agendar
        </Button>

        <Button
          variant="outline"
          className="gap-2"
        >
          <MoreHorizontal className="h-4 w-4" />
          Mais
        </Button>

      </div>

    </div>
  );
}