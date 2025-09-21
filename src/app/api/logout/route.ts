import { NextRequest } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST(_req: NextRequest) {
  await destroySession();
  return Response.json({ ok: true });
}
