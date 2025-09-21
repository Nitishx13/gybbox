import { cookies } from "next/headers";
import { SignJWT, jwtVerify, JWTPayload } from "jose";

const COOKIE_NAME = "gbx_session";

export type Session = {
  sub: string; // user id
  role: "ADMIN" | "CLIENT";
  clientId?: string | null;
  email: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET || process.env.STACK_SECRET_SERVER_KEY;
  if (!secret) throw new Error("AUTH_SECRET not set");
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: Session, expiresIn = "7d") {
  const token = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as Session;
  } catch {
    return null;
  }
}
