import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/ref-as-prop")({
  component: RefAsPropPage,
});

const feature = getReact19Feature("ref-as-prop");

const codeSample = `function Swatch({ ref }: { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} />;
}

const ref = useRef(null);
<Swatch ref={ref} />;
`;

function RefAsPropPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="Ref can now be a regular prop on function components, reducing the need for forwardRef."
      bullets={[
        "Pass refs to any function component.",
        "Access the ref like a normal prop.",
        "Reduce wrapper components in UI systems.",
      ]}
      example={<RefAsPropExample />}
      code={<CodeBlock title="ref as prop" code={codeSample} />}
    />
  );
}

type SwatchProps = {
  label: string;
  ref?: React.Ref<HTMLDivElement>;
};

function Swatch({ label, ref }: SwatchProps) {
  return (
    <div
      ref={ref}
      className="flex h-20 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-xs text-muted-foreground"
    >
      {label}
    </div>
  );
}

function RefAsPropExample() {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [pulses, setPulses] = useState(0);

  const pulse = () => {
    swatchRef.current?.animate(
      [
        { transform: "scale(1)", boxShadow: "0 0 0 0 oklch(0.7 0.2 150 / 0.5)" },
        { transform: "scale(1.02)", boxShadow: "0 0 0 12px transparent" },
      ],
      { duration: 500, easing: "ease-out" },
    );
    setPulses((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Ref target</span>
        <Badge variant="secondary">{pulses} pulses</Badge>
      </div>
      <Swatch ref={swatchRef} label="Ref attached here" />
      <Button onClick={pulse} variant="outline">
        Pulse ref
      </Button>
    </div>
  );
}
