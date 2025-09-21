import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReviewStatsCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {sub && <div className="text-xs text-slate-500">{sub}</div>}
      </CardContent>
    </Card>
  );
}
