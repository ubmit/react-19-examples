import { createFileRoute } from "@tanstack/react-router";
import { useOptimistic, useState, useTransition } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/useOptimistic")({
  component: UseOptimisticPage,
});

const feature = getReact19Feature("use-optimistic");

const codeSample = `const [optimistic, addOptimistic] = useOptimistic(
  items,
  (state, item) => [...state, item]
);
`;

function UseOptimisticPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="useOptimistic lets you show the future UI state before an action fully completes."
      bullets={[
        "Update optimistic state immediately.",
        "Commit the real state when the action resolves.",
        "Keep UI fast even on slow networks.",
      ]}
      example={<UseOptimisticExample />}
      code={<CodeBlock title="useOptimistic" code={codeSample} />}
    />
  );
}

function UseOptimisticExample() {
  const [items, setItems] = useState<string[]>(["Audit React 19 APIs"]);
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState("");

  const [optimisticItems, addOptimisticItem] = useOptimistic(items, (state, item: string) => [
    ...state,
    `${item} (optimistic)`,
  ]);

  const submit = () => {
    const next = value.trim();
    if (!next) {
      return;
    }

    setValue("");
    addOptimisticItem(next);
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setItems((prev) => [...prev, next]);
    });
  };

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="optimistic-task">New task</FieldLabel>
        <Input
          id="optimistic-task"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ship optimistic UI"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={submit} disabled={pending || !value.trim()}>
          {pending ? "Committing..." : "Add task"}
        </Button>
        <Badge variant={pending ? "default" : "secondary"}>{pending ? "Syncing" : "Idle"}</Badge>
      </div>
      <div className="space-y-1 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        {optimisticItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
