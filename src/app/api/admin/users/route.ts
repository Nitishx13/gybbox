import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/users
// Admin-only list of users (id, email, role, clientId, createdAt)
export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, clientId: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ ok: true, users });
}
