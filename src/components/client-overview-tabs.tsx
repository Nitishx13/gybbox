"use client";
import * as React from "react";

export function ClientOverviewTabs() {
  const [tab, setTab] = React.useState("overview");
  const Item = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <button
      className={`rounded-md px-3 py-1 text-sm ${tab === id ? "bg-primary text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}
      onClick={() => setTab(id)}
      role="tab"
      aria-selected={tab === id}
    >
      {children}
    </button>
  );
  return (
    <div>
      <div className="mb-4 flex gap-2" role="tablist" aria-label="Client tabs">
        <Item id="overview">Overview</Item>
        <Item id="users">Users</Item>
        <Item id="activity">Activity Logs</Item>
      </div>
      {tab === "overview" && <div className="text-sm text-slate-600 dark:text-slate-300">Client KPIs and summary...</div>}
      {tab === "users" && <div className="text-sm text-slate-600 dark:text-slate-300">User list for this client...</div>}
      {tab === "activity" && <div className="text-sm text-slate-600 dark:text-slate-300">Recent actions and changes...</div>}
    </div>
  );
}
