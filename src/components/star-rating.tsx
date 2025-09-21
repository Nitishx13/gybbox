"use client";
import * as React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { FeedbackForm } from "./feedback-form";
import { useRouter } from "next/navigation";

const DEFAULT_GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GMB_URL || "https://www.google.com/maps";

export function StarRating({ googleReviewUrl, clientSlug }: { googleReviewUrl?: string; clientSlug?: string }) {
  const [rating, setRating] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleRate = (value: number) => {
    setRating(value);
    if (value === 5) {
      if (typeof window !== "undefined") {
        window.alert("Thanks! Redirecting you to Google reviews...");
      }
      setTimeout(() => {
        window.location.href = googleReviewUrl || DEFAULT_GOOGLE_REVIEW_URL;
      }, 600);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2" role="radiogroup" aria-label="Rate your experience">
        {[1, 2, 3, 4, 5].map((v) => (
          <Button
            key={v}
            aria-checked={rating === v}
            role="radio"
            onClick={() => handleRate(v)}
            variant="ghost"
            className={`h-12 w-12 rounded-full border border-slate-200 bg-white text-2xl leading-none dark:bg-slate-900 ${
              rating && v <= rating ? "text-orange-500" : "text-slate-300"
            }`}
          >
            {rating && v <= rating ? "★" : "☆"}
          </Button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Share your feedback</DialogTitle>
        </DialogHeader>
        <FeedbackForm
          rating={rating ?? 0}
          clientSlug={clientSlug}
          onSubmitted={() => {
            setOpen(false);
            if (typeof window !== "undefined") {
              window.alert("Feedback submitted. Thank you!");
            }
            router.push("/thanks");
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

