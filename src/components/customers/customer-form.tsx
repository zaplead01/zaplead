"use client";



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCustomer } from "@/src/hooks/use-customer";

import { UpgradeModal } from "@/src/components/common/upgrade-modal";

import { PhoneInput } from "@/src/components/ui/phone-input";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type CustomerFormProps = {
  customerId?: string;
};


const LEAD_SOURCES = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Google",
  "Google Ads",
  "Site",
  "Indicação",
  "TikTok",
  "LinkedIn",
  "Marketplace",
  "E-mail",
  "Ligação",
];

export function CustomerForm({
  customerId,
}: CustomerFormProps) {
  const router = useRouter();
  

  const { customer } = useCustomer(customerId ?? "");

  const [isCustomSource, setIsCustomSource] = useState(false);

  const [upgradeOpen, setUpgradeOpen] =
  useState(false);

  const {
  control,
  register,
  handleSubmit,
  reset,
  setValue,
  watch,
  formState: {
    errors,
    isSubmitting,
  },
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

  const leadSource = watch("lead_source");

const selectedSource =
  LEAD_SOURCES.includes(leadSource)
    ? leadSource
    : leadSource
      ? "other"
      : "";
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

    setIsCustomSource(
  !!customer.lead_source &&
  !LEAD_SOURCES.includes(customer.lead_source)
);

  }, [customer, reset]);

 async function onSubmit(data: CustomerFormData) {
  const result = customerId
    ? await customerService.update(customerId, data)
    : await customerService.create(data);

  console.log("RESULT", result);

  if (!result.success) {
    if (
      "code" in result &&
      result.code === "CUSTOMER_LIMIT"
    ) {
      setUpgradeOpen(true);
      return;
    }

    toast.error(result.message);
    return;
  }

  toast.success(result.message);

  router.push("/clientes");
  router.refresh();
}
  return (
    <>
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

  <Controller
    control={control}
    name="phone"
    render={({ field }) => (
      <PhoneInput
        value={field.value ?? ""}
        onChange={field.onChange}
        placeholder="(11) 99999-9999"
      />
    )}
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
  <FieldLabel>Origem</FieldLabel>

  <Select
    value={
  isCustomSource
    ? "other"
    : leadSource || undefined
}
    onValueChange={(value) => {
  if (value === "other") {
    setIsCustomSource(true);

    setValue("lead_source", "", {
      shouldDirty: true,
    });
  } else {
    setIsCustomSource(false);

    setValue("lead_source", value, {
      shouldDirty: true,
    });
  }
}}
  >
    <SelectTrigger>
      <SelectValue placeholder="Selecione a origem" />
    </SelectTrigger>

    <SelectContent>
      {LEAD_SOURCES.map((source) => (
        <SelectItem
          key={source}
          value={source}
        >
          {source}
        </SelectItem>
      ))}

      <SelectItem value="other">
        Outra...
      </SelectItem>
    </SelectContent>
  </Select>

  {isCustomSource && (
    <Input
      className="mt-3"
      placeholder="Digite a origem"
      value={leadSource}
      onChange={(e) =>
        setValue("lead_source", e.target.value, {
          shouldDirty: true,
        })
      }
    />
  )}
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
                onClick={() =>
                  router.push("/clientes")
                }
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
   <UpgradeModal
  open={upgradeOpen}
  onOpenChange={setUpgradeOpen}
  title="Limite de clientes atingido"
  description="Seu plano permite cadastrar até 100 clientes. Faça upgrade para continuar utilizando o ZapLead sem limitações."
  onUpgrade={() => router.push("/dashboard/billing")}
/>
  </>  
    

  );
}