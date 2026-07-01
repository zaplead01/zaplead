"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/src/schemas/reset-password.schema";

import { useAuth } from "@/src/hooks/use-auth";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";

export function ResetPasswordForm() {
  const router = useRouter();

  const { updatePassword, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    const result = await updatePassword(data.password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Senha alterada com sucesso!");

    router.replace("/dashboard");
  }

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Redefinir senha
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Digite sua nova senha para acessar sua conta novamente.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8"
      >
        <FieldGroup>

          <Field>
            <FieldLabel>Nova senha</FieldLabel>

            <Input
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

          <Field>
            <FieldLabel>Confirmar senha</FieldLabel>

            <Input
              type="password"
              placeholder="********"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Salvando..."
              : "Salvar nova senha"}
          </Button>

        </FieldGroup>
      </form>
    </>
  );
}