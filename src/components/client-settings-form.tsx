"use client";
import * as React from "react";

export function ClientSettingsForm({ clientId }: { clientId: string }) {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [gmbPlaceId, setGmbPlaceId] = React.useState("");
  const [gmbReviewUrl, setGmbReviewUrl] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/admin/client/${clientId}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to load");
        const c = data.client || {};
        setName(c.name || "");
        setSlug(c.slug || "");
        setGmbPlaceId(c.gmbPlaceId || "");
        setGmbReviewUrl(c.gmbReviewUrl || "");
        setWebsiteUrl(c.websiteUrl || "");
        setContactEmail(c.contactEmail || "");
      })
      .catch((e: any) => setError(e?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [clientId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(false);
    try {
      const res = await fetch(`/api/admin/client/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug: slug.trim(), gmbPlaceId, gmbReviewUrl, websiteUrl, contactEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to save");
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch (e: any) {
      setError(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-slate-500">Loading client...</div>;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm" htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" required />
      </div>
      <div className="grid gap-2">
        <label className="text-sm" htmlFor="slug">Slug</label>
        <input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="h-11 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" required />
        <p className="text-xs text-slate-500">Public link: /rate/{slug}</p>
      </div>
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
      {ok && <p className="text-sm text-green-600">Saved</p>}
      <div className="flex justify-end">
        <button disabled={saving} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
