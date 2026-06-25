"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useCustomer } from "@/src/hooks/use-customer";

import {
  customerSchema,
  CustomerFormData,
} from "@/src/schemas/customer.schema";

import { customerService } from "@/src/services/customer.service";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";

type CustomerFormProps = {
  customerId?: string;
};

export function CustomerForm({
  customerId,
}: CustomerFormProps) {
  const router = useRouter();
  const {
  customer,
} = useCustomer(customerId ?? "");
const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<CustomerFormData>({
  resolver: zodResolver(customerSchema),
  defaultValues: {
    full_name: "",
    company: "",
    phone: "",
    email: "",
    lead_source: "",
    estimated_value: undefined,
    notes: "",
  },
});

useEffect(() => {
  if (!customer) return;

  reset({
    full_name: customer.full_name,
    company: customer.company ?? "",
    phone: customer.phone ?? "",
    email: customer.email ?? "",
    lead_source: customer.lead_source ?? "",
    estimated_value: customer.estimated_value ?? undefined,
    notes: customer.notes ?? "",
  });
}, [customer, reset]);

  async function onSubmit(data: CustomerFormData) {
    console.log("ID:", customerId);
  console.log("DADOS:", data);
  const result = customerId
    ? await customerService.update(customerId, data)
    : await customerService.create(data);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(result.message);

  router.push("/clientes");
  router.refresh();
}

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
<div className="grid gap-5 sm:grid-cols-2">
  <Field>
    <FieldLabel htmlFor="full_name">
      Nome Completo
    </FieldLabel>

    <Input
      id="full_name"
      placeholder="Nome do cliente"
      {...register("full_name")}
    />

    {errors.full_name && (
      <p className="text-sm text-red-500">
        {errors.full_name.message}
      </p>
    )}
  </Field>

  <Field>
    <FieldLabel htmlFor="company">
      Empresa
    </FieldLabel>

    <Input
      id="company"
      placeholder="Nome da empresa"
      {...register("company")}
    />
  </Field>

  <Field>
    <FieldLabel htmlFor="phone">
      WhatsApp
    </FieldLabel>

    <Input
      id="phone"
      placeholder="(11) 99999-9999"
      {...register("phone")}
    />
  </Field>

  <Field>
    <FieldLabel htmlFor="email">
      E-mail
    </FieldLabel>

    <Input
      id="email"
      type="email"
      placeholder="cliente@email.com"
      {...register("email")}
    />

    {errors.email && (
      <p className="text-sm text-red-500">
        {errors.email.message}
      </p>
    )}
  </Field>

  <Field>
    <FieldLabel htmlFor="lead_source">
      Origem
    </FieldLabel>

    <Input
      id="lead_source"
      placeholder="WhatsApp"
      {...register("lead_source")}
    />
  </Field>

  <Field>
    <FieldLabel htmlFor="estimated_value">
      Valor estimado
    </FieldLabel>

    <Input
      id="estimated_value"
      type="number"
      placeholder="0,00"
      {...register("estimated_value", {
        valueAsNumber: true,
      })}
    />
  </Field>
</div>

<Field>
  <FieldLabel htmlFor="notes">
    Observações
  </FieldLabel>

  <Textarea
    id="notes"
    rows={4}
    placeholder="Anotações sobre o cliente..."
    {...register("notes")}
  />
</Field>

<div className="flex justify-end gap-3">
  <Button
    type="button"
    variant="outline"
    onClick={() => router.push("/clientes")}
  >
    Cancelar
  </Button>

  <Button
    type="submit"
    disabled={isSubmitting}
  >
    {isSubmitting
  ? customerId
    ? "Atualizando..."
    : "Salvando..."
  : customerId
    ? "Atualizar Cliente"
    : "Salvar Cliente"}
  </Button>
</div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    
  );
}
