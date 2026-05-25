# Copilot instructions for `arden-reads`

## Build, test, and lint commands

- Install dependencies with `npm ci` (the repo uses `package-lock.json`).
- Start local dev with `npm run dev`.
- Run type/Svelte checks with `npm run check`.
- Run linting with `npm run lint`.
- Fix formatting with `npm run format`.
- Build the production app with `npm run build`.
- Run the full test suite with `npm test`.
- Run only unit tests with `npm run test:unit -- --run`.
- Run a single unit test file with `npx vitest src/index.test.ts --run`.
- Run a single named unit test with `npx vitest src/index.test.ts -t "adds 1 + 2 to equal 3" --run`.
- Run integration tests with `npm run test:integration`.
- If Playwright browsers are missing in the environment, install them with `npx playwright install`.
- Run a single Playwright spec with `npx playwright test tests/test.ts`.
- Run a single Playwright test by name with `npx playwright test -g "home page has expected h1"`.

## Relevant MCP server

- Playwright MCP is a strong fit for this repo when a task needs real browser interaction instead of static code changes, especially for validating the calendar/menu flow in `src/routes/+layout.svelte`, login and logout behavior in `src/routes/login/+page.svelte`, and the create-book form flow in `src/routes/create-book/+page.svelte`.
- When using Playwright MCP here, point it at a local app started with `npm run dev` for interactive debugging, or rely on the existing preview flow used by `playwright.config.ts` for test-like runs.

## High-level architecture

- This is a SvelteKit app built with Svelte 5 runes, Tailwind 4, and PocketBase. The app is deployed with the Vercel adapter, while PocketBase is hosted separately and accessed through `VITE_RAILWAY_API_APP_URL`.
- The main data pipeline starts in `src/routes/+layout.server.ts`. That server load logs into PocketBase as an admin, fetches global `books` data, fetches year/current-month/previous-month slices, checks the `pb_token` cookie for user login state, and returns shared data for the whole route tree.
- `src/routes/+layout.ts` is the client-side normalization layer for that shared data. It converts PocketBase `RecordModel` results into plain `Book` objects via `src/lib/functions/createBook*.ts`, derives shared aggregates like total pages, minutes, authors, genres, and formats, and updates `currentParams` in `src/states.svelte.ts`.
- The root layout component in `src/routes/+layout.svelte` owns the global frame: metadata, navigation, calendar menu, spinner during navigation, footer login/logout actions, and the conditional "Add book" link for logged-in users.
- Route-specific pages build on the shared layout data:
  - `src/routes/[year=yearMatch]/+page.ts` only adds year-specific metadata.
  - `src/routes/[year=yearMatch]/[month=monthMatch]/+page.server.ts` performs the month-specific PocketBase queries, calculates whether the route points at a future month, and loads the month's favourite book.
  - `src/routes/[year=yearMatch]/[month=monthMatch]/+page.ts` converts those month query results into typed `Book` data and derived author/genre/format lists for the UI.
- Authentication is split intentionally in `src/lib/pocketbase.ts`: `adminPb` is the long-lived server-side client used for reads and admin-only writes, while `userPb` is a separate client used only for login/logout so clearing user auth does not wipe the admin session.
- Book creation is a server action flow. `src/lib/components/BookForm.svelte` collects the UI state, `src/routes/create-book/+page.svelte` manually posts the form and applies the action result, and `src/routes/create-book/+page.server.ts` validates/parses the payload with `src/lib/functions/createBookRecord.ts` before writing to PocketBase.

## Key conventions

- Use Svelte 5 rune APIs consistently. This repo uses `$state`, `$derived`, `$effect`, and `$props` in components and in `src/states.svelte.ts` instead of classic Svelte stores for shared UI state.
- Keep raw PocketBase records out of components when possible. Shared helpers in `src/lib/functions/createBook.ts` and `src/lib/functions/createBookList.ts` are the normal place to convert `RecordModel` or list results into the local `Book` type before computing stats or rendering UI.
- Login state is tracked in two places on purpose: the server trusts the `pb_token` cookie, while the client mirrors that status into `activeState.loggedIn` for layout/login UI updates.
- Multi-select form data is serialized through hidden JSON fields. `BookForm.svelte` stores selected formats/genres in rune state, writes them into hidden `formats` and `genres` inputs, and `createBookRecord.ts` expects those fields to be JSON arrays.
- Year and month routing is tightly constrained by matcher files in `src/params/`. If a new reading year is added, update both `src/params/yearMatch.ts` and the temporary redirect in `src/hooks.server.ts` so the new year is routable without the forced `/2027 -> /2026` fallback.
- Dynamic data pages are intentionally not prerendered (`prerender = false`) because they depend on runtime PocketBase data and authentication state.
