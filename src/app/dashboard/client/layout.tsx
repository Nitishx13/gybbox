import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

export const metadata: Metadata = {
  title: "GybBox – Client Dashboard",
};

export const dynamic = "force-dynamic";

export default async function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=/dashboard/client`);
  }
  // Allow CLIENT or ADMIN to view client dashboard (admins may impersonate/view)
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[260px_1fr]">
      <Sidebar variant="client" />
      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="text-sm text-slate-500">Client Dashboard</div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
            <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-700" aria-label="User avatar" />
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
