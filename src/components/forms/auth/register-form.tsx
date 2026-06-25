"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  registerSchema,
  RegisterFormData,
} from "@/src/schemas/auth.schema";

import { useAuth } from "@/src/hooks/use-auth";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export function RegisterForm() {
  const { register, loading } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      business: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    const result = await register(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(
      "Conta criada com sucesso! Faça login para continuar."
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Crie sua conta grátis
      </h2>

      <p className="mt-1.5 text-sm text-muted-foreground">
        Comece a organizar seus leads em poucos minutos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fullName">
              Nome completo
            </FieldLabel>

            <Input
              id="fullName"
              placeholder="Seu nome"
              {...formRegister("fullName")}
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="business">
              Empresa
            </FieldLabel>

            <Input
              id="business"
              placeholder="Nome do negócio"
              {...formRegister("business")}
            />

            {errors.business && (
              <p className="mt-1 text-sm text-red-500">
                {errors.business.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">
              WhatsApp
            </FieldLabel>

            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              {...formRegister("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">
              E-mail
            </FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              {...formRegister("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">
              Senha
            </FieldLabel>

            <Input
              id="password"
              type="password"
              placeholder="********"
              {...formRegister("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="terms" required />

            <FieldLabel
              htmlFor="terms"
              className="font-normal"
            >
              Aceito os termos de uso.
            </FieldLabel>
          </Field>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já possui conta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </>
  );
}