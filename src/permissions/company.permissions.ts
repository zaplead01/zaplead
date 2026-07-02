export type CompanyRole =
  | "owner"
  | "admin"
  | "member";

export const CompanyPermissions = {
  canEditCompany(role: CompanyRole) {
    return role === "owner";
  },

  canInviteMembers(role: CompanyRole) {
    return role === "owner" || role === "admin";
  },

  canRemoveMembers(role: CompanyRole) {
    return role === "owner" || role === "admin";
  },

  canChangeRole(role: CompanyRole) {
    return role === "owner";
  },

  canManageSubscription(role: CompanyRole) {
    return role === "owner";
  },

  canDeleteCompany(role: CompanyRole) {
    return role === "owner";
  },
};