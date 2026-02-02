# React 19 – New Features

## Server Actions (Server API)

Executed on the server, called from the client.

```js
async function action() {
  "use server";
}
```

## useActionState (Client API)

Update state based on the result of an action.

## action & formAction props (Client API)

Integrate actions with forms, buttons, and inputs.

## Preloading APIs (Improvement)

Use browser hints within components.

```js
prefetchDNS("https://...");
preconnect("https://...");
```

## Asynchronous Transitions (Client API)

Pass async functions to startTransition.

## React Server Components (Server API)

Render React components separate from the client.

## use API (Client API)

Read the value of a Promise or Context.

```js
const data = use(promise);
const ctx = use(Context);
```

## Actions (Client API)

Functions that trigger transitions.

## ref as prop (Improvement)

Use ref as a normal prop for function components.

## useOptimistic (Client API)

Update the UI before an action completes.

## Metadata & Stylesheet Support (Improvement)

Manage <title>, <meta>, and <link> from components.

## useFormStatus (Client API)

Get status of the latest form submission.
