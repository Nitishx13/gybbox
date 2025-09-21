import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";

export default function RatePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Rate your experience with GybBox</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-300">Please rate your recent experience. 5-star ratings go to Google. 1–4 stars will open a feedback form.</p>
          <div className="mt-4">
            <StarRating />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
