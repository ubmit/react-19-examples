import { createFileRoute } from "@tanstack/react-router";
import { preconnect, prefetchDNS } from "react-dom";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/preloading-apis")({
  component: PreloadingApisPage,
});

const feature = getReact19Feature("preloading-apis");

const codeSample = `prefetchDNS("https://fonts.gstatic.com");
preconnect("https://cdn.example.com");
`;

function PreloadingApisPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Preloading APIs expose browser hints right inside components, without manual tags."
      bullets={[
        "Use DNS prefetch to resolve hosts early.",
        "Use preconnect to warm up TCP/TLS.",
        "Trigger hints from any component.",
      ]}
      example={<PreloadingApisExample />}
      code={<CodeBlock title="preconnect + prefetchDNS" code={codeSample} />}
    />
  );
}

function PreloadingApisExample() {
  const [host, setHost] = useState("https://fonts.gstatic.com");
  const [hints, setHints] = useState<string[]>([]);

  const addHint = (label: string) => {
    setHints((prev) => [`${label}: ${host}`, ...prev].slice(0, 4));
  };

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="preload-host">Host</FieldLabel>
        <Input
          id="preload-host"
          value={host}
          onChange={(event) => setHost(event.target.value)}
        />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => {
            prefetchDNS(host);
            addHint("Prefetch DNS");
          }}
        >
          Prefetch DNS
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            preconnect(host);
            addHint("Preconnect");
          }}
        >
          Preconnect
        </Button>
      </div>
      <div className="space-y-2 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Hints fired</span>
          <Badge variant="secondary">{hints.length}</Badge>
        </div>
        <div className="space-y-1">
          {hints.length === 0 ? (
            <div>No hints yet.</div>
          ) : (
            hints.map((item) => <div key={item}>{item}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
