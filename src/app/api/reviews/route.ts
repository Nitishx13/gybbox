import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const clientSlug = searchParams.get("clientSlug");
    const limit = Math.min(Number(searchParams.get("limit") || 20), 100);

    let clientId: string | undefined = undefined;

    if (session.role === "ADMIN") {
      if (clientSlug) {
        const client = await prisma.client.findUnique({ where: { slug: clientSlug } });
        if (!client) return Response.json({ ok: false, error: "Client not found" }, { status: 404 });
        clientId = client.id;
      }
    } else {
      // CLIENT role: restrict to their clientId
      if (!session.clientId) return Response.json({ ok: false, error: "No client scope" }, { status: 403 });
      clientId = session.clientId as string;
    }

    const where = clientId ? { clientId } : {};

    const [recent, counts] = await Promise.all([
      (prisma as any).feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        select: { id: true, rating: true, name: true, email: true, comments: true, createdAt: true, clientId: true },
      }) as any,
      (prisma as any).feedback.groupBy({
        by: ["rating"],
        where,
        _count: { _all: true },
      }) as any,
    ]);

    const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
    for (const row of counts) distribution[String(row.rating)] = row._count?._all || 0;

    const total = Object.values(distribution).reduce((a, b) => a + b, 0);
    const avg = total
      ? (1 * distribution["1"] + 2 * distribution["2"] + 3 * distribution["3"] + 4 * distribution["4"] + 5 * distribution["5"]) / total
      : 0;

    return Response.json({ ok: true, recent, stats: { distribution, total, average: avg } });
  } catch (e: any) {
    console.error("/api/reviews GET error:", e);
    return Response.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
