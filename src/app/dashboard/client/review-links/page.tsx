import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import ReviewLinksClient from "./client";

export const dynamic = "force-dynamic";

export default async function ReviewLinksPage() {
  const session = await getSession();
  if (!session) return null;
  const client = session.clientId
    ? await prisma.client.findUnique({ where: { id: session.clientId }, select: { slug: true } })
    : null;
  return <ReviewLinksClient clientSlug={client?.slug || undefined} />;
}
