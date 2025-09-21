"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);
    try {
      const res = await fetch("/api/forgot/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, token }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to reset password");
      setOk(true);
      setTimeout(() => router.push(`/login?email=${encodeURIComponent(email)}`), 800);
    } catch (e: any) {
      setError(e?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-6 text-2xl font-bold">Reset password</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="email">Email</label>
          <input id="email" type="email" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="newPassword">New password</label>
          <input id="newPassword" type="password" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="token">Reset token</label>
          <input id="token" className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" value={token} onChange={(e) => setToken(e.target.value)} required />
          <p className="text-xs text-slate-500">Ask an admin for the reset token. It must match your server's SETUP_TOKEN.</p>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {ok && <p className="text-sm text-green-600">Password reset successful. Redirecting to login...</p>}
        <button disabled={loading} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60">
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </main>
  );
}
