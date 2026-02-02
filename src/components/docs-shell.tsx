import { Link, useRouterState } from "@tanstack/react-router";

import { react19Features } from "@/lib/react-19-features";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DocsShellProps = {
  children: React.ReactNode;
};

export function DocsShell({ children }: DocsShellProps) {
  return (
    <div className="min-h-screen">
      <DocsHeader />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-16 pt-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
        <aside className="h-full rounded-2xl border border-border/70 bg-card/60 p-4 shadow-[0_25px_60px_-48px_oklch(0.1_0.05_240/0.6)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Features
            </div>
            <Badge variant="secondary" className="text-[10px]">
              {react19Features.length}
            </Badge>
          </div>
          <Separator className="my-4" />
          <FeatureNav />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

function DocsHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-primary/10 text-sm font-semibold text-primary">
            R19
          </div>
          <div>
            <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
              React 19 Field Guide
            </Link>
            <div className="text-xs text-muted-foreground">
              Interactive notes for the newest APIs
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="bg-background/60">
            Dev Docs
          </Badge>
          <Badge variant="secondary">Experimental Friendly</Badge>
          <span className="hidden sm:inline">Updated for React 19</span>
        </div>
      </div>
    </header>
  );
}

function FeatureNav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="flex flex-col gap-2">
      {react19Features.map((feature) => {
        const isActive = pathname === feature.path;

        return (
          <Link
            key={feature.id}
            to={feature.path}
            className={cn(
              "group rounded-xl border border-transparent px-3 py-2 transition",
              "hover:border-border/80 hover:bg-accent/40",
              isActive && "border-primary/40 bg-primary/10",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">{feature.title}</span>
              <Badge variant={isActive ? "default" : "secondary"} className="text-[10px]">
                {feature.apiLabel}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{feature.summary}</p>
          </Link>
        );
      })}
    </nav>
  );
}
