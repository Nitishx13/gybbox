import { redirect } from "next/navigation";

export default function ClientLoginAliasPage() {
  // Simple alias that routes to the shared login with a next to client dashboard
  redirect("/login?next=/dashboard/client");
}
