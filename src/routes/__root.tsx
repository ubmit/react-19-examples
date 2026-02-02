import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DocsShell } from "@/components/docs-shell";

const RootLayout = () => (
  <>
    <DocsShell>
      <Outlet />
    </DocsShell>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
