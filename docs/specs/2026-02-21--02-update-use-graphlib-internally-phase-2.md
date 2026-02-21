# Decision: graphlib only

Using `@dagrejs/graphlib` **does make sense** for the project, but based on your scope answers it should be introduced like this:

## Phase 2 (Core logic)
- Add **`@dagrejs/graphlib` only**.
- Use it **internally** to store nodes/edges and to support future algorithms (cycle detection, traversal, etc.).
- Keep the Phase 2 public output as a **simple DTO** (e.g. `{ nodes: [...], edges: [...] }`)
- Keep Phase 2 graph **semantic only** (no layout metadata).

## Phase 3 (UI)
- Re-evaluate rendering:
  - Use “plain” D3 for force-directed layout and more custom interactivity.

## Changes to the Phase 2 plan
- Step 2.2 (Graph building) will:
  - Build a `graphlib.Graph` internally.
  - Convert it to the exported DTO (`nodes` + `edges`) as the stable boundary.

If you approve this update, I’ll reflect it in the Phase 2 spec file before implementation starts.