# Agent Best Practices

This document outlines best practices for agents working on this project.

## Project Overview

This project is a viewer for CMake Presets files. The goal is to create a tool that visualizes `CMakePresets.json` and `CMakeUserPresets.json` files as an **interactive graph** (D3.js). The final output is a **self-contained HTML file** compatible with Windows and Linux.

## Tech Stack & Architecture

-   **Core Logic:** TypeScript module for parsing and graph data generation.
-   **UI Layer:** HTML/D3.js for rendering, isolated from parsing logic.
-   **Testing:** Vitest for Test-Driven Development (TDD).

## Guidelines

### Planning

-   **Consult Plans:** Always check `docs/plans` and `docs/specs` before starting new tasks or architectural changes.

### Execution

-   **TDD First:** Use Test-Driven Development for all core logic. Write failing tests in `tests/` before implementation.
-   **Separation of Concerns:** Keep core parsing logic independent of the UI layer to allow future integration with tools like VS Code.
-   **Git Commit Messages:** Always use `conventional-commits` when available. ONLY use the general Conventional Commits specification when the skill is not available.
-   **Confirm Before Execution:** Always prompt for confirmation from the user before proceeding with an execution plan. This ensures that all prerequisites are met and that the user has a chance to review the plan before any changes are made.

### Communication

### Requirements
The following requirements OVERRIDE any other conflicting instructions. When in doubt about the applicability of a requirement, ask the user.
- Do NOT include "Co-authored-by" lines in commit messages.
- ALWAYS format new plan (`docs/plan`) or spec (`docs/specs`) filenames as `YYYY-MM-DD--NN-<short, descriptive filename>.md`, where NN is a two-digit, monotonically increasing integer index that ensures unique filenames generated on the same day.