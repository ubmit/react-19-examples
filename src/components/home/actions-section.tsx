import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sleep } from "@/lib/utils";
import { redirect } from "@tanstack/react-router";
import { useActionState, useOptimistic, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { DocSection, ExampleCard } from "@/components/home/doc-section";

async function updateName(name: string) {
  await sleep(1000);
  return { message: `Failed to update name to ${name}`, status: "error" };
}

async function updateNameSuccessfully(name: string) {
  await sleep(2000);
  return name;
}

function UpdateName() {
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  return (
    <>
      <form
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsPending(true);
          const response = await updateName(name);
          setIsPending(false);
          if (response) {
            setError(response.message);
          }
        }}
      >
        <Input
          className="h-9 rounded-md border-border/80 bg-background/80"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type a name"
        />
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </>
  );
}

function UpdateNameWithAction() {
  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <form
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(async () => {
            const response = await updateName(name);
            if (response) {
              setError(response.message);
              return;
            }
            redirect({ to: "/success" });
          });
        }}
      >
        <Input
          className="h-9 rounded-md border-border/80 bg-background/80"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type a name"
        />
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </>
  );
}

function ChangeName() {
  const [error, submitAction] = useActionState(async (_, formData) => {
    const name = formData.get("name") as string;
    const response = await updateName(name);
    if (response) {
      return response;
    }
    redirect({ to: "/success" });
    return null;
  }, null);

  return (
    <>
      <form action={submitAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          className="h-9 rounded-md border-border/80 bg-background/80"
          type="text"
          name="name"
          placeholder="Type a name"
        />
        <DesignButton />
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error.message}</p>}
    </>
  );
}

function DesignButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Update
    </Button>
  );
}

function ChangeNameOptimistically({
  currentName,
  onUpdateName,
}: {
  currentName: string;
  onUpdateName: (name: string) => void;
}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async (formData: FormData) => {
    const newName = formData.get("name") as string;
    setOptimisticName(newName);
    const updatedName = await updateNameSuccessfully(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Current name: <strong>{optimisticName}</strong>
      </p>
      <div className="space-y-2">
        <Label htmlFor="optimistic-name">Change name</Label>
        <Input
          id="optimistic-name"
          type="text"
          className="h-9 rounded-md border-border/80 bg-background/80"
          name="name"
          disabled={currentName !== optimisticName}
          placeholder="Type a name"
        />
      </div>
    </form>
  );
}

export function ActionsSection() {
  const [name, setName] = useState("Jane Doe");

  return (
    <DocSection
      id="actions"
      title="Actions"
      lede="Compare old form mutation flow vs built-in action primitives."
      className="delay-100"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ExampleCard title="Before actions" note="Manual pending and error wiring.">
          <UpdateName />
        </ExampleCard>
        <ExampleCard title="After actions" note="Transition handles pending state.">
          <UpdateNameWithAction />
        </ExampleCard>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ExampleCard title="useActionState" note="Server-ish action + status in one API.">
          <ChangeName />
        </ExampleCard>
        <ExampleCard title="useOptimistic" note="Show next state before mutation completes.">
          <ChangeNameOptimistically currentName={name} onUpdateName={setName} />
        </ExampleCard>
      </div>
    </DocSection>
  );
}
