"use client";

import { Customer } from "@/src/types/customer/customer";

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

import { Badge } from "@/src/components/ui/badge";

import { getInitials } from "@/src/utils/initials";
import { formatCurrency } from "@/src/utils/currency";

type Props = {
  customer: Customer;
};

export function CustomerHeader({
  customer,
}: Props) {
  return (
    <div className="relative">

      {/* Banner */}

      <div
        className="
          h-36
          rounded-b-3xl

          bg-gradient-to-r

          from-primary

          via-primary/90

          to-primary/60
        "
      />

      {/* Conteúdo */}

      <div className="-mt-16 flex flex-col items-center px-6 pb-6">

        <Avatar className="h-28 w-28 border-4 border-background shadow-2xl">

          <AvatarFallback className="text-3xl font-bold">

            {getInitials(customer.full_name)}

          </AvatarFallback>

        </Avatar>

        <h2 className="mt-5 text-2xl font-bold">

          {customer.full_name}

        </h2>

        <p className="mt-1 text-muted-foreground">

          {customer.company || "Sem empresa"}

        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Badge>

            Cliente

          </Badge>

          {customer.estimated_value ? (
            <Badge
              variant="secondary"
            >
              {formatCurrency(
                customer.estimated_value
              )}
            </Badge>
          ) : null}

        </div>

      </div>

    </div>
  );
}