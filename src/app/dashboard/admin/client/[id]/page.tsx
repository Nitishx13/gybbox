import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOverviewTabs } from "@/components/client-overview-tabs";
import { ClientSettingsForm } from "@/components/client-settings-form";

type Props = { params: { id: string } };

export default function AdminClientDetailPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client: {params.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <section>
            <h2 className="mb-3 text-lg font-semibold">Settings</h2>
            <ClientSettingsForm clientId={params.id} />
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Overview</h2>
            <ClientOverviewTabs />
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
