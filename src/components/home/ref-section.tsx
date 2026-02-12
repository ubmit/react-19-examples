import { CodeTag, DocSection } from "@/components/home/doc-section";
import { type Ref, useRef } from "react";

function MyInput({ placeholder, ref }: { placeholder: string; ref?: Ref<HTMLInputElement> }) {
  return (
    <input
      className="h-9 w-full rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-base outline-none md:text-sm"
      placeholder={placeholder}
      ref={ref}
    />
  );
}

export function RefSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const callbackRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    return () => {
      inputRef.current = null;
    };
  };

  return (
    <DocSection
      id="ref-prop"
      title={
        <>
          <CodeTag className="text-2xl">ref</CodeTag> as a prop
        </>
      }
      lede="Function components can now receive ref directly."
      className="delay-300"
    >
      <p className="text-sm text-muted-foreground">
        Callback refs can return cleanup, so unmount behavior stays local.
      </p>
      <div className="mt-4">
        <MyInput placeholder="Enter text" ref={callbackRef} />
      </div>
    </DocSection>
  );
}
