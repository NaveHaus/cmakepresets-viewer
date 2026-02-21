# Phase 2 (Core Logic) — Detailed Implementation Plan

## Phase 2 scope (per your decisions)
- **Preset kinds included:** `configurePresets`, `buildPresets`, `testPresets`, `packagePresets`.
- **Relationship modeling:** **one edge per parent** (if `inherits: ["A","B"]` then edges `X→A` and `X→B`).
- **Non-goals for Phase 2:** following `include`, file I/O, UI rendering, zoom/pan, bundling.

## Guiding design constraints
- Core logic is UI-agnostic TypeScript in `src/`.
- TDD-first: each step below starts with tests in `tests/`.
- Keep each step independently shippable (1–2 days) with its own validation gates.

---

## Step 2.1 (1–2 days): Define core types + minimal parser for a single file ✅ Completed
### Deliverables
- `src/core/types.ts`
  - `PresetKind` union: `"configure" | "build" | "test" | "package"`.
  - `PresetBase` fields we care about for MVP graphing:
    - `name: string` (required)
    - `inherits?: string[]`
    - `hidden?: boolean`
    - `displayName?: string`
    - `description?: string`
  - `Preset` = `PresetBase & { kind: PresetKind }`.
  - `ParsedPresets` containing arrays (or a map) for these kinds.
- `src/core/parse.ts`
  - `parsePresetsJson(text: string): ParsedPresets`
  - Responsibilities:
    - JSON.parse
    - Extract each preset array if present; ignore unknown top-level fields
    - Validate **minimal shape** (array items must be objects, `name` must be string; `inherits` if present must be string[]) and normalize `inherits` to `string[] | undefined`.

### Tests (Vitest)
- `tests/parse.test.ts`
  - invalid JSON throws (or returns error result—see API choice below)
  - missing arrays returns empty
  - `inherits` accepts string[] only; rejects/throws on other types
  - basic extraction for each of the 4 preset arrays

### Validation gates
- `npm run test:run`
- `npm run typecheck`
- `npm run lint`
- `npm run format`

---

## Step 2.2 (1–2 days): Build graph model from parsed presets (single file) ✅ Completed
### Deliverables
- `src/core/graph.ts`
  - `GraphNode`: `{ id: string; label: string; kind: PresetKind; meta?: { hidden?: boolean; displayName?: string; description?: string } }`
  - `GraphEdge`: `{ from: string; to: string; type: "inherits" }` (one per parent)
  - `Graph`: `{ nodes: GraphNode[]; edges: GraphEdge[] }`
  - `buildGraph(parsed: ParsedPresets): Graph`
    - Internally build a `@dagrejs/graphlib` graph for storage/algorithms
    - Convert to the exported DTO (`Graph`) as the stable boundary
    - Create one node per preset
    - Create one edge per `inherits` parent (only if parent name is a string)

### Tests
- `tests/graph.test.ts`
  - nodes created for all preset kinds
  - edges created per parent (`inherits: ["a","b"]` => 2 edges)
  - preset with no `inherits` => no edges
  - (initial behavior choice) unknown parent names either:
    - still create edges to missing nodes **or**
    - skip edges to missing nodes

### Validation gates
- Same 4 commands

---

## Step 2.3 (1–2 days): Deterministic IDs + collisions across kinds ✅ Completed
(Names can collide across kinds; Phase 2 includes multiple kinds.)

### Deliverables
- Decide node `id` strategy:
  - **Option A (recommended):** `id = `${kind}:${name}` and keep `name` as label.
  - Provide helper `makePresetId(kind, name)`.
- Update `buildGraph` to use kind-scoped IDs.
- Define inheritance lookup semantics:
  - Since `inherits` is specified by name only, choose a resolution strategy:
    - **A:** within same kind first; if ambiguous across kinds, mark as unresolved
    - **B:** allow cross-kind only if exactly one match among all kinds
    - **C:** treat `inherits` as same-kind only (simplest)

### Tests
- `tests/ids.test.ts` (or extend `graph.test.ts`)
  - two presets with same `name` in different kinds produce distinct node IDs
  - inheritance resolution works per chosen strategy (incl. ambiguous case)

### Validation gates
- Same 4 commands

---

## Step 2.4 (1–2 days): Error reporting strategy (DX) + fixture-based tests ✅ Completed

### Deliverables
- Choose API error strategy (to stabilize for Phase 3 UI):
  - **Throwing API:** `parsePresetsJson` throws `ParseError` / `ValidationError`.
  - **Result API:** `parsePresetsJson` returns `{ ok: true, value } | { ok: false, error }`.
- Add `src/core/errors.ts` with typed errors or error codes.
- Add a small fixtures folder (e.g., `tests/fixtures/`) with representative JSON samples.

### Tests
- assert error type/message/code for:
  - invalid JSON
  - wrong types (`inherits` not array, `name` missing)
  - ambiguous inheritance (if applicable)

### Validation gates
- Same 4 commands

---

## Step 2.5 (1–2 days): Single public entrypoint for Phase 3 consumption ✅ Completed

### Deliverables
- `src/core/index.ts` exporting the stable API:
  - `parsePresetsJson`
  - `buildGraph`
  - `buildGraphFromText(text)` convenience
  - exported types (`Graph`, `GraphNode`, `GraphEdge`, `PresetKind`)

### Tests
- “happy path” integration test in `tests/core.integration.test.ts`:
  - build graph from a small JSON text containing multiple kinds and inherits

### Validation gates
- Same 4 commands

---

## Notes / explicit dependencies
- Phase 2 does **not** depend on any UI work.
- Phase 3 can consume `buildGraphFromText` and render nodes/edges.

## Open choices to confirm (quick)
- Node ID strategy (recommended `kind:name`).
- Inheritance resolution when multiple kinds contain the same name.
- Whether to keep edges to unknown parents (useful for surfacing “dangling inherits”) or drop them.