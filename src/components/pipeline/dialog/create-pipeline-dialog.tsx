"use client";

import { useState } from "react";
import { toast } from "sonner";

import { pipelineService } from "@/src/services/pipeline.service";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function CreatePipelineDialog({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      toast.error("Informe o nome do pipeline.");
      return;
    }

    try {
      setLoading(true);

      await pipelineService.create(name.trim());

      toast.success("Pipeline criado com sucesso!");

      setName("");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "PIPELINE_LIMIT"
      ) {
        // Aqui vamos abrir o modal de upgrade
        toast.error(
          "Seu plano atingiu o limite de pipelines."
        );
        return;
      }

      toast.error("Erro ao criar pipeline.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Criar Pipeline
          </DialogTitle>

          <DialogDescription>
            Organize seus clientes em um novo funil de vendas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-4">
          <Label htmlFor="name">
            Nome
          </Label>

          <Input
            id="name"
            placeholder="Ex: Vendas Imóveis"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleCreate}
            disabled={loading}
          >
            {loading
              ? "Criando..."
              : "Criar Pipeline"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}