"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";
import * as React from "react";
import { useSearchParams } from "next/navigation";

function decodeMaybeTwice(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    const once = decodeURIComponent(value);
    try {
      return decodeURIComponent(once);
    } catch {
      return once;
    }
  } catch {
    return value || undefined;
  }
}

function RateContent() {
  const search = useSearchParams();
  const slugRaw = search.get("slug") || search.get("s") || search.get("c") || search.get("client");
  const slug = decodeMaybeTwice(slugRaw);
  const googleUrl = decodeMaybeTwice(search.get("b"));

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Rate your experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-300">Please rate your recent experience. 5-star ratings go to Google. 1–4 stars will open a feedback form.</p>
          {!slug && (
            <div className="mt-3 rounded-md border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
              <div className="font-medium">Client identifier required</div>
              <p className="mt-1">This link is missing the client slug. Use one of the following:</p>
              <ul className="mt-1 list-disc pl-5">
                <li>
                  Path: <code className="rounded bg-white/60 px-1 text-xs">/rate/&lt;your-client-slug&gt;</code>
                </li>
                <li>
                  Query: <code className="rounded bg-white/60 px-1 text-xs">/rate?slug=&lt;your-client-slug&gt;</code>
                </li>
              </ul>
            </div>
          )}
          <div className="mt-4">
            <StarRating clientSlug={slug} googleReviewUrl={googleUrl} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default function RatePage() {
  return (
    <React.Suspense fallback={<main className="mx-auto max-w-2xl p-6"><div className="text-sm text-slate-500">Loading...</div></main>}>
      <RateContent />
    </React.Suspense>
  );
}
