import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BillingTable } from "@/components/billing-table";

export default function AdminBillingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent>
        <BillingTable />
      </CardContent>
    </Card>
  );
}
