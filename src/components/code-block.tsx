import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CodeBlockProps = {
  title: string;
  code: string;
  caption?: string;
};

export function CodeBlock({ title, code, caption }: CodeBlockProps) {
  return (
    <Card className="border-border/70 bg-card/70">
      <CardHeader className="space-y-1">
        <CardTitle className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </CardTitle>
        {caption ? (
          <div className="text-xs text-muted-foreground">{caption}</div>
        ) : null}
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-background/80 p-4 text-xs leading-relaxed text-foreground shadow-inner">
          <code className="font-mono">{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
