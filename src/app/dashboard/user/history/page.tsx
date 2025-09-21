import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";

const data = [
  { id: 1, time: "2025-09-10 11:04", rating: 3, status: "Captured" },
  { id: 2, time: "2025-09-10 11:35", rating: 5, status: "Redirected" },
  { id: 3, time: "2025-09-11 08:12", rating: 2, status: "Captured" },
];

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <THead>
            <TR>
              <TH>Time</TH>
              <TH>Rating</TH>
              <TH>Status</TH>
            </TR>
          </THead>
          <TBody>
            {data.map((row) => (
              <TR key={row.id}>
                <TD>{row.time}</TD>
                <TD>{row.rating}★</TD>
                <TD>{row.status}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </CardContent>
    </Card>
  );
}
