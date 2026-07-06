"use client";

import {
  Crown,
  CheckCircle2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UpgradeModal({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <Crown className="h-8 w-8 text-amber-500" />
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl">
            Você atingiu o limite do plano FREE
          </DialogTitle>

          <DialogDescription className="pt-2 text-base">
            Continue crescendo com recursos
            ilimitados e funcionalidades
            exclusivas do ZapLead Premium.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">

          <Item>
            Clientes ilimitados
          </Item>

          <Item>
            Múltiplos usuários
          </Item>

          <Item>
            Pipelines ilimitados
          </Item>

          <Item>
            Relatórios avançados
          </Item>

          <Item>
            Dashboard Premium
          </Item>

          <Item>
            Suporte prioritário
          </Item>

        </div>

        <div className="mt-6 flex gap-3">

          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Agora não
          </Button>

          <Button
            className="flex-1"
            onClick={() => {
              // futuramente:
              // router.push("/billing")
            }}
          >
            Fazer Upgrade
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}

function Item({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">

      <CheckCircle2 className="h-5 w-5 text-green-500" />

      <span>{children}</span>

    </div>
  );
}