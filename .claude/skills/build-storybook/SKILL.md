---
name: build-storybook
description: Build a new RN Storybook Hub component end-to-end — web reference implementation, RN package port, and Packages catalog entry. Use when the user says "build storybook <ComponentName>", "/build-storybook <prompt>", or asks to add a new component to the Hub.
trigger: storybook 
---

# Build Storybook

Runs the full pipeline this repo uses for every component: design + implement the
web reference version, verify it live, port it to a `.rnstorybook` package, then
wire it into the `/packages` catalog page. This mirrors the manual flow already
used for Button, Card, Checkbox, Dialog, ListView, PageView, SegmentedControl,
Snackbar, TextField — follow the same shape for consistency.

## Trigger

`ARGUMENTS` is the component name plus any state/behavior requirements, e.g.:

```
build storybook Switch, đầy đủ state
```

If the component already exists (check `src/components/ui/` and `packages/`), treat
this as an update pass instead of a fresh build — still run all 4 steps below.

## Step 1 — Build the web component via ui-ux-pro-max

Invoke the `ui-ux-pro-max` skill with the component request:

```
Skill(ui-ux-pro-max, "build <ComponentName>, <requirements from ARGUMENTS>")
```

Follow that skill's own workflow (design-system query if it's a new visual pattern,
domain searches for `ux`/`style` as needed). Implement the component in
`src/components/ui/<ComponentName>.tsx`, matching this repo's established
conventions:

- Dark theme tokens consistent with existing components (slate background, emerald
  accent, red/amber/indigo for error/warning/confirmation semantics).
- Every interactive element: hover, pressed/active, focus-visible ring, disabled
  (opacity 50%), and any state explicitly requested (loading, error, success,
  indeterminate, etc).
- Animation via `transform`/`opacity` only, 150–300ms, `motion-reduce:` variants or
  a `prefers-reduced-motion` check — never skip this.
- 44×44px touch targets on anything clickable, even icon-only controls.
- No emoji as icons — inline SVG.

**Verify before moving on** — this is not optional, it's where every real bug in
this repo's history was caught:

1. `pnpm exec tsc --noEmit` must be clean.
2. Write a throwaway demo (`src/<ComponentName>Demo.tsx`), temporarily swap it into
   `src/main.tsx`, run `pnpm dev`, and drive every state through Playwright
   (click, hover, keyboard, screenshot). Check computed styles/attributes, not just
   pixels, when a state isn't visually obvious (e.g. `getComputedStyle().transform`,
   `element.indeterminate`, `aria-*` attributes).
3. unit tests: `pnpm exec vitest run` must be clean. If the component is purely visual
and has no logic to test, add a single smoke test that renders it and checks for
the presence of a key element (e.g. `expect(screen.getByRole('button')).toBeInTheDocument()`).
4. Delete the demo file and revert `main.tsx` back to `<App />` once verified.

If Playwright surfaces a real interaction bug (stale closures, event capture
stealing clicks, CSS selector not matching due to DOM nesting, etc.), fix it before
continuing — don't port a known-broken component.


## Step 2 — Sync / port to the RN package

Scaffold if it doesn't exist yet:

```bash
pnpm scaffold <ComponentName>
```

Then port the verified web implementation into
`packages/<ComponentName>.rnstorybook/src/`:

- `<ComponentName>.types.ts` — same prop shape as the web version, adapted to RN
  idioms (`onPress` not `onClick`, `secureTextEntry` not `type="password"`, etc).
- `<ComponentName>.styles.ts` — same color tokens as the web `Dialog`/`Snackbar`/etc
  packages, `StyleSheet.create`.
- `<ComponentName>.tsx` — RN primitives (`Pressable`, `Animated`, `FlatList`,
  `PanResponder`/`Keyboard`/`AccessibilityInfo` as needed). Do not assume gesture
  libraries beyond core `react-native` unless the component truly needs them.
- Update `stories/<ComponentName>.stories.tsx` with one story per state (mirror the
  web demo's states — don't ship the scaffold's empty `Default` story).
- Update `metadata.json`: `description`, `tags`, `category`, `packageName`.
- Update `src/index.ts` exports (component + all exported types).

Port state-for-state — every state verified in Step 1 needs an RN equivalent
(loading, error, disabled, focus, animation, etc), adapted to touch/native
patterns (e.g. hover → press feedback, keyboard nav → skip if no hardware keyboard
concept applies, CSS transition → `Animated.timing`/`Animated.spring`).

Run `pnpm exec tsc --noEmit` again after porting — the RN package is outside the
root tsconfig `include`, so this won't typecheck the RN files themselves, but it
confirms the port didn't break anything in `src/`. RN-specific type errors have to
be caught by inspection since `react-native` types aren't installed in this repo.

## Step 3 — Add to the Packages catalog

1. Add an entry to `src/data/packages.ts` (`slug`, `name`, `packageName`, matching
   `version`/`description`/`tags`/`category` from the package's `metadata.json`,
   `installCommand`, and an `usage` snippet showing realistic props).
2. Create `src/pages/packages/components/playgrounds/<ComponentName>Playground.tsx`
   — a **live, editable** preview using the web component from Step 1 (not a static
   mock). Give it real controls (select/checkbox/input) for the props most worth
   demonstrating, matching the density of existing playgrounds (Button: variant/
   size/label/disabled/loading; Dialog: variant/title/description/footer; ListView:
   scenario buttons for success/empty/error).
3. Wire it into `playgroundBySlug` in
   `src/pages/packages/components/PackageCard.tsx` (import + map entry, keep the
   map alphabetically sorted by slug like the existing entries).

## Step 4 — Final verification

1. `pnpm exec tsc --noEmit` clean.
2. `pnpm dev`, load `/packages`, screenshot full page — confirm the new card
   renders with the right count in the "N published components" header.
3. Exercise the new playground's controls via Playwright — confirm the live
   preview actually responds (not just that the page renders).
4. Kill the dev server.

## Reporting back

Summarize in the same terse shape used throughout this repo's history: what got
built, what states are covered, what bug (if any) was caught during verification,
and what's NOT done yet (e.g. "chưa port sang RN" if the user only asked for the
web half). Don't claim a step is done without having actually run the verification
for it in this conversation.
