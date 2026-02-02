import { createFileRoute, Link } from "@tanstack/react-router";

import { react19Features } from "@/lib/react-19-features";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 shadow-[0_30px_80px_-60px_oklch(0.1_0.05_240/0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.95_0.08_150/0.4),transparent_55%)]" />
        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">React 19</Badge>
            <Badge variant="secondary">Dev Docs</Badge>
            <Badge variant="secondary">{react19Features.length} Features</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Documentation with live React 19 examples.
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              A focused field guide for the React 19 release: server actions, transitions, new
              hooks, and platform upgrades. Each route ships an interactive demo so you can feel how
              the API behaves.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to={react19Features[0].path}>Start with Server Actions</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={react19Features[1].path}>Jump to Hooks</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Practical demos",
            description: "Copyable snippets + small UI experiments per feature.",
          },
          {
            title: "No noise",
            description: "Tight summaries and key takeaways for day-to-day use.",
          },
          {
            title: "Fast navigation",
            description: "Every feature is a route with its own example state.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-border/70 bg-card/70">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">All React 19 features</h2>
          <span className="text-xs text-muted-foreground">Updated February 2026</span>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2">
          {react19Features.map((feature) => (
            <Card
              key={feature.id}
              className="group border-border/60 bg-card/70 transition hover:border-primary/40"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">
                    {feature.apiLabel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{feature.summary}</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link to={feature.path}>Open docs</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
