import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const subs = [
  { id: 1, client: "Acme Corp", plan: "Pro", autoRenew: true },
  { id: 2, client: "Globex", plan: "Starter", autoRenew: false },
];

export function BillingTable() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Client</TH>
          <TH>Plan</TH>
          <TH>Auto-renew</TH>
        </TR>
      </THead>
      <TBody>
        {subs.map((s) => (
          <TR key={s.id}>
            <TD>{s.client}</TD>
            <TD>
              <Badge className="bg-accent-1 text-primary dark:bg-slate-900/40 dark:text-primary">{s.plan}</Badge>
            </TD>
            <TD>
              <Switch defaultChecked={s.autoRenew} aria-label={`Auto-renew for ${s.client}`} />
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
