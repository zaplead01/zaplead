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
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export function CustomerActions({
  customer,
  editing,
  onEdit,
  onCancel,
  onSave,
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

        {editing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>

            <Button
              onClick={onSave}
              className="flex-1"
            >
              Salvar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={onEdit}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>
        )}

       
      </div>
    </div>
  );
}