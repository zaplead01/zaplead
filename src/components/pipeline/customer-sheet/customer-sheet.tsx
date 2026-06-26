"use client";

import { Customer } from "@/src/types/customer/customer";

import { customerService } from "@/src/services/customer.service";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
} from "@/src/components/ui/sheet";

import { useEffect, useState } from "react";
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

const [editing, setEditing] = useState(false);

const [form, setForm] = useState({
  lead_source:
  customer.lead_source ?? "",
  full_name: customer.full_name,
  company: customer.company ?? "",
  phone: customer.phone ?? "",
  email: customer.email ?? "",
  estimated_value:
    customer.estimated_value ?? 0,
  notes: customer.notes ?? "",
});

useEffect(() => {
  setEditing(false);

  setForm({
    lead_source:
  customer.lead_source ?? "",
    full_name: customer.full_name,
    company: customer.company ?? "",
    phone: customer.phone ?? "",
    email: customer.email ?? "",
    estimated_value:
      customer.estimated_value ?? 0,
    notes: customer.notes ?? "",
  });
}, [customer]);

async function handleSave() {
  if (!customer) return;

  const result = await customerService.update(
    customer.id,
    form
  );

  if (!result.success) {
    toast.error(result.error);
    return;
  }

  toast.success("Cliente atualizado!");

  setEditing(false);
}

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
  editing={editing}
  form={form}
  setForm={setForm}
/>

      <CustomerNegotiation
  customer={customer}
  editing={editing}
  form={form}
  setForm={setForm}
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
  editing={editing}
  form={form}
  setForm={setForm}
/>

  </div>

  <div className="mt-6">

<CustomerActions
  customer={customer}
  editing={editing}
  onEdit={() => setEditing(true)}
  onCancel={() => setEditing(false)}
  onSave={handleSave}
/>

  </div>

</div>
      </SheetContent>
    </Sheet>
  );



  
}