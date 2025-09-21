import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";

function parseDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

export const dynamic = "force-dynamic";

export default async function ClientFeedbackListPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const session = await getSession();
  if (!session || !session.clientId) {
    return (
      <main className="p-6">
        <p className="text-sm text-red-600">Unauthorized.</p>
      </main>
    );
  }

  const pageSize = Math.min(Number(searchParams.pageSize ?? 20), 100) || 20;
  const page = Math.max(Number(searchParams.page ?? 1), 1) || 1;
  const startDate = parseDate((searchParams.from as string) || undefined);
  const endDate = parseDate((searchParams.to as string) || undefined);

  const where: any = { clientId: session.clientId };
  if (startDate || endDate) {
    where.createdAt = {} as any;
    if (startDate) (where.createdAt as any).gte = startDate;
    if (endDate) {
      // include entire endDate day
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      (where.createdAt as any).lte = end;
    }
  }

  const [items, total] = await Promise.all([
    (prisma as any).feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, rating: true, name: true, email: true, comments: true, createdAt: true },
    }),
    (prisma as any).feedback.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feedback</h1>
        <Link className="text-sm text-primary hover:underline" href="/dashboard/client">Back to dashboard</Link>
      </div>

      <form className="mb-4 grid grid-cols-1 gap-3 rounded-md border border-slate-200 p-3 dark:border-slate-800 md:grid-cols-5">
        <div className="grid gap-1">
          <label className="text-xs" htmlFor="from">From</label>
          <input id="from" name="from" type="date" defaultValue={(searchParams.from as string) || ""} className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs" htmlFor="to">To</label>
          <input id="to" name="to" type="date" defaultValue={(searchParams.to as string) || ""} className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs" htmlFor="pageSize">Page size</label>
          <input id="pageSize" name="pageSize" type="number" min={1} max={100} defaultValue={String(pageSize)} className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs" htmlFor="page">Page</label>
          <input id="page" name="page" type="number" min={1} defaultValue={String(page)} className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="flex items-end">
          <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-white">Apply</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-3">Date</th>
              <th className="py-2 pr-3">Rating</th>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Email</th>
              <th className="py-2 pr-3">Comments</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row: any) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <td className="py-2 pr-3">{new Date(row.createdAt).toLocaleString()}</td>
                <td className="py-2 pr-3">{row.rating}★</td>
                <td className="py-2 pr-3">{row.name}</td>
                <td className="py-2 pr-3 text-slate-500">{row.email}</td>
                <td className="py-2 pr-3 max-w-[28rem] truncate" title={row.comments}>{row.comments}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No feedback found for the selected range.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <div>
          Page {page} of {totalPages} • {total} total
        </div>
        <div className="flex gap-2">
          {page > 1 && (
            <Link className="rounded-md border px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-900" href={`?from=${searchParams.from ?? ""}&to=${searchParams.to ?? ""}&pageSize=${pageSize}&page=${page - 1}`}>
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link className="rounded-md border px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-900" href={`?from=${searchParams.from ?? ""}&to=${searchParams.to ?? ""}&pageSize=${pageSize}&page=${page + 1}`}>
              Next
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
