"use client";

import { Customer } from "@/src/types/customer/customer";

import {
  Sheet,
  SheetContent,
} from "@/src/components/ui/sheet";

import { CustomerHeader } from "./customer-header";
import { CustomerKpis } from "./customer-kpis";
import { CustomerContact } from "./customer-contact";
import { CustomerNegotiation } from "./customer-negotiation";
import { CustomerNotes } from "./customer-notes";
import { CustomerTimeline } from "./customer-timeline";
import { CustomerActions } from "./customer-actions";

type Props = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CustomerSheet({
  customer,
  open,
  onOpenChange,
}: Props) {
  if (!customer) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
   <SheetContent
  width="1000px"
  className="overflow-y-auto p-0"
>
       <CustomerHeader customer={customer} />

<div className="p-8">

  <div className="grid grid-cols-12 gap-6">

    {/* Coluna Esquerda */}

    <div className="col-span-5 space-y-6">

      <CustomerContact
        customer={customer}
      />

      <CustomerNegotiation
        customer={customer}
      />

    </div>

    {/* Coluna Direita */}

    <div className="col-span-7 space-y-6">

      <CustomerKpis
        customer={customer}
      />

      <CustomerTimeline />

    </div>

  </div>

  <div className="mt-6">

    <CustomerNotes
      customer={customer}
    />

  </div>

  <div className="mt-6">

    <CustomerActions
      customer={customer}
    />

  </div>

</div>
      </SheetContent>
    </Sheet>
  );
}