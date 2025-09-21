import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ ok: false, error: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    await createSession({
      sub: user.id,
      role: user.role,
      clientId: user.clientId,
      email: user.email,
    });

    return Response.json({ ok: true, role: user.role });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Unexpected error";
    // Surface common setup issues for easier debugging
    if (msg.includes("AUTH_SECRET not set")) {
      return Response.json({ ok: false, error: "Server misconfigured: AUTH_SECRET is not set." }, { status: 500 });
    }
    console.error("/api/login error:", e);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
