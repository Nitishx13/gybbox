"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ApiOk<T = unknown> = { ok: true } & T;
type ApiErr = { ok: false; error: string };
type LoginResp = ApiOk<{ role: "ADMIN" | "CLIENT" }> | ApiErr;

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResp = await res.json();
      if (!res.ok || !data.ok) throw new Error((data as ApiErr)?.error || "Login failed");
      const next = search.get("next");
      if (next) router.replace(next);
      else router.replace(data.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/client");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm">Email</label>
          <input id="email" type="email" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm">Password</label>
          <input id="password" type="password" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
