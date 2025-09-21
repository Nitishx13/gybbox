import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

/*
POST /api/admin/create-client
Body: {
  clientName: string,
  clientSlug: string, // unique
  userEmail: string,
  userPassword: string,
  gmbPlaceId?: string,
  gmbReviewUrl?: string,
  websiteUrl?: string,
  contactEmail?: string,
}
Creates a Client and a CLIENT role User assigned to that client.
Requires ADMIN session.
*/
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { clientName, clientSlug, userEmail, userPassword, gmbPlaceId, gmbReviewUrl, websiteUrl, contactEmail } = await req.json();
  if (!clientName || !clientSlug || !userEmail || !userPassword) {
    return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(userPassword, 10);

  try {
    // Ensure required columns exist (tolerant to already-existing state)
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Client" ADD COLUMN IF NOT EXISTS "gmbPlaceId" TEXT;
      `);
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Client" ADD COLUMN IF NOT EXISTS "gmbReviewUrl" TEXT;
      `);
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Client" ADD COLUMN IF NOT EXISTS "websiteUrl" TEXT;
      `);
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Client" ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;
      `);
    } catch (e) {
      console.warn("create-client: column ensure skipped/failed:", (e as any)?.message || e);
    }

    // SEQUENTIAL (no transaction) to avoid pool wait/timeout issues on serverless/low-conn DBs
    // 1) Create client (with extended fields, fallback to minimal on older schema)
    let client;
    try {
      client = await (prisma as any).client.create({
        data: {
          name: clientName,
          slug: clientSlug,
          ...(gmbPlaceId ? { gmbPlaceId } : {} as any),
          ...(gmbReviewUrl ? { gmbReviewUrl } : {} as any),
          ...(websiteUrl ? { websiteUrl } : {} as any),
          ...(contactEmail ? { contactEmail } : {} as any),
        } as any,
      } as any);
    } catch (innerErr: any) {
      console.warn("create-client fallback to minimal fields:", innerErr?.message || innerErr);
      client = await prisma.client.create({ data: { name: clientName, slug: clientSlug } });
    }

    // 2) Create user referencing the client
    let user;
    try {
      user = await (prisma as any).user.create({
        data: {
          email: userEmail,
          passwordHash,
          role: "CLIENT",
          clientId: (client as any).id,
        },
        select: { id: true, email: true, role: true, clientId: true },
      });
    } catch (userErr: any) {
      // Best-effort rollback: delete the client we just created
      try {
        await prisma.client.delete({ where: { id: (client as any).id } });
      } catch (cleanupErr) {
        console.error("create-client cleanup failed:", cleanupErr);
      }
      throw userErr;
    }

    return Response.json({ ok: true, client, user });
  } catch (e: any) {
    console.error("/api/admin/create-client error:", e?.code, e?.message || e);
    if (e?.code === "P2002") {
      return Response.json({ ok: false, error: "Unique constraint failed (email or slug)" }, { status: 409 });
    }
    return Response.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
