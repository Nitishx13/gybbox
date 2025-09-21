"use client";
import * as React from "react";

type ApiOk = { ok: true };
type ApiErr = { ok: false; error: string };

type Props = {
  clientSlug: string;
};

export function ClientFeedbackQuickForm({ clientSlug }: Props) {
  const [rating, setRating] = React.useState(4);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setOk(false);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientSlug, rating, name, email, comments }),
      });
      const data: ApiOk | ApiErr = await res.json().catch(() => ({ ok: false, error: "Invalid JSON" } as ApiErr));
      if (!res.ok || !data.ok) throw new Error((data as ApiErr).error || "Failed to submit");
      setOk(true);
      setName("");
      setEmail("");
      setComments("");
      setRating(4);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="rating">Rating</label>
        <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900">
          {[1,2,3,4,5].map(v => <option value={v} key={v}>{v} star{v>1?"s":""}</option>)}
        </select>
      </div>
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-10 rounded-md border border-slate-300 px-3 dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="comments">Comments</label>
        <textarea id="comments" rows={4} value={comments} onChange={(e) => setComments(e.target.value)} required className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {ok && <div className="text-sm text-green-600">Saved to Feedback list.</div>}
      <button disabled={submitting} className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-white disabled:opacity-60">
        {submitting ? "Saving..." : "Save Feedback"}
      </button>
    </form>
  );
}
