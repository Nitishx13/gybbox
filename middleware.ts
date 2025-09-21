import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "gbx_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET || process.env.STACK_SECRET_SERVER_KEY;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function getSession(req: NextRequest): Promise<null | { role: "ADMIN" | "CLIENT"; clientId?: string; sub: string; email: string }> {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const secret = getSecret();
    if (!token || !secret) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload as any;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths
  const publicPaths = ["/", "/login", "/rate", "/thanks", "/_next", "/api/env-check"];
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const session = await getSession(req);

  // Protect /dashboard and subpaths
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Role gates
    if (pathname.startsWith("/dashboard/admin")) {
      if (session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard/client", req.url));
      }
    }
    if (pathname.startsWith("/dashboard/client")) {
      if (session.role !== "CLIENT" && session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // If you later scope client data by clientId, you can enforce more rules here
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
