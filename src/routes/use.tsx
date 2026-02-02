import { createFileRoute } from "@tanstack/react-router";
import { Suspense, use, useState } from "react";

import { FeaturePage } from "@/components/feature-page";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReact19Feature } from "@/lib/react-19-features";

export const Route = createFileRoute("/use")({
  component: UseApiPage,
});

const feature = getReact19Feature("use-api");

const codeSample = `const data = use(fetchReport());
const theme = use(ThemeContext);
`;

type Report = {
  id: string;
  latency: number;
  status: string;
};

const createReport = () =>
  new Promise<Report>((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).slice(2, 8),
        latency: 80 + Math.floor(Math.random() * 60),
        status: "Healthy",
      });
    }, 700);
  });

function UseApiPage() {
  return (
    <FeaturePage
      feature={feature}
      intro="The use API lets you read Promise or Context values directly inside render."
      bullets={[
        "Suspend while async data resolves.",
        "Read Context with the same API.",
        "Keep async logic closer to the UI.",
      ]}
      example={<UseApiExample />}
      code={<CodeBlock title="use()" code={codeSample} />}
    />
  );
}

function UseApiExample() {
  const [promise, setPromise] = useState(() => createReport());

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Report status</span>
        <Badge variant="secondary">Suspense</Badge>
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
            Loading report…
          </div>
        }
      >
        <ReportCard promise={promise} />
      </Suspense>
      <Button variant="outline" onClick={() => setPromise(createReport())}>
        Refresh report
      </Button>
    </div>
  );
}

type ReportCardProps = {
  promise: Promise<Report>;
};

function ReportCard({ promise }: ReportCardProps) {
  const report = use(promise);

  return (
    <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground">
      <div className="flex items-center justify-between">
        <span>Report {report.id}</span>
        <Badge variant="default">{report.status}</Badge>
      </div>
      <div className="mt-2">Latency: {report.latency}ms</div>
    </div>
  );
}
