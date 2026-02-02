import { createFileRoute } from "@tanstack/react-router";
import { useState, useTransition } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/actions")({
  component: ActionsPage,
});

const feature = getReact19Feature("actions");

const codeSample = `const [pending, startTransition] = useTransition();

function runAction() {
  startTransition(async () => {
    await syncWork();
    setStatus("done");
  });
}
`;

function ActionsPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Actions are functions that encapsulate transitions, giving you a single entrypoint for async UI changes."
      bullets={[
        "Wrap multiple state updates in one action.",
        "Use startTransition for non-urgent changes.",
        "Expose pending state for UX cues.",
      ]}
      example={<ActionsExample />}
      code={<CodeBlock title="Action function" code={codeSample} />}
    />
  );
}

function ActionsExample() {
  const [log, setLog] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  const runAction = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLog((prev) => [`Action complete at ${timeStamp()}`, ...prev].slice(0, 4));
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Action queue</span>
        <Badge variant={pending ? "default" : "secondary"}>
          {pending ? "Running" : "Idle"}
        </Badge>
      </div>
      <div className="space-y-1 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        {log.length === 0 ? (
          <div>No actions yet.</div>
        ) : (
          log.map((item) => <div key={item}>{item}</div>)
        )}
      </div>
      <Button onClick={runAction} disabled={pending}>
        {pending ? "Executing..." : "Run action"}
      </Button>
    </div>
  );
}

function timeStamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
