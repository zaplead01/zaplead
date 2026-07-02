"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import { inviteRepository } from "@/src/repositories/invite.repository";
import { useInvite } from "@/src/hooks/use-invite";

type Props = {
  token: string;
};

export function InvitePageContent({
  token,
}: Props) {
  const router = useRouter();

  const { accept } = useInvite();

  const [invite, setInvite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] =
    useState(false);

  useEffect(() => {
    async function load() {
      const { data } =
        await inviteRepository.getByToken(token);

      setInvite(data);

      setLoading(false);
    }

    load();
  }, [token]);

  async function handleAccept() {
    try {
      setAccepting(true);

      await accept(token);

      router.push("/dashboard");
    } finally {
      setAccepting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!invite) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Convite inválido.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">

      <Card className="w-full max-w-md">

        <CardHeader>

          <CardTitle>
            Convite para empresa
          </CardTitle>

          <CardDescription>
            Você foi convidado para participar
            desta empresa no ZapLead.
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-6">

          <div>

            <p className="text-sm text-muted-foreground">
              E-mail
            </p>

            <p className="font-medium">
              {invite.email}
            </p>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Cargo
            </p>

            <p className="font-medium">
              {invite.role === "admin"
                ? "Administrador"
                : "Membro"}
            </p>

          </div>

          <Button
            className="w-full"
            disabled={accepting}
            onClick={handleAccept}
          >
            {accepting
              ? "Aceitando..."
              : "Aceitar convite"}
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}