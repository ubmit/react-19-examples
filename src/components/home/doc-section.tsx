import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DocSectionProps = {
  id: string;
  title: ReactNode;
  lede: string;
  className?: string;
  children: ReactNode;
};

export function DocSection({ id, title, lede, className, children }: DocSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mb-6 animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-lg backdrop-blur-sm duration-700 md:mb-8 md:p-7",
        className,
      )}
    >
      <header className="mb-5 border-b border-border/70 pb-4">
        <h2 className="font-serif text-3xl leading-none">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {lede}
        </p>
      </header>
      {children}
    </section>
  );
}

export function CodeTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function ExampleCard({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/70 bg-background/70 p-4 transition-transform duration-300 hover:-translate-y-0.5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">{note}</p>
      {children}
    </section>
  );
}
