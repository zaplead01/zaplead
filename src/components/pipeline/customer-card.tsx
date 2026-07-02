"use client";

import {
  Building2,
  GripVertical,
  MessageCircle,
  Pencil,
  Phone,
} from "lucide-react";

import { formatPhone } from "@/src/utils/phone";

import {
  useSortable,
} from "@dnd-kit/sortable";
import { FaWhatsapp } from "react-icons/fa";
import {
  CSS,
} from "@dnd-kit/utilities";

import { Customer } from "@/src/types/customer/customer";

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

import { Card } from "@/src/components/ui/card";

import { getInitials } from "@/src/utils/initials";
import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customer: Customer;
  onClick?: () => void;
};

export function CustomerCard({
  customer,
  onClick,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: customer.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const whatsappUrl = customer.phone
  ? `https://wa.me/${customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Olá ${customer.full_name}, tudo bem?`
    )}`
  : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isDragging
          ? "opacity-40"
          : ""
      }
    >
      <Card
        onClick={onClick}
        className="
          group
          rounded-xl
          border
          p-4
          cursor-pointer
          transition-all
          hover:border-primary
          hover:shadow-lg
        "
      >
        <div className="flex justify-between">

          <div className="flex gap-3">

            <button
              {...attributes}
              {...listeners}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                mt-1
                rounded
                cursor-grab
                text-muted-foreground
                hover:text-foreground
                active:cursor-grabbing
              "
            >
              <GripVertical
                className="h-4 w-4"
              />
            </button>

            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {getInitials(
                  customer.full_name
                )}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">

              <h4 className="truncate font-medium">
                {customer.full_name}
              </h4>

              {customer.company && (
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {customer.company}
                  </span>
                </div>
              )}

            </div>
          </div>

          {customer.estimated_value ? (
            <div className="self-start rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
  {formatCurrency(customer.estimated_value)}
</div>
          ) : null}
        </div>

        <div className="my-4 border-t" />

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>
  {formatPhone(customer.phone)}
</span>
          </div>

          {whatsappUrl && (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-green-500
      text-white
      transition-all
      hover:scale-110
      hover:bg-green-600
    "
  >
    <FaWhatsapp className="h-5 w-5" />
  </a>
)}

        </div>
      </Card>
    </div>
  );
}