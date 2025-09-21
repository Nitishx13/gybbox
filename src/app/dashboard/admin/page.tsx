import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  // Runtime guard (middleware already protects /dashboard/:path*)
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return (
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-300">You must be an admin to view this page.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Live metrics
  const [clientCount, userCount] = await Promise.all([
    prisma.client.count(),
    prisma.user.count(),
  ]);

  // Feedback distribution (guarded: table may not exist yet)
  let feedbackCounts: Array<{ rating: number; _count: { _all: number } }> = [];
  try {
    if ((prisma as any).feedback?.groupBy) {
      feedbackCounts = await (prisma as any).feedback.groupBy({
        by: ["rating"],
        _count: { _all: true },
      });
    }
  } catch (e) {
    // Likely the Feedback table hasn't been created (no migrations run yet).
    // We fall back to an empty dataset; admins can run /api/setup/ensure-schema or prisma migrate.
    feedbackCounts = [];
  }

  const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  for (const row of feedbackCounts as any[]) distribution[String(row.rating)] = row._count?._all || 0;
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const fiveStarRatio = total ? Math.round((distribution["5"] / total) * 100) : 0;

  return (
    <div className="grid gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KPI title="Total Clients" value={String(clientCount)} sub="all time" />
        <KPI title="Users" value={String(userCount)} sub="active" />
        <KPI title="Feedback entries" value={String(total)} sub="all ratings" />
        <KPI title="5★ Share" value={`${fiveStarRatio}%`} sub="all time" />
      </div>

      {/* Quick links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <QuickLink href="/dashboard/admin/clients" icon="👥" title="Manage clients" sub="Onboard & edit" />
            <QuickLink href="/dashboard/admin/billing" icon="💳" title="Billing" sub="Invoices & plans" />
            <QuickLink href="/dashboard/admin/reports" icon="📊" title="Reports" sub="Exports & KPIs" />
            <QuickLink href="/dashboard/client" icon="🧭" title="Client view" sub="Impersonate" />
          </div>
        </CardContent>
      </Card>

      {/* System health (static placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>System health</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 text-sm">
            <Health name="API latency" value="~120ms" ok />
            <Health name="Queue backlog" value="Normal" ok />
            <Health name="Error rate" value="<0.5%" />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function KPI({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
}

function QuickLink({ href, icon, title, sub }: { href: string; icon: string; title: string; sub: string }) {
  return (
    <Link href={href} className="group rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <div className="font-medium">{title}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </Link>
  );
}

function Health({ name, value, ok }: { name: string; value: string; ok?: boolean }) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-1 text-xs text-slate-500">{name}</div>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${ok ? "bg-green-500" : "bg-orange-500"}`} />
        <span className="text-sm font-medium">{value}</span>
      </div>
    </li>
  );
}
