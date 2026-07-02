"use client";

import { useMemo } from "react";

import { useCompany } from "@/src/hooks/use-company";
import { CompanyPermissions } from "@/src/permissions/company.permissions";

export function useCompanyPermissions() {
  const { company } = useCompany();

  const role = company?.role ?? "member";

  return useMemo(
    () => ({
      role,

      canEditCompany:
        CompanyPermissions.canEditCompany(role),

      canInviteMembers:
        CompanyPermissions.canInviteMembers(role),

      canRemoveMembers:
        CompanyPermissions.canRemoveMembers(role),

      canChangeRole:
        CompanyPermissions.canChangeRole(role),

      canManageSubscription:
        CompanyPermissions.canManageSubscription(role),

      canDeleteCompany:
        CompanyPermissions.canDeleteCompany(role),
    }),
    [role]
  );
}