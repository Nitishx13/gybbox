import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, client } as any);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { name, slug, gmbPlaceId, gmbReviewUrl, websiteUrl, contactEmail } = body || {};
  try {
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (slug !== undefined) data.slug = slug;
    if (gmbPlaceId !== undefined) data.gmbPlaceId = gmbPlaceId;
    if (gmbReviewUrl !== undefined) data.gmbReviewUrl = gmbReviewUrl;
    if (websiteUrl !== undefined) data.websiteUrl = websiteUrl;
    if (contactEmail !== undefined) data.contactEmail = contactEmail;

    const updated = await (prisma as any).client.update({ where: { id: params.id }, data });
    return Response.json({ ok: true, client: updated });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return Response.json({ ok: false, error: "Unique constraint failed (slug)" }, { status: 409 });
    }
    console.error("PATCH /api/admin/client/[id] error:", e);
    return Response.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
