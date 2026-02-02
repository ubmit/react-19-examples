import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/action-formAction")({
  component: ActionFormActionPage,
});

const feature = getReact19Feature("action-formaction-props");

const codeSample = `<form action={savePost}>
  <input name="title" />
  <button type="submit">Save</button>
  <button formAction={previewPost}>Preview</button>
</form>
`;

function ActionFormActionPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Use action and formAction props to wire forms and buttons directly to async actions."
      bullets={[
        "Assign a default action on the form.",
        "Override per-button with formAction.",
        "No extra event handlers required.",
      ]}
      example={<ActionFormActionExample />}
      code={<CodeBlock title="action + formAction" code={codeSample} />}
    />
  );
}

function ActionFormActionExample() {
  const [logs, setLogs] = useState<string[]>([]);

  const savePost = async (formData: FormData) => {
    const title = String(formData.get("title") || "Untitled");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLogs((prev) => [`Saved "${title}"`, ...prev].slice(0, 3));
  };

  const previewPost = async (formData: FormData) => {
    const title = String(formData.get("title") || "Untitled");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLogs((prev) => [`Previewed "${title}"`, ...prev].slice(0, 3));
  };

  return (
    <form action={savePost} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="form-action-title">Post title</FieldLabel>
        <Input
          id="form-action-title"
          name="title"
          placeholder="React 19 quickstart"
        />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save post</Button>
        <Button type="submit" variant="outline" formAction={previewPost}>
          Preview
        </Button>
      </div>
      <div className="space-y-2 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Latest actions</span>
          <Badge variant="secondary">{logs.length}</Badge>
        </div>
        <div className="space-y-1">
          {logs.length === 0 ? (
            <div>No actions yet.</div>
          ) : (
            logs.map((item) => <div key={item}>{item}</div>)
          )}
        </div>
      </div>
    </form>
  );
}
