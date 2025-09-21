import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/*
Reset a user's password (admin override) using setup token.
Must include header: x-setup-token: <process.env.SETUP_TOKEN>
Body: { email: string, newPassword: string }
*/
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-setup-token");
  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { email, newPassword } = await req.json();
  if (!email || !newPassword) return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ ok: false, error: "User not found" }, { status: 404 });

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email }, data: { passwordHash: hash } });

  return Response.json({ ok: true });
}
