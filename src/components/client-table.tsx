import Link from "next/link";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";

type ClientRow = { id: string; name: string; slug: string; createdAt?: Date; websiteUrl?: string | null };

export function ClientTable({ clients }: { clients: ClientRow[] }) {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Client</TH>
          <TH>Slug</TH>
          <TH>Created</TH>
          <TH>Links</TH>
          <TH>Actions</TH>
        </TR>
      </THead>
      <TBody>
        {clients.map((c) => (
          <TR key={c.id}>
            <TD className="font-medium">{c.name}</TD>
            <TD className="text-slate-600 dark:text-slate-300">{c.slug}</TD>
            <TD className="text-slate-600 dark:text-slate-300">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}</TD>
            <TD className="text-slate-600 dark:text-slate-300">
              <div className="flex flex-col gap-1">
                <a href={`/rate/${c.slug}`} target="_blank" className="text-primary hover:underline">Public Rate Link</a>
                {c.websiteUrl ? (
                  <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">Website</a>
                ) : null}
              </div>
            </TD>
            <TD>
              <Link href={`/dashboard/admin/client/${c.id}`} className="text-primary hover:underline">Manage</Link>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
