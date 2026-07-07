"use client";

import {
  Crown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  onUpgrade?: () => void;
};

const premiumFeatures = [
  "Clientes ilimitados",
  "Usuários ilimitados",
  "Pipelines ilimitados",
  "Relatórios Premium",
  "Tags",
  "API",
  "Integrações",
  "Automações",
];

export function UpgradeModal({
  open,
  onOpenChange,
  title,
  description,
  onUpgrade,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">

            <Crown className="h-8 w-8 text-amber-500" />

          </div>

          <DialogTitle className="text-center text-2xl">
            {title}
          </DialogTitle>

          <DialogDescription className="text-center">
            {description}
          </DialogDescription>

        </DialogHeader>

        <div className="my-6 rounded-xl border bg-muted/30 p-5">

          <div className="mb-4 flex items-center gap-2">

            <Sparkles className="h-5 w-5 text-primary" />

            <span className="font-semibold">
              O que você desbloqueia no Premium
            </span>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            {premiumFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                <span className="text-sm">
                  {feature}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Agora não
          </Button>

          <Button onClick={onUpgrade}>
            Fazer Upgrade
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}