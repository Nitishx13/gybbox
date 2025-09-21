"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [clientName, setClientName] = React.useState("");
  const [clientSlug, setClientSlug] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [gmbPlaceId, setGmbPlaceId] = React.useState("");
  const [gmbReviewUrl, setGmbReviewUrl] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);
    try {
      const res = await fetch("/api/admin/create-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientSlug: clientSlug.trim(),
          userEmail,
          userPassword,
          gmbPlaceId: gmbPlaceId || undefined,
          gmbReviewUrl: gmbReviewUrl || undefined,
          websiteUrl: websiteUrl || undefined,
          contactEmail: contactEmail || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to create client");
      setOk(true);
      setTimeout(() => router.push("/dashboard/admin/clients"), 800);
    } catch (err: any) {
      setError(err.message || "Failed to create client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">New Client</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="clientName">Client Name</label>
          <input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} required className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="clientSlug">Client Slug</label>
          <input id="clientSlug" value={clientSlug} onChange={(e) => setClientSlug(e.target.value)} required className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" placeholder="unique-slug" />
          <p className="text-xs text-slate-500">Lowercase, unique identifier (e.g. my-clinic-east)</p>
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="userEmail">Client User Email</label>
          <input id="userEmail" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="userPassword">Client User Password</label>
          <input id="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800" />
        <h2 className="text-lg font-semibold">Google & Contact (optional)</h2>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="gmbPlaceId">Google Place ID</label>
          <input id="gmbPlaceId" value={gmbPlaceId} onChange={(e) => setGmbPlaceId(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="gmbReviewUrl">Google Write Review URL</label>
          <input id="gmbReviewUrl" value={gmbReviewUrl} onChange={(e) => setGmbReviewUrl(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" placeholder="https://search.google.com/local/writereview?placeid=..." />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="websiteUrl">Website URL</label>
          <input id="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="contactEmail">Contact Email</label>
          <input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {ok && <p className="text-sm text-green-600">Client created!</p>}
        <button disabled={loading} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60">
          {loading ? "Creating..." : "Create Client"}
        </button>
      </form>
    </main>
  );
}
