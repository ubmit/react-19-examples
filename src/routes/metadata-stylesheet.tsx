import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/metadata-stylesheet")({
  component: MetadataStylesheetPage,
});

const feature = getReact19Feature("metadata-stylesheet");

const codeSample = `export function Meta() {
  return (
    <>
      <title>React 19 Docs</title>
      <meta name="description" content="React 19 examples" />
      <link rel="stylesheet" href="/themes/mint.css" />
    </>
  );
}
`;

function MetadataStylesheetPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="React 19 can manage metadata and stylesheets directly from components."
      bullets={[
        "Set title and meta tags inside component trees.",
        "Attach stylesheets in the same render pass.",
        "Keep head changes aligned with route UI.",
      ]}
      example={<MetadataStylesheetExample />}
      code={<CodeBlock title="Metadata" code={codeSample} />}
    />
  );
}

const themes = [
  { label: "Neon Mint", value: "mint" },
  { label: "Graphite", value: "graphite" },
  { label: "Sunset", value: "sunset" },
] as const;

function MetadataStylesheetExample() {
  const [title, setTitle] = useState("React 19 Field Guide");
  const [description, setDescription] = useState(
    "Interactive notes and examples for React 19 APIs.",
  );
  const [theme, setTheme] = useState<(typeof themes)[number]["value"]>(
    "mint",
  );

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="meta-title">Title</FieldLabel>
        <Input
          id="meta-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="meta-description">Description</FieldLabel>
        <Textarea
          id="meta-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Theme stylesheet</FieldLabel>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger>
            <SelectValue placeholder="Pick a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Head preview</span>
          <Badge variant="secondary">{theme}.css</Badge>
        </div>
        <div className="mt-2 space-y-1">
          <div>{`<title>${title || "(empty)"}</title>`}</div>
          <div>{`<meta name="description" content="${description}" />`}</div>
          <div>{`<link rel="stylesheet" href="/themes/${theme}.css" />`}</div>
        </div>
      </div>
    </div>
  );
}
