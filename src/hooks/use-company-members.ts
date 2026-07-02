"use client";

import { useEffect, useState } from "react";

import { companyService } from "@/src/services/company.service";
import { companyMembersService } from "@/src/services/company-members.service";

import { useCurrentUser } from "./use-current-user";

export function useCompanyMembers() {
  const { user } = useCurrentUser();

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!user) return;

    setLoading(true);

    try {
      const company =
        await companyService.getCurrent(user.id);

      if (!company) {
        setMembers([]);
        return;
      }

      const data =
        await companyMembersService.getMembers(
          company.id
        );

      setMembers(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [user]);

  return {
    members,
    loading,
    reload: load,
  };
}