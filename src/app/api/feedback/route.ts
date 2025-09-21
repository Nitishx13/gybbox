import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { clientSlug, rating, name, email, comments } = await req.json();

    if (!rating || !name || !email || !comments) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Resolve client by slug if provided; otherwise allow null (optional)
    let clientId: string | null = null;
    if (clientSlug) {
      const client = await prisma.client.findUnique({ where: { slug: clientSlug } });
      if (!client) return Response.json({ ok: false, error: "Client not found" }, { status: 404 });
      clientId = client.id;
    }

    await (prisma as any).feedback.create({
      data: {
        clientId: clientId as any, // Schema includes Feedback.clientId as String; will require migration
        rating: Number(rating),
        name,
        email,
        comments,
        source: "web_rate_page",
      },
    } as any);

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("/api/feedback POST error:", e);
    return Response.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
