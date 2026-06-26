"use client";

import {
  Building2,
  Phone,
  MessageCircle,
  Pencil,
  GripVertical,
} from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Customer } from "@/src/types/customer/customer";

import { Card } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

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
    transition:
      transition ??
      "transform 180ms cubic-bezier(0.2,0,0,1)",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`
        group
        rounded-2xl
        border
        bg-card
        p-4

        cursor-pointer

        transition-all
        duration-200

        hover:-translate-y-1
        hover:border-primary
        hover:shadow-xl

        ${
          isDragging
            ? "pointer-events-none"
            : ""
        }
      `}
    >
      <div className="flex items-start justify-between">

        <div className="flex items-start gap-3">

          <button
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="
              mt-1
              cursor-grab
              rounded-md
              p-1
              text-muted-foreground

              transition-colors

              hover:bg-muted
              hover:text-foreground

              active:cursor-grabbing
            "
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <Avatar className="h-11 w-11 transition-transform duration-200 group-hover:scale-105">
            <AvatarFallback className="font-semibold">
              {getInitials(customer.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold">
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
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {formatCurrency(
              customer.estimated_value
            )}
          </div>
        ) : null}
      </div>

      <div className="my-4 h-px bg-border" />

      <div className="flex items-center justify-between">

        {customer.phone ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />

            <span>{customer.phone}</span>
          </div>
        ) : (
          <div />
        )}

        <div
          className="
            flex
            items-center
            gap-2

            opacity-0
            translate-y-1

            transition-all
            duration-200

            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="
              rounded-lg
              p-2
              transition-colors
              hover:bg-muted
            "
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="
              rounded-lg
              p-2
              transition-colors
              hover:bg-muted
            "
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

      </div>
    </Card>
  );
}