import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/src/lib/supabase/middleware";

const PUBLIC_ROUTES = [
  "/login",
  "/cadastro",
];

export async function middleware(
  request: NextRequest
) {
  const {
    response,
    user,
  } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (user && isPublicRoute) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};