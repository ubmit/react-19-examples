export type FeatureCategory = "Server API" | "Client API" | "Improvement";

export type React19Feature = {
  id: string;
  title: string;
  category: FeatureCategory;
  summary: string;
  path: string;
  apiLabel: string;
};

export const react19Features: React19Feature[] = [
  {
    id: "server-actions",
    title: "Server Actions",
    category: "Server API",
    summary: "Run async mutations on the server, called from client UI.",
    path: "/server-actions",
    apiLabel: "Server",
  },
  {
    id: "use-action-state",
    title: "useActionState",
    category: "Client API",
    summary: "Derive UI state from an async action result.",
    path: "/useActionState",
    apiLabel: "Client",
  },
  {
    id: "action-formaction-props",
    title: "action & formAction props",
    category: "Client API",
    summary: "Wire actions directly to forms, buttons, and inputs.",
    path: "/action-formAction",
    apiLabel: "Client",
  },
  {
    id: "preloading-apis",
    title: "Preloading APIs",
    category: "Improvement",
    summary: "Use preload hints like DNS prefetch and preconnect.",
    path: "/preloading-apis",
    apiLabel: "Platform",
  },
  {
    id: "async-transitions",
    title: "Asynchronous Transitions",
    category: "Client API",
    summary: "Pass async functions to startTransition for smoother UI.",
    path: "/async-transitions",
    apiLabel: "Client",
  },
  {
    id: "react-server-components",
    title: "React Server Components",
    category: "Server API",
    summary: "Render components on the server, stream to client.",
    path: "/react-server-components",
    apiLabel: "Server",
  },
  {
    id: "use-api",
    title: "use API",
    category: "Client API",
    summary: "Read a Promise or Context value directly in render.",
    path: "/use",
    apiLabel: "Client",
  },
  {
    id: "actions",
    title: "Actions",
    category: "Client API",
    summary: "Action functions that trigger transitions.",
    path: "/actions",
    apiLabel: "Client",
  },
  {
    id: "ref-as-prop",
    title: "ref as prop",
    category: "Improvement",
    summary: "Pass refs to function components as a normal prop.",
    path: "/ref-as-prop",
    apiLabel: "Platform",
  },
  {
    id: "use-optimistic",
    title: "useOptimistic",
    category: "Client API",
    summary: "Optimistically update UI before an action completes.",
    path: "/useOptimistic",
    apiLabel: "Client",
  },
  {
    id: "metadata-stylesheet",
    title: "Metadata & Stylesheet Support",
    category: "Improvement",
    summary: "Manage <title>, <meta>, and <link> from components.",
    path: "/metadata-stylesheet",
    apiLabel: "Platform",
  },
  {
    id: "use-form-status",
    title: "useFormStatus",
    category: "Client API",
    summary: "Read status of the latest form submission.",
    path: "/useFormStatus",
    apiLabel: "Client",
  },
];

export function getReact19Feature(id: React19Feature["id"]) {
  const feature = react19Features.find((item) => item.id === id);

  if (!feature) {
    throw new Error(`Unknown React 19 feature: ${id}`);
  }

  return feature;
}
