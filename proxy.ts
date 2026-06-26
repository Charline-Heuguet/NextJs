import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  AB_PREFETCH_COOKIE,
  parseAbPrefetchVariant,
  pickRandomAbVariant,
} from "@/lib/ab-test";

function applyAbPrefetchCookie(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const forced = parseAbPrefetchVariant(
    request.nextUrl.searchParams.get("ab_prefetch"),
  );
  const existing = parseAbPrefetchVariant(
    request.cookies.get(AB_PREFETCH_COOKIE)?.value,
  );
  const variant = forced ?? existing ?? pickRandomAbVariant();

  if (forced || !existing) {
    response.cookies.set(AB_PREFETCH_COOKIE, variant, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token || token.role !== "ADMIN") {
      response = NextResponse.redirect(new URL("/", request.url));
    }
  }

  return applyAbPrefetchCookie(request, response);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
