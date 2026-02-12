import { CodeTag, DocSection } from "@/components/home/doc-section";
import { sleep } from "@/lib/utils";
import { createContext, Suspense, type ReactNode, use } from "react";

async function fetchComments() {
  await sleep(3000);
  return [
    { id: 1, text: "foo" },
    { id: 2, text: "bar" },
  ];
}

function Comments({
  commentsPromise,
}: {
  commentsPromise: Promise<{ id: number; text: string }[]>;
}) {
  const comments = use(commentsPromise);

  return (
    <ul className="space-y-2">
      {comments.map((comment) => (
        <li key={comment.id} className="border-l-2 border-primary/60 pl-3 text-sm md:text-base">
          {comment.text}
        </li>
      ))}
    </ul>
  );
}

const ThemeContext = createContext({ color: "var(--accent)" });

function Heading({ children }: { children: ReactNode }) {
  if (children == null) return null;
  const theme = use(ThemeContext);
  return (
    <h3 className="font-serif text-2xl leading-none" style={{ color: theme.color }}>
      {children}
    </h3>
  );
}

export function UseSection() {
  const commentsPromise = fetchComments();

  return (
    <DocSection
      id="use-api"
      title={
        <>
          <CodeTag className="text-2xl">use</CodeTag> API
        </>
      }
      lede="Read resources and context without imperative effect plumbing."
      className="delay-200"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <CodeTag>use</CodeTag> suspends until a promise resolves:
        </p>
        <Suspense
          fallback={<p className="text-sm italic text-muted-foreground">Loading comments...</p>}
        >
          <Comments commentsPromise={commentsPromise} />
        </Suspense>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-sm text-muted-foreground">
          It also reads context conditionally, even after early returns.
        </p>
        <Heading>Hello World</Heading>
      </div>
    </DocSection>
  );
}
