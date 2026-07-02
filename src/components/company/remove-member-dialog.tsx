"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  member: any | null;

  onRemove: (id: string) => Promise<void>;
};

export function RemoveMemberDialog({
  open,
  onOpenChange,
  member,
  onRemove,
}: Props) {
  async function handleRemove() {
    if (!member) return;

    await onRemove(member.id);

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Remover membro
          </DialogTitle>

          <DialogDescription>
            Tem certeza que deseja remover{" "}
            <strong>
              {member?.user_profiles?.full_name}
            </strong>{" "}
            da empresa?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            onClick={handleRemove}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}