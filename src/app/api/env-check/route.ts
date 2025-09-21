import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const keys = [
    "DATABASE_URL",
    "DATABASE_URL_UNPOOLED",
    "PGHOST",
    "PGHOST_UNPOOLED",
    "PGUSER",
    "PGDATABASE",
    "PGPASSWORD",
    "POSTGRES_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_USER",
    "POSTGRES_HOST",
    "POSTGRES_PASSWORD",
    "POSTGRES_DATABASE",
    "POSTGRES_URL_NO_SSL",
    "POSTGRES_PRISMA_URL",
    "NEXT_PUBLIC_STACK_PROJECT_ID",
    "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY",
    "STACK_SECRET_SERVER_KEY",
    "NEXT_PUBLIC_GMB_URL",
  ] as const;

  const presence: Record<string, boolean> = {};
  for (const k of keys) presence[k] = !!process.env[k];

  return Response.json({ ok: true, env: presence });
}
