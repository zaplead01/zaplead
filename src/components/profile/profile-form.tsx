"use client";

import { useEffect, useMemo, useState } from "react";
import { Shield } from "lucide-react";

import { useAuth } from "@/src/hooks/use-auth";

import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { PhoneInput } from "@/src/components/ui/phone-input";
import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

import { useCurrentUser } from "@/src/hooks/use-current-user";
import { useProfile } from "@/src/hooks/use-profile";

export function ProfileForm() {
 const { user } = useCurrentUser();
const { forgotPassword } = useAuth();

  const {
    profile,
    loading,
    saving,
    update,
  } = useProfile();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.full_name ?? "");
    setPhone(profile.phone ?? "");
  }, [profile]);

  const initials = useMemo(() => {
    return (
      profile?.full_name
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || "U"
    );
  }, [profile]);

  const hasChanges =
    fullName !== (profile?.full_name ?? "") ||
    phone !== (profile?.phone ?? "");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await update({
      full_name: fullName,
      phone,
    });
  }

  if (loading) {
    return (
      <Card className="max-w-3xl">
        <CardContent className="py-10 text-center text-muted-foreground">
          Carregando perfil...
        </CardContent>
      </Card>
    );
  }
async function handleResetPassword() {
  if (!user?.email) return;

  const result = await forgotPassword(user.email);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(
    "Enviamos um e-mail para redefinição da senha."
  );
}
  return (
    <div className="max-w-3xl space-y-6">

      <Card>
        <CardContent className="flex flex-col items-center py-8">

          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-xl font-semibold">
            {profile?.full_name}
          </h2>

          <p className="text-sm text-muted-foreground">
            {user?.email}
          </p>

        </CardContent>
      </Card>

      <Card>

        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit}>

            <FieldGroup>

              <Field>
                <FieldLabel>Nome Completo</FieldLabel>

                <Input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>

                <Input
                  value={user?.email ?? ""}
                  disabled
                />
              </Field>

              <Field>
  <FieldLabel>Telefone</FieldLabel>

  <PhoneInput
    value={phone}
    onChange={setPhone}
  />
</Field>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={!hasChanges || saving}
                >
                  {saving
                    ? "Salvando..."
                    : "Salvar Alterações"}
                </Button>
              </div>

            </FieldGroup>

          </form>

        </CardContent>

      </Card>

      <Card>

        <CardHeader className="flex flex-row items-center gap-2">
          <Shield className="h-5 w-5" />
          <CardTitle>Segurança</CardTitle>
        </CardHeader>

        <CardContent>

          <p className="mb-4 text-sm text-muted-foreground">
            Proteja sua conta alterando sua senha sempre que necessário.
          </p>

          <Button
    type="button"
    variant="outline"
    onClick={handleResetPassword}
>
    Alterar Senha
</Button>

        </CardContent>

      </Card>

    </div>
  );
}