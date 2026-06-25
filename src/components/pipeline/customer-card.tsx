  "use client";

  import {
    Building2,
    Phone,
    DollarSign,
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
  };

  export function CustomerCard({
    customer,
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
      <Card
  ref={setNodeRef}
  style={style}
  {...attributes}
  {...listeners}
  className={`
    cursor-grab
    p-4
    transition-all
    hover:shadow-md
    hover:border-primary
    active:cursor-grabbing
    ${isDragging ? "opacity-50 shadow-xl rotate-2" : ""}
  `}
>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>
              {getInitials(customer.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h4 className="truncate font-semibold">
              {customer.full_name}
            </h4>

            {customer.company && (
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="size-3.5" />

                <span className="truncate">
                  {customer.company}
                </span>
              </div>
            )}

            {customer.phone && (
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="size-3.5" />

                {customer.phone}
              </div>
            )}

            {customer.estimated_value && (
              <div className="mt-2 flex items-center gap-2 font-medium text-emerald-600">
                <DollarSign className="size-4" />

                {formatCurrency(
                  customer.estimated_value
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }