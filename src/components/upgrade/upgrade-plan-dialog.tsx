"use client";

import Link from "next/link";
import {
  Crown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;
};

export function UpgradePlanDialog({
  open,
  onOpenChange,
  title,
  description,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Crown className="h-8 w-8 text-primary" />
        </div>

        <DialogHeader className="text-center">

          <DialogTitle className="text-2xl">
            {title}
          </DialogTitle>

          <DialogDescription className="mt-2 text-base">
            {description}
          </DialogDescription>

        </DialogHeader>

        <div className="mt-6 rounded-2xl border bg-muted/30 p-6">

          <h3 className="mb-5 text-lg font-semibold">
            Com o plano Pro você terá:
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Clientes ilimitados
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Até 2 usuários
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Relatórios Premium
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Etiquetas
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Suporte prioritário
            </div>

          </div>

        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Button
            className="flex-1"
            size="lg"
            asChild
          >
            <Link href="/planos">
              Fazer Upgrade

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Agora não
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}