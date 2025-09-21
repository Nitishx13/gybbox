"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

function ThanksContent() {
  const search = useSearchParams();
  const router = useRouter();
  const slug = search.get("slug") || undefined;
  const backToRateHref = slug ? `/rate/${slug}` : "/rate";

  return (
    <main className="mx-auto max-w-md p-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Thank you!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">✓</div>
          <p className="text-slate-700 dark:text-slate-300">
            We appreciate your feedback{slug ? " for this business" : ""}. It helps us improve.
          </p>
        </CardContent>
        <div className="flex justify-center gap-3 p-4">
          <Button variant="default" onClick={() => router.push(backToRateHref)}>Back to Rate</Button>
          <Button variant="outline" onClick={() => router.push("/")}>Home</Button>
        </div>
      </Card>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <div>
      <React.Suspense fallback={<main className="mx-auto max-w-md p-6"><div className="text-sm text-slate-500">Loading...</div></main>}>
        <ThanksContent />
      </React.Suspense>
    </div>
  );
}
