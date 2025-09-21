import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

/*
Admin-only diagnostic: list users (id, email, role, clientId).
Requires header x-setup-token matching process.env.SETUP_TOKEN
*/
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-setup-token");
  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, clientId: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ ok: true, users });
}
