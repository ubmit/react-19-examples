import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/server-actions")({
  component: ServerActionsPage,
});

const feature = getReact19Feature("server-actions");

const codeSample = `async function createPost(formData: FormData) {
  "use server";
  const title = formData.get("title");
  return { ok: true, title };
}
`;

function ServerActionsPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Server Actions let you call server-only logic directly from client UI without a separate API layer."
      bullets={[
        "Write async functions that run on the server.",
        "Invoke them from forms or client events.",
        "Keep mutations close to the UI that needs them.",
      ]}
      example={<ServerActionsExample />}
      code={<CodeBlock title="Server Action" code={codeSample} />}
    />
  );
}

function ServerActionsExample() {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const runAction = async () => {
    if (!value.trim()) {
      return;
    }

    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLogs((prev) => [`Saved: ${value.trim()}`, ...prev].slice(0, 4));
    setValue("");
    setPending(false);
  };

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="server-action-title">Post title</FieldLabel>
        <Input
          id="server-action-title"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ship React 19 guide"
        />
      </Field>
      <Button onClick={runAction} disabled={pending || !value.trim()}>
        {pending ? "Running on server..." : "Run server action"}
      </Button>
      <div className="space-y-2 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Server log</span>
          <Badge variant="secondary">{logs.length}</Badge>
        </div>
        <div className="space-y-1">
          {logs.length === 0 ? (
            <div>No action yet.</div>
          ) : (
            logs.map((item) => <div key={item}>{item}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
