"use client";

import {
  Building2,
  GripVertical,
  MessageCircle,
  Pencil,
  Phone,
} from "lucide-react";

import {
  useSortable,
} from "@dnd-kit/sortable";

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
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              {formatCurrency(
                customer.estimated_value
              )}
            </div>
          ) : null}
        </div>

        <div className="my-4 border-t" />

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>
              {customer.phone ?? "-"}
            </span>
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">

            <button
              onClick={(e) =>
                e.stopPropagation()
              }
              className="rounded p-2 hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" />
            </button>

            <button
              onClick={(e) =>
                e.stopPropagation()
              }
              className="rounded p-2 hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
            </button>

          </div>

        </div>
      </Card>
    </div>
  );
}