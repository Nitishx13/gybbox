"use client";
import * as React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function FeedbackForm({ rating, clientSlug, onSubmitted }: { rating: number; clientSlug?: string; onSubmitted: () => void }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientSlug, rating, name, email, comments }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to submit feedback");
        onSubmitted();
      })
      .catch((err: any) => {
        setError(err?.message || "Failed to submit feedback");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="text-sm text-slate-600 dark:text-slate-300">Rating: {rating} stars</div>
      <div className="grid gap-2">
        <label className="text-sm" htmlFor="name">Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <label className="text-sm" htmlFor="email">Email</label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <label className="text-sm" htmlFor="comments">Comments</label>
        <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} rows={4} required />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Feedback"}</Button>
      </div>
    </form>
  );
}

