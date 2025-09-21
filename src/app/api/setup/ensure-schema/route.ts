import prisma from "@/lib/prisma";

/*
Idempotent route: ensures required tables exist without running Prisma migrations.
Creates tables if missing using raw SQL. Safe to call multiple times.
*/
export async function GET() {
  try {
    // Create Client table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Client" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        "gmbPlaceId" TEXT NULL,
        "gmbReviewUrl" TEXT NULL,
        "websiteUrl" TEXT NULL,
        "contactEmail" TEXT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Create User table
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

    // Create Feedback table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Feedback" (
        id TEXT PRIMARY KEY,
        "clientId" TEXT NOT NULL REFERENCES "Client"(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        comments TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'web_rate_page',
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Create ReviewRequest table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ReviewRequest" (
        id TEXT PRIMARY KEY,
        "clientId" TEXT NOT NULL REFERENCES "Client"(id) ON DELETE CASCADE,
        "recipientEmail" TEXT NOT NULL,
        channel TEXT NOT NULL,
        status TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Basic indexes (if not already created by the unique constraints above)
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "User_clientId_idx" ON "User" ("clientId");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Feedback_clientId_idx" ON "Feedback" ("clientId");
    `);

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("ensure-schema error:", e);
    return Response.json({ ok: false, error: e?.message || "error" }, { status: 500 });
  }
}
