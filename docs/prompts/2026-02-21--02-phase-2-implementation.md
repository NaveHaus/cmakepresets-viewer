Proceed with implementing MVP Phase 2 with the following decisions:
- Node ID strategy (recommended `kind:name`).
  - Answer: Use `kind:name` for the node ID strategy.
- Inheritance resolution when multiple kinds contain the same name.
  - Answer: **C:** treat `inherits` as same-kind only because this is how CMake works.
- Whether to keep edges to unknown parents (useful for surfacing “dangling inherits”) or drop them.
  - Answer: Yes, keep edges to unknown parents, but add a property that marks the parent node as `missing`.

Read the phase-2-core-logic-plan and implement this phase. Make sure each step includes one or more `git commit` actions with appropriate conventional-commits messages. A commit should be made for each logical group of additions or changes, but at least one commit per step is required.

Once all steps are complete, we will review the changes. After a successful review, we will update the initial-mvp sepc to mark this phase as complete.