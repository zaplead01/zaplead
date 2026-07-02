"use client";

import { useState } from "react";

import { useOrganizationMembers } from "@/src/hooks/use-organization-members";

import { ChangeRoleDialog } from "./change-role-dialog";useCompanyInvites

import { RemoveMemberDialog } from "./remove-member-dialog";

import {
  Crown,
  Shield,
  User,
  Mail,
  X,
  MoreVertical,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { useCompanyMembers } from "@/src/hooks/use-company-members";
import { useCompanyInvites } from "@/src/hooks/use-company-invites";
import { useCompanyPermissions } from "@/src/hooks/use-company-permissions";

import { InviteMemberDialog } from "./invite-member-dialog";

export function MembersCard() {
  const { members, loading } = useCompanyMembers();

  const {
    invites,
    loading: invitesLoading,
    saving,
    create,
    cancel,
  } = useCompanyInvites();

  const {
  updateRole,
  remove,
} = useOrganizationMembers();

const [selectedMember, setSelectedMember] =
  useState<any>(null);

const [changeRoleOpen, setChangeRoleOpen] =
  useState(false);

  const {
    canInviteMembers,
    canChangeRole,
    canRemoveMembers,
  } = useCompanyPermissions();

  const [removeOpen, setRemoveOpen] =
  useState(false);

  const [open, setOpen] = useState(false);

  function getRole(role: string) {
    switch (role) {
      case "owner":
        return {
          label: "Proprietário",
          icon: (
            <Crown className="size-4 text-amber-500" />
          ),
        };

      case "admin":
        return {
          label: "Administrador",
          icon: (
            <Shield className="size-4 text-blue-500" />
          ),
        };

      default:
        return {
          label: "Membro",
          icon: (
            <User className="size-4 text-muted-foreground" />
          ),
        };
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Membros</CardTitle>

          <CardDescription>
            Pessoas que fazem parte da empresa.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando membros...
            </p>
          ) : (
            <div className="space-y-4">
              {members.map((member: any) => {
                const profile = member.user_profiles;
                const role = getRole(member.role);

                const initials =
                  profile?.full_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() ?? "?";

                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">
                          {profile?.full_name}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          {role.icon}
                          {role.label}
                        </div>
                      </div>
                    </div>

                    {(canChangeRole ||
                      canRemoveMembers) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {canChangeRole && (
                            <DropdownMenuItem
  onClick={() => {
    setSelectedMember(member);
    setChangeRoleOpen(true);
  }}
>
  Alterar cargo
</DropdownMenuItem>
                          )}

                          {canRemoveMembers && (
                            <DropdownMenuItem
  className="text-red-600"
  onClick={() => {
  setSelectedMember(member);
  setRemoveOpen(true);
}}
>
  Remover membro
</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                );
              })}

              {!invitesLoading &&
                invites.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="mb-3 text-sm font-medium">
                      Convites pendentes
                    </p>

                    <div className="space-y-2">
                      {invites.map((invite: any) => (
                        <div
                          key={invite.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Mail className="size-4 text-muted-foreground" />

                            <div>
                              <p className="font-medium">
                                {invite.email}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {invite.role ===
                                "admin"
                                  ? "Administrador"
                                  : "Membro"}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              cancel(invite.id)
                            }
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {canInviteMembers && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(true)}
                >
                  Convidar membro
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <InviteMemberDialog
        open={open}
        onOpenChange={setOpen}
        saving={saving}
        onCreate={create}
      />

      <ChangeRoleDialog
  open={changeRoleOpen}
  onOpenChange={setChangeRoleOpen}
  member={selectedMember}
  onSave={updateRole}
/>

<RemoveMemberDialog
  open={removeOpen}
  onOpenChange={setRemoveOpen}
  member={selectedMember}
  onRemove={remove}
/>

    </>
  );
}