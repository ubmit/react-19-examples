import { createFileRoute } from "@tanstack/react-router";
import { useState, useTransition } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/async-transitions")({
  component: AsyncTransitionsPage,
});

const feature = getReact19Feature("async-transitions");

const codeSample = `startTransition(async () => {
  const data = await fetchReport();
  setReport(data);
});
`;

function AsyncTransitionsPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Async transitions let you keep the UI responsive while awaiting async work."
      bullets={[
        "Wrap async work in startTransition.",
        "Keep urgent updates outside the transition.",
        "Surface pending state with a light indicator.",
      ]}
      example={<AsyncTransitionsExample />}
      code={<CodeBlock title="Async Transition" code={codeSample} />}
    />
  );
}

function AsyncTransitionsExample() {
  const [entries, setEntries] = useState<string[]>([
    "Latency report · 112ms",
    "Cache hit rate · 94%",
  ]);
  const [pending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 650));
      setEntries(["Latency report · 96ms", "Cache hit rate · 97%", "Cold start · 180ms"]);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Transition state</span>
        <Badge variant={pending ? "default" : "secondary"}>{pending ? "Pending" : "Idle"}</Badge>
      </div>
      <div className="space-y-2 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        {entries.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <Button onClick={refresh} disabled={pending}>
        {pending ? "Refreshing..." : "Refresh report"}
      </Button>
    </div>
  );
}
