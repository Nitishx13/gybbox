import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const rows = [
  { id: 1, name: "Alice Johnson", email: "alice@gmbeverywhere.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@gmbeverywhere.com", role: "Editor", status: "Invited" },
];

export function UserTable() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Name</TH>
          <TH>Email</TH>
          <TH>Role</TH>
          <TH>Status</TH>
          <TH></TH>
        </TR>
      </THead>
      <TBody>
        {rows.map((u) => (
          <TR key={u.id}>
            <TD>{u.name}</TD>
            <TD>{u.email}</TD>
            <TD>{u.role}</TD>
            <TD>{u.status}</TD>
            <TD className="text-right"><Button size="sm" variant="outline">Manage</Button></TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
