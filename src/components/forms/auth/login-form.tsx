"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  loginSchema,
  LoginFormData,
} from "@/src/schemas/auth.schema";

import { useAuth } from "@/src/hooks/use-auth";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export function LoginForm() {
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    const result = await login(data.email, data.password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Login realizado com sucesso!");
  }

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Bem-vindo de volta
      </h2>

      <p className="mt-1.5 text-sm text-muted-foreground">
        Entre para acessar sua conta.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              {...register("email")}
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
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="remember" />

            <FieldLabel
              htmlFor="remember"
              className="font-normal"
            >
              Manter conectado
            </FieldLabel>
          </Field>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Ainda não possui conta?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </>
  );
}