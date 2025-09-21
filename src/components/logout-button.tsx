"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className={`inline-flex h-9 items-center justify-center rounded-md border border-slate-300 px-3 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 ${className}`}
      aria-label="Log out"
      title="Log out"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
