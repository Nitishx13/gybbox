import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServiceCard({ name, connected }: { name: string; connected?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">{connected ? "Connected" : "Not connected"}</span>
          <Button variant={connected ? "outline" : "default"}>{connected ? "Manage" : "Connect"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
