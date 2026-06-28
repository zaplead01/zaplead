"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Customer } from "@/src/types/customer/customer";


import { customerService } from "@/src/services/customer.service";

import {
  Sheet,
  SheetContent,
} from "@/src/components/ui/sheet";
import { CustomerFollowUp } from "./customer-follow-up";
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
  onUpdated?: (customer: Customer) => void;
  
};

export function CustomerSheet({
  customer,
  open,
  onOpenChange,
  onUpdated,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    company: "",
    phone: "",
    email: "",
    estimated_value: 0,
    lead_source: "",
    notes: "",
    next_follow_up_at: "",
  });
const [timelineKey, setTimelineKey] = useState(0);
  useEffect(() => {
    if (!customer) return;

    setEditing(false);
    

    setForm({
      full_name: customer.full_name,
      company: customer.company ?? "",
      phone: customer.phone ?? "",
      email: customer.email ?? "",
      estimated_value: customer.estimated_value ?? 0,
      lead_source: customer.lead_source ?? "",
      notes: customer.notes ?? "",
next_follow_up_at:
  customer.next_follow_up_at
    ? new Date(customer.next_follow_up_at)
        .toISOString()
        .slice(0, 16)
    : "",

    });
  }, [customer]);

  if (!customer) return null;
  const currentCustomer = customer;

  async function handleSave() {
    const result = await customerService.update(
      currentCustomer.id,
      form
    );
    

    if (!result.success || !result.data) {
      toast.error(result.message);
      return;
    }

    onUpdated?.(result.data);

    toast.success(result.message);

    setEditing(false);

    setTimelineKey((prev) => prev + 1);
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

              <CustomerFollowUp
  customer={currentCustomer}
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

<CustomerTimeline
  key={timelineKey}
  customerId={currentCustomer.id}
/>

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