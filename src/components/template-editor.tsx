"use client";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function TemplateEditor() {
  const [autoSend, setAutoSend] = React.useState(true);
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm">Feedback Request Template</label>
        <Textarea rows={6} placeholder="Hi {name}, we'd love your feedback..." />
      </div>
      <div>
        <label className="mb-1 block text-sm">Thank You Template</label>
        <Textarea rows={4} placeholder="Thanks {name}! We appreciate your time." />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600 dark:text-slate-300">Auto-send email on 1–4 star</span>
        <Switch checked={autoSend} onChange={(e) => setAutoSend((e.target as HTMLInputElement).checked)} />
      </div>
      <div className="flex justify-end">
        <Button>Save Templates</Button>
      </div>
    </div>
  );
}
