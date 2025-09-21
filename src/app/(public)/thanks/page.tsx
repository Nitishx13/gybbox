import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Thank you!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto mb-3 h-10 w-10 rounded bg-primary" />
          <p className="text-slate-600 dark:text-slate-300">We appreciate your feedback. It helps us improve GybBox.</p>
        </CardContent>
      </Card>
    </main>
  );
}
