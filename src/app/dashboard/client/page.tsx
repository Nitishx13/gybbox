import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ReviewStatsCard } from "@/components/review-stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function ClientOverviewPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  // Load client and feedback stats scoped by clientId
  const client = session.clientId
    ? await prisma.client.findUnique({ where: { id: session.clientId }, select: { id: true, name: true, slug: true, gmbReviewUrl: true } as any })
    : null;

  let feedbackCounts: Array<{ rating: number; _count: { _all: number } }> = [];
  let recent: Array<{ id: string; rating: number; name: string; email: string; comments: string; createdAt: Date } > = [] as any;
  if (session.clientId && (prisma as any).feedback?.groupBy) {
    try {
      feedbackCounts = await (prisma as any).feedback.groupBy({
        by: ["rating"],
        where: { clientId: session.clientId },
        _count: { _all: true },
      });
      recent = await (prisma as any).feedback.findMany({
        where: { clientId: session.clientId },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, rating: true, name: true, email: true, comments: true, createdAt: true },
      });
    } catch {
      // Table may not exist yet; default to empty
      feedbackCounts = [];
      recent = [] as any;
    }
  }

  const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  for (const row of feedbackCounts as any[]) distribution[String(row.rating)] = row._count?._all || 0;
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const fiveShare = total ? Math.round((distribution["5"] / total) * 100) : 0;

  return (
    <div className="grid gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 animate-fade-up">
        <ReviewStatsCard title="Feedback entries" value={String(total)} sub="All-time" />
        <ReviewStatsCard title="5-Star %" value={`${fiveShare}%`} sub="All-time" />
        <ReviewStatsCard title="Public rate link" value={client?.slug ? `/rate/${client.slug}` : "-"} sub="Share with customers" />
      </div>

      {/* Quick actions */}
      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Link href="/dashboard/client/review-links" className="group rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">🔗</div>
              <div className="font-medium">Create review link</div>
              <div className="text-xs text-slate-500">Shareable link or QR</div>
            </Link>
            {client?.gmbReviewUrl ? (
              <a href={client.gmbReviewUrl as any} target="_blank" className="group rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">⭐</div>
                <div className="font-medium">Test Google URL</div>
                <div className="text-xs text-slate-500">Opens write-review</div>
              </a>
            ) : null}
            <Link href="/dashboard/client/users" className="group rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">👥</div>
              <div className="font-medium">Invite team</div>
              <div className="text-xs text-slate-500">Roles & access</div>
            </Link>
            <Link href="/dashboard/client/services" className="group rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">🏪</div>
              <div className="font-medium">Services & locations</div>
              <div className="text-xs text-slate-500">Connect GMB</div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Funnel snapshot */}
      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle>Funnel snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>5-star redirects</span>
                <span>{fiveShare}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-primary" style={{ width: `${fiveShare}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>1–4 star feedback</span>
                <span>{total ? 100 - fiveShare : 0}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-orange-500" style={{ width: `${total ? 100 - fiveShare : 0}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /> Google Redirects</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" /> Private Feedback</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent feedback */}
      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle>Recent feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Time</TH>
                <TH>Rating</TH>
                <TH>Name</TH>
                <TH>Comments</TH>
              </TR>
            </THead>
            <TBody>
              {recent.map((row) => (
                <TR key={row.id}>
                  <TD>{new Date(row.createdAt).toLocaleString()}</TD>
                  <TD>{row.rating}★</TD>
                  <TD>{row.name}</TD>
                  <TD className="max-w-[28rem] truncate" title={row.comments}>{row.comments}</TD>
                </TR>
              ))}
              {recent.length === 0 && (
                <TR>
                  <TD colSpan={4} className="py-6 text-center text-sm text-slate-500">No feedback yet.</TD>
                </TR>
              )}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
