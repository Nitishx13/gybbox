import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GybBox Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // Base wrapper for nested dashboards. Nested routes (client/admin) handle their own sidebars and headers.
    <div className="min-h-dvh">{children}</div>
  );
}
