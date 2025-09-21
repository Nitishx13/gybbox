"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";

// Simple local-storage mock store
const STORAGE_KEY = "gybbox_review_links";

type ReviewLink = {
  id: string;
  name: string; // campaign name
  url: string;  // generated URL
  createdAt: string;
};

function loadLinks(): ReviewLink[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReviewLink[]) : [];
  } catch {
    return [];
  }
}

function saveLinks(items: ReviewLink[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ReviewLinksPage() {
  const [campaign, setCampaign] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [links, setLinks] = React.useState<ReviewLink[]>([]);

  React.useEffect(() => {
    setLinks(loadLinks());
  }, []);

  const createLink = (e: React.FormEvent) => {
    e.preventDefault();
    const base = typeof window !== "undefined" ? window.location.origin : "";
    // Generate a shareable rate URL with simple query params
    const params = new URLSearchParams();
    if (campaign) params.set("c", encodeURIComponent(campaign));
    if (business) params.set("b", encodeURIComponent(business));
    const url = `${base}/rate?${params.toString()}`;

    const item: ReviewLink = {
      id: `${Date.now()}`,
      name: campaign || "Untitled",
      url,
      createdAt: new Date().toISOString(),
    };
    const next = [item, ...links];
    setLinks(next);
    saveLinks(next);
    setCampaign("");
  };

  const removeLink = (id: string) => {
    const next = links.filter((l) => l.id !== id);
    setLinks(next);
    saveLinks(next);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Review Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createLink} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="campaign">Campaign name</label>
              <Input id="campaign" value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="Spring Promo" required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="business">Business/location (optional)</label>
              <Input id="business" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="GybBox HQ" />
            </div>
            <div className="flex items-end">
              <Button type="submit">Generate</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Links</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-sm text-slate-500">No links yet. Create your first review link above.</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Campaign</TH>
                  <TH>Link</TH>
                  <TH>Created</TH>
                  <TH></TH>
                </TR>
              </THead>
              <TBody>
                {links.map((l) => (
                  <TR key={l.id}>
                    <TD>{l.name}</TD>
                    <TD>
                      <a href={l.url} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        {l.url}
                      </a>
                    </TD>
                    <TD>{new Date(l.createdAt).toLocaleString()}</TD>
                    <TD className="text-right">
                      <Button size="sm" variant="outline" onClick={() => removeLink(l.id)}>Delete</Button>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
