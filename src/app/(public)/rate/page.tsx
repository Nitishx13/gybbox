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

export default function RatePage() {
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
            <p className="mt-2 text-sm text-orange-600">Tip: add ?slug=your-client-slug to attribute feedback to the correct client.</p>
          )}
          <div className="mt-4">
            <StarRating clientSlug={slug} googleReviewUrl={googleUrl} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
