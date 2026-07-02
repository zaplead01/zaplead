"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/src/components/ui/select";

import { useCompanyInvites } from "@/src/hooks/use-company-invites";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InviteMemberDialog({
  open,
  onOpenChange,
}: Props) {
  const { create, saving } = useCompanyInvites();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">(
    "member"
  );

  async function handleSubmit() {
    if (!email.trim()) return;

    await create(email.trim(), role);

    setEmail("");
    setRole("member");

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
            Convidar membro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>E-mail</Label>

            <Input
              type="email"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Cargo</Label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(value as "admin" | "member")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="member">
                  Membro
                </SelectItem>

                <SelectItem value="admin">
                  Administrador
                </SelectItem>
              </SelectContent>
            </Select>

          </div>

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
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving
              ? "Enviando..."
              : "Enviar convite"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}