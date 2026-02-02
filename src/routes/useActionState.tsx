import { createFileRoute } from "@tanstack/react-router";
import { useActionState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/useActionState")({
  component: UseActionStatePage,
});

const feature = getReact19Feature("use-action-state");

const codeSample = `const [state, formAction, pending] = useActionState(
  async (prevState, formData) => {
    const name = formData.get("name");
    return { ...prevState, name };
  },
  { name: "" }
);
`;

type DraftState = {
  status: "idle" | "saved";
  name: string;
  saves: number;
};

async function saveDraft(prevState: DraftState, formData: FormData): Promise<DraftState> {
  const nextName = String(formData.get("name") || "");
  await new Promise((resolve) => setTimeout(resolve, 650));
  return {
    status: "saved",
    name: nextName,
    saves: prevState.saves + 1,
  };
}

function UseActionStatePage() {
  return (
    <FeaturePage
      feature={feature}
      intro="useActionState lets you derive UI state directly from an async action result."
      bullets={[
        "Pair a form with a server or client action.",
        "Keep state updates co-located with the action logic.",
        "Track pending state without extra reducers.",
      ]}
      example={<UseActionStateExample />}
      code={<CodeBlock title="useActionState" code={codeSample} />}
    />
  );
}

function UseActionStateExample() {
  const [state, formAction, pending] = useActionState(saveDraft, {
    status: "idle",
    name: "",
    saves: 0,
  });

  return (
    <form action={formAction} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="use-action-state-name">Display name</FieldLabel>
        <Input id="use-action-state-name" name="name" placeholder="React 19 guide" required />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save draft"}
        </Button>
        <Badge variant="secondary">{state.status}</Badge>
        <span className="text-xs text-muted-foreground">Saved {state.saves} times</span>
      </div>
      <div className="text-xs text-muted-foreground">Latest name: {state.name || "—"}</div>
    </form>
  );
}
