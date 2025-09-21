import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientTable } from "@/components/client-table";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminClientsPage() {
  const clients = await (prisma as any).client.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, slug: true, createdAt: true, websiteUrl: true },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Link href="/dashboard/admin/clients/new" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-dark">New Client</Link>
        </div>
        <ClientTable clients={clients} />
      </CardContent>
    </Card>
  );
}
