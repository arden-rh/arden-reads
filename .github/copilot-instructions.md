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
- Use `npm run dev` as the Playwright MCP base URL when the task requires live editing or inspecting state interactively. Use the preview flow defined in `playwright.config.ts` when the task is to validate behavior in a way that mirrors CI test runs.

## High-level architecture

- This is a SvelteKit app built with Svelte 5 runes, Tailwind 4, and PocketBase. The app is deployed with the Vercel adapter, while PocketBase is hosted separately and accessed through `VITE_RAILWAY_API_APP_URL`. If `VITE_RAILWAY_API_APP_URL` is not defined, all PocketBase requests will fail. Ensure a `.env` file with this variable is present before running `npm run dev` or any test command that triggers server-side load functions.
- The main data pipeline starts in `src/routes/+layout.server.ts`. That server load logs into PocketBase as an admin, fetches global `books` data, fetches year/current-month/previous-month slices, checks the `pb_token` cookie for user login state, and returns shared data for the whole route tree.
- `src/routes/+layout.ts` is the client-side normalization layer for that shared data. It converts PocketBase `RecordModel` results into plain `Book` objects via `src/lib/functions/createBook*.ts`, derives shared aggregates like total pages, minutes, authors, genres, and formats, and updates `currentParams` in `src/states.svelte.ts`.

### Adding a new data field: decision table

When adding a new data field to the pipeline:

1. **Fetch it in `src/routes/+layout.server.ts`** – Query PocketBase or compute the value here.
2. **Convert it in `src/routes/+layout.ts`** – Use or create a `createBook*` helper to normalize the raw data into the `Book` type.
3. **Expose it via the layout `data` prop** – Return it from `+layout.ts` so all child routes access it.
4. **Consume it in the relevant page component** – Reference the field via the inherited layout `data` prop.

Do not skip layers; skipping normalization or fetch layers causes type mismatches or stale data.
- The root layout component in `src/routes/+layout.svelte` owns the global frame: metadata, navigation, calendar menu, spinner during navigation, footer login/logout actions, and the conditional "Add book" link for logged-in users.
- Route-specific pages build on the shared layout data:
  - `src/routes/[year=yearMatch]/+page.ts` only adds year-specific metadata.
  - `src/routes/[year=yearMatch]/[month=monthMatch]/+page.server.ts` performs the month-specific PocketBase queries, calculates whether the route points at a future month, and loads the month's favourite book.
  - `src/routes/[year=yearMatch]/[month=monthMatch]/+page.ts` converts those month query results into typed `Book` data and derived author/genre/format lists for the UI.
- Authentication is split intentionally in `src/lib/pocketbase.ts`: `adminPb` is the long-lived server-side client used for reads and admin-only writes, while `userPb` is a separate client used only for login/logout so clearing user auth does not wipe the admin session.
- Book creation is a server action flow. `src/lib/components/BookForm.svelte` collects the UI state, `src/routes/create-book/+page.svelte` **manually posts the form and applies the action result directly** (intentionally without `use:enhance`), and `src/routes/create-book/+page.server.ts` validates/parses the payload with `src/lib/functions/createBookRecord.ts` before writing to PocketBase. Do not refactor this to use `use:enhance` — the manual fetch is needed to handle the action result explicitly.

## PocketBase schema changes

When the PocketBase `books` collection schema changes (adding or removing fields), update all of the following in sync to avoid runtime type mismatches:
1. The `Book` type definition in `src/lib/types.ts`.
2. Conversion helpers `src/lib/functions/createBook.ts` and `src/lib/functions/createBookList.ts`.
3. Validation logic in `src/lib/functions/createBookRecord.ts`.
4. Form fields and bindings in `src/lib/components/BookForm.svelte`.

## Key conventions

- Use Svelte 5 rune APIs consistently. This repo uses `$state`, `$derived`, `$effect`, and `$props` in components. Shared UI state (`menu` and `activeState`) is managed via Svelte context: `setAppContext()` is called once in `src/routes/+layout.svelte` and child components access it with `getAppContext()` from `src/lib/appContext.svelte.ts`. **Do not introduce SvelteKit stores anywhere in this repo.** Current route params (`year`, `month`) are read directly from the reactive `page` object imported from `$app/state` — no custom state needed for them.
- Never pass raw PocketBase `RecordModel` objects directly to Svelte components. Always convert them using `createBook.ts` or `createBookList.ts` before passing data to the UI layer. The only exception is inside server load functions before the conversion step.
- Login state is tracked in two places on purpose: the server trusts the `pb_token` cookie, while the client mirrors that status into `activeState.loggedIn` for layout/login UI updates.
- Multi-select form data is serialized through hidden JSON fields. `BookForm.svelte` stores selected formats/genres in rune state, writes them into hidden `formats` and `genres` inputs, and `createBookRecord.ts` expects those fields to be JSON arrays.
- Year and month routing is tightly constrained by matcher files in `src/params/`. If a new reading year is added, update both `src/params/yearMatch.ts` and the temporary redirect in `src/hooks.server.ts` so the new year is routable without the forced `/2027 -> /2026` fallback.
- Dynamic data pages are intentionally not prerendered (`prerender = false`) because they depend on runtime PocketBase data and authentication state.
