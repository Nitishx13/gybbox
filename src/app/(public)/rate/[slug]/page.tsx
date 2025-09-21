import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";

export default async function RateBySlugPage({ params }: { params: { slug: string } }) {
  const client = await prisma.client.findUnique({ where: { slug: params.slug } });

  // Use any-cast to access fields added in a pending Prisma migration
  const googleReviewUrl = (client as any)?.gmbReviewUrl || process.env.NEXT_PUBLIC_GMB_URL || "https://www.google.com/maps";

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Rate your experience {client?.name ? `with ${client.name}` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-300">Please rate your recent experience. 5-star ratings go to Google. 1–4 stars will open a feedback form.</p>
          <div className="mt-4">
            <StarRating googleReviewUrl={googleReviewUrl} clientSlug={params.slug} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
