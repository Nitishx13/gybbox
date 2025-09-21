import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { clientSlug, rating, name, email, comments } = await req.json();

    if (!rating || !name || !email || !comments) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Resolve client by slug if provided; otherwise may be undefined
    let clientId: string | undefined;
    if (clientSlug) {
      const client = await prisma.client.findUnique({ where: { slug: clientSlug } });
      if (!client) return Response.json({ ok: false, error: "Client not found" }, { status: 404 });
      clientId = client.id;
    }

    // Build data with conditional relation connect when clientId is available
    const data: Record<string, unknown> = {
      rating: Number(rating),
      name,
      email,
      comments,
      source: "web_rate_page",
    };
    if (clientId) {
      (data as any).client = { connect: { id: clientId } };
    }

    try {
      await prisma.feedback.create({ data } as any);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      // If schema requires a client relation, and clientSlug not provided, surface a clear 400
      if (message?.includes("Argument `client` is missing")) {
        return Response.json({ ok: false, error: "Client is required for feedback. Provide clientSlug." }, { status: 400 });
      }
      throw e;
    }

    return Response.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("/api/feedback POST error:", message);
    return Response.json({ ok: false, error: message || "Unexpected error" }, { status: 500 });
  }
}
