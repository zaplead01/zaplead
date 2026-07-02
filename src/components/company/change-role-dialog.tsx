"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  member: any | null;

  onSave: (
    id: string,
    role: "admin" | "member"
  ) => Promise<void>;
};

export function ChangeRoleDialog({
  open,
  onOpenChange,
  member,
  onSave,
}: Props) {
  const [role, setRole] = useState<
    "admin" | "member"
  >("member");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  async function handleSave() {
    if (!member) return;

    try {
      setSaving(true);

      await onSave(member.id, role);

      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Alterar cargo
          </DialogTitle>

          <DialogDescription>
            Escolha o novo cargo deste membro.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Select
            value={role}
            onValueChange={(value) =>
              setRole(
                value as "admin" | "member"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="admin">
                Administrador
              </SelectItem>

              <SelectItem value="member">
                Membro
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}