import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/*
Development bootstrap: ensures schema exists and creates an ADMIN user if none exists.
- No auth required, but ONLY runs in non-production environments.
- Uses env ADMIN_EMAIL and ADMIN_PASSWORD if provided; otherwise defaults.
*/
export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      return Response.json({ ok: false, error: "Disabled in production" }, { status: 403 });
    }

    // 1) Ensure schema exists (mirror of ensure-schema route)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Client" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        role TEXT NOT NULL,
        "clientId" TEXT NULL REFERENCES "Client"(id) ON DELETE SET NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "User_clientId_idx" ON "User" ("clientId");
    `);

    // 2) Create admin if none exists
    const existingAdmin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (existingAdmin) {
      return Response.json({ ok: true, message: "Admin already exists", admin: { email: existingAdmin.email } });
    }

    const email = process.env.ADMIN_EMAIL || "nitishx13@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "nitish@9899";
    const hash = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        role: "ADMIN",
      },
      select: { id: true, email: true, role: true },
    });

    return Response.json({ ok: true, admin });
  } catch (e: any) {
    console.error("bootstrap error:", e);
    return Response.json({ ok: false, error: e?.message || "error" }, { status: 500 });
  }
}
