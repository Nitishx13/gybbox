import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateEditor } from "@/components/template-editor";

export default function TemplatesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <TemplateEditor />
      </CardContent>
    </Card>
  );
}
