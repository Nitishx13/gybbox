import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/*
POST /api/forgot/reset
Body: { email: string, newPassword: string, token: string }
Verifies token against process.env.SETUP_TOKEN and resets password.
Note: This is a simple, manual-reset flow suitable for internal/admin-assisted resets.
For production-grade flow, implement email-based one-time tokens with expiry stored in DB.
*/
export async function POST(req: NextRequest) {
  try {
    const { email, newPassword, token } = await req.json();
    if (!email || !newPassword || !token) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
      return Response.json({ ok: false, error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return Response.json({ ok: false, error: "User not found" }, { status: 404 });

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { passwordHash: hash } });

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("/api/forgot/reset error:", e);
    return Response.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
