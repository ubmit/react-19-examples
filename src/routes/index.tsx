import { ActionsSection } from "@/components/home/actions-section";
import { Hero } from "@/components/home/hero";
import { RefSection } from "@/components/home/ref-section";
import { UseDeferredValueSection } from "@/components/home/use-deferred-value-section";
import { UseSection } from "@/components/home/use-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <article className="mx-auto max-w-5xl px-5 py-8 md:px-10 md:py-14">
        <Hero />
        <ActionsSection />
        <UseSection />
        <RefSection />
        <UseDeferredValueSection />
      </article>
    </main>
  );
}
