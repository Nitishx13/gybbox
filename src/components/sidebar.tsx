"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type Variant = "client" | "admin";

export function Sidebar({ variant = "client" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const Nav = () => {
    if (variant === "admin") {
      return (
        <nav className="flex flex-col gap-2">
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/admin">Overview</Link>
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/admin/clients">Clients</Link>
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/admin/billing">Billing</Link>
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/admin/reports">Reports</Link>
        </nav>
      );
    }
    return (
      <nav className="flex flex-col gap-2">
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/client">Overview</Link>
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/client/review-links">Review Links</Link>
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/client/templates">Templates</Link>
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/client/users">Users</Link>
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/client/services">Services</Link>
        <Separator />
        <Link className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard/user/history">User History</Link>
      </nav>
    );
  };
  return (
    <aside className="border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between p-4 lg:justify-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="h-6 w-6 rounded bg-primary" />
          GybBox
        </Link>
        <Button className="lg:hidden" variant="outline" onClick={() => setOpen(true)}>Menu</Button>
      </div>
      <div className="hidden lg:block p-4">
        <Nav />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Navigation</span>
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </div>
            <Nav />
          </div>
        </div>
      )}
    </aside>
  );
}
