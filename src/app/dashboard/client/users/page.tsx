import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/user-table";

export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <UserTable />
      </CardContent>
    </Card>
  );
}
