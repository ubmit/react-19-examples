import { CodeTag, DocSection } from "@/components/home/doc-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense, use, useDeferredValue, useState } from "react";

type SearchResult = { id: number; text: string };

async function fetchResults(query: string): Promise<SearchResult[]> {
  console.log("Fetching results for", query);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("awaited for fake delay, returning results");
  return [
    { id: 1, text: "Result 1" },
    { id: 2, text: "Result 2" },
    { id: 3, text: "Result 3" },
  ];
}

const searchResultsCache = new Map<string, Promise<SearchResult[]>>();

function getSearchResults(query: string) {
  const cached = searchResultsCache.get(query);
  if (cached) {
    return cached;
  }

  const promise = fetchResults(query);
  searchResultsCache.set(query, promise);

  return promise;
}

function SearchResults({ query }: { query: string }) {
  if (query === "") {
    return <p className="text-sm text-muted-foreground">Type a query to load deferred results.</p>;
  }

  const results = use(getSearchResults(query));

  if (results.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No results for <i>"{query}"</i>.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {results.map((result) => (
        <li key={result.id} className="border-l-2 border-primary/60 pl-3 text-sm md:text-base">
          {result.text}
        </li>
      ))}
    </ul>
  );
}

export function UseDeferredValueSection() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <DocSection
      id="use-deferred-value"
      title={
        <>
          <CodeTag className="text-2xl">useDeferredValue</CodeTag> initial value
        </>
      }
      lede="Keep input responsive while rendering suspenseful results."
      className="delay-300"
    >
      <div className="space-y-3">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          className="h-9 rounded-md border-border/80 bg-background/80"
          placeholder="Enter search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="mt-4">
        <Suspense
          fallback={
            <p className="text-sm italic text-muted-foreground">Loading search results...</p>
          }
        >
          <SearchResults query={deferredQuery} />
        </Suspense>
      </div>
    </DocSection>
  );
}
