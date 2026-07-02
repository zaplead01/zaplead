import { NextResponse } from "next/server";

export function ensureMemberExists(member: any) {
  if (!member) {
    return NextResponse.json(
      {
        error: "Membro não encontrado.",
      },
      {
        status: 404,
      }
    );
  }

  return null;
}

export function ensureNotOwner(member: any) {
  if (member.role === "owner") {
    return NextResponse.json(
      {
        error:
          "Esta ação não pode ser realizada no proprietário.",
      },
      {
        status: 403,
      }
    );
  }

  return null;
}

export function ensureSameOrganization(
  member: any,
  organizationId: string
) {
  if (
    member.organization_id !== organizationId
  ) {
    return NextResponse.json(
      {
        error:
          "Este membro não pertence à sua empresa.",
      },
      {
        status: 403,
      }
    );
  }

  return null;
}

export function ensureNotYourself(
  member: any,
  userId: string
) {
  if (member.user_id === userId) {
    return NextResponse.json(
      {
        error:
          "Você não pode realizar esta ação em sua própria conta.",
      },
      {
        status: 403,
      }
    );
  }

  return null;
}