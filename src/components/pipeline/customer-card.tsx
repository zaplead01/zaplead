"use client";

import { memo, useMemo } from "react";

import {
  Building2,
  GripVertical,
  Phone,
  Pencil,
} from "lucide-react";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

import { FaWhatsapp } from "react-icons/fa";

import { Customer } from "@/src/types/customer/customer";

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

import { getInitials } from "@/src/utils/initials";
import { formatCurrency } from "@/src/utils/currency";
import { formatPhone } from "@/src/utils/phone";

type Props = {
  customer: Customer;
  onClick?: () => void;
};

export const CustomerCard = memo(function CustomerCard({
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

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  const whatsappUrl = customer.phone
    ? `https://wa.me/${customer.phone.replace(/\D/g, "")}`
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-40" : ""}
    >
      <div
        onClick={onClick}
        className="
          group
          cursor-pointer
          rounded-2xl
          border
          bg-background
          p-3
          shadow-sm
          transition-all
          hover:-translate-y-0.5
          hover:border-primary/50
          hover:shadow-lg
        "
      >
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              className="
                mt-1
                cursor-grab
                text-muted-foreground
                hover:text-foreground
                active:cursor-grabbing
              "
            >
              <GripVertical className="h-4 w-4" />
            </button>

            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {getInitials(customer.full_name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h4 className="truncate font-semibold leading-none">
                {customer.full_name}
              </h4>

              {customer.company && (
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3 shrink-0" />
                  <span className="truncate">
                    {customer.company}
                  </span>
                </div>
              )}
            </div>
          </div>

          {customer.estimated_value ? (
            <div
              className="
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-600
              "
            >
              {formatCurrency(customer.estimated_value)}
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="h-3 w-3 shrink-0" />
          <span>{formatPhone(customer.phone)}</span>
        </div>

        <div className="mt-4 flex gap-2">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="
                flex-1
                rounded-lg
                bg-green-500
                py-2
                text-center
                text-white
                transition-colors
                hover:bg-green-600
              "
            >
              <FaWhatsapp className="mx-auto h-4 w-4" />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="
              rounded-lg
              border
              px-3
              transition-colors
              hover:bg-muted
            "
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

CustomerCard.displayName = "CustomerCard";