import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/react-server-components")({
  component: ReactServerComponentsPage,
});

const feature = getReact19Feature("react-server-components");

const codeSample = `// Server Component
export async function ProductList() {
  const products = await db.products.findMany();
  return <List items={products} />;
}
`;

function ReactServerComponentsPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="React Server Components split rendering so data-heavy UI can stay on the server."
      bullets={[
        "Render data fetches on the server by default.",
        "Stream UI chunks to the client.",
        "Keep client components focused on interactivity.",
      ]}
      example={<ReactServerComponentsExample />}
      code={<CodeBlock title="Server Component" code={codeSample} />}
    />
  );
}

function ReactServerComponentsExample() {
  const [chunks, setChunks] = useState<string[]>(["<ServerHeader />", "<InventoryGrid />"]);
  const [note, setNote] = useState("");

  const streamChunk = () => {
    const next = `<ServerChunk ${chunks.length + 1} />`;
    setChunks((prev) => [...prev, next]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Server stream</span>
        <Badge variant="secondary">{chunks.length} chunks</Badge>
      </div>
      <div className="space-y-1 rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        {chunks.map((chunk) => (
          <div key={chunk}>{chunk}</div>
        ))}
      </div>
      <Button variant="outline" onClick={streamChunk}>
        Stream next chunk
      </Button>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        <div className="mb-2 font-medium text-foreground">Client-only notes</div>
        <Textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add interactive notes here"
        />
      </div>
    </div>
  );
}
