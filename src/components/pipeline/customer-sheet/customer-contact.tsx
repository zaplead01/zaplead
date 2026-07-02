"use client";

import {
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import { Customer } from "@/src/types/customer/customer";
import { Input } from "@/src/components/ui/input";

import { PhoneInput } from "@/src/components/ui/phone-input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { CustomerInfoCard } from "./customer-info-card";

type Props = {
  customer: Customer;

  editing: boolean;

  form: {
    company: string;
    phone: string;
    email: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

export function CustomerContact({
  customer,
  editing,
  form,
  setForm,
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
          value={editing ? (
  <PhoneInput
  value={form.phone}
  onChange={(value) =>
    setForm((prev) => ({
      ...prev,
      phone: value,
    }))
  }
  
/>
) : (
  customer.phone || "-"
)}
        />

        <CustomerInfoCard
          icon={<Mail size={18} />}
          title="Email"
          value={editing ? (
  <Input
    type="email"
    value={form.email}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        email: e.target.value,
      }))
    }
  />
) : (
  customer.email || "-"
)}
        />

        <CustomerInfoCard
          icon={<Building2 size={18} />}
          title="Empresa"
          value={editing ? (
  <Input
    value={form.company}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        company: e.target.value,
      }))
    }
  />
) : (
  customer.company || "-"
)}
        />

      </CardContent>

    </Card>
  );
}