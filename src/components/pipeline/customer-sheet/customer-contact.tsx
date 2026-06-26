"use client";

import {
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { CustomerInfoCard } from "./customer-info-card";

type Props = {
  customer: Customer;
};

export function CustomerContact({
  customer,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">

      <CardHeader>

        <CardTitle>

          Contato

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <CustomerInfoCard
          icon={<Phone size={18} />}
          title="Telefone"
          value={customer.phone}
        />

        <CustomerInfoCard
          icon={<Mail size={18} />}
          title="Email"
          value={customer.email}
        />

        <CustomerInfoCard
          icon={<Building2 size={18} />}
          title="Empresa"
          value={customer.company}
        />

      </CardContent>

    </Card>
  );
}