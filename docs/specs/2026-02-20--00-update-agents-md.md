I will update `AGENTS.md` to reflect the project's architectural decisions and workflows found in `docs/plans`.

### Proposed Changes to `AGENTS.md`:

1.  **Project Overview**:
    *   Clarify that the goal is an **interactive graph visualization**.
    *   Specify the output format: a **single, self-contained HTML file**.

2.  **Tech Stack & Architecture**:
    *   **Core Logic**: JavaScript/TypeScript module for parsing and graph generation.
    *   **UI Layer**: HTML/D3.js for rendering.
    *   **Testing**: Vitest.

3.  **Guidelines**:
    *   **Planning**:
        *   Consult `docs/plans` before starting new tasks.
    *   **Execution**:
        *   **TDD First**: Implement core logic using Test-Driven Development.
        *   **Separation of Concerns**: Keep parsing logic separate from UI rendering code.
        *   **Git**: Use conventional commits (e.g., `type: subject`).
    *   **Communication**:
        *   (Keep existing) Confirm before execution.

I will use `Edit` to apply these changes to `AGENTS.md`.