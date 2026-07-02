"use client";

import { useEffect, useState } from "react";

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

import { useCompany } from "@/src/hooks/use-company";

export function CompanyForm() {
  const {
    company,
    loading,
    saving,
    update,
  } = useCompany();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!company) return;

    setName(company.name ?? "");
    setEmail(company.email ?? "");
    setPhone(company.phone ?? "");
  }, [company]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await update({
      name,
      email,
      phone,
    });
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Carregando empresa...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Informações da Empresa
        </CardTitle>
      </CardHeader>

      <CardContent>

        <form onSubmit={handleSubmit}>

          <FieldGroup>

            <Field>
              <FieldLabel>
                Nome da Empresa
              </FieldLabel>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </Field>

            <Field>
              <FieldLabel>
                E-mail
              </FieldLabel>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </Field>

            <Field>
              <FieldLabel>
                Telefone
              </FieldLabel>

              <Input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </Field>

            <Field>
              <FieldLabel>
                Slug
              </FieldLabel>

              <Input
                value={company?.slug ?? ""}
                disabled
              />
            </Field>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={saving}
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
  );
}