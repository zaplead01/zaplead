"use client";

import { useCurrentUser as useCurrentUserContext } from "@/src/context/auth-context";

export function useCurrentUser() {
  return useCurrentUserContext();
}