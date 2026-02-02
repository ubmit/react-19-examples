import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { React19Feature } from "@/lib/react-19-features";

const metaLabels: Record<React19Feature["category"], string> = {
  "Client API": "Client",
  "Server API": "Server",
  Improvement: "Platform",
};

type FeaturePageProps = {
  feature: React19Feature;
  intro: string;
  bullets: string[];
  example: React.ReactNode;
  code: React.ReactNode;
};

export function FeaturePage({ feature, intro, bullets, example, code }: FeaturePageProps) {
  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-background/70">
            {feature.category}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {metaLabels[feature.category]}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {feature.path}
          </Badge>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{feature.title}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">{feature.summary}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <Card className="border-border/70 bg-card/70">
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Core Idea
              </CardTitle>
              <div className="text-base text-foreground">{intro}</div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <ul className="space-y-2 text-sm text-muted-foreground">
                {bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/70 bg-card/70">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Interactive Example
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                Click, type, or trigger to see behavior.
              </div>
            </CardHeader>
            <CardContent>{example}</CardContent>
          </Card>

          {code}
        </div>
      </div>
    </section>
  );
}
