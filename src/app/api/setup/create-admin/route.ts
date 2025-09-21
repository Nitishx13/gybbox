import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/*
One-time setup route to create an ADMIN user.
Must include header: x-setup-token: <process.env.SETUP_TOKEN>
Body: { email: string, password: string }
*/
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-setup-token");
  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { email, password } = await req.json();
  if (!email || !password) return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return Response.json({ ok: false, error: "Email already in use" }, { status: 409 });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hash, role: "ADMIN" },
    select: { id: true, email: true, role: true },
  });

  return Response.json({ ok: true, user });
}
