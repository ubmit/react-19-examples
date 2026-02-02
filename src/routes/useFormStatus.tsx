import { createFileRoute } from "@tanstack/react-router";
import { useFormStatus } from "react-dom";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/useFormStatus")({
  component: UseFormStatusPage,
});

const feature = getReact19Feature("use-form-status");

const codeSample = `function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
`;

function UseFormStatusPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="useFormStatus exposes the status of the nearest parent form submission."
      bullets={[
        "Read pending state without prop drilling.",
        "Disable buttons while submitting.",
        "Show inline feedback near the form.",
      ]}
      example={<UseFormStatusExample />}
      code={<CodeBlock title="useFormStatus" code={codeSample} />}
    />
  );
}

function UseFormStatusExample() {
  const [message, setMessage] = useState("");

  const submit = async (formData: FormData) => {
    const email = String(formData.get("email") || "");
    await new Promise((resolve) => setTimeout(resolve, 650));
    setMessage(`Invite sent to ${email}`);
  };

  return (
    <form action={submit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="form-status-email">Team email</FieldLabel>
        <Input id="form-status-email" name="email" placeholder="dev@company.com" required />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <SubmitButton />
        {message ? <Badge variant="secondary">{message}</Badge> : null}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send invite"}
    </Button>
  );
}
