# Agent Best Practices

This document outlines best practices for agents working on this project.

## Project Overview

This project is a viewer for CMake Presets files. The goal is to create a tool that visualizes `CMakePresets.json` and `CMakeUserPresets.json` files as an **interactive graph** (D3.js). The final output is a **self-contained application** compatible with Windows and Linux.

## Tech Stack & Architecture

-   **Core Logic:** TypeScript module for parsing and graph data generation.
-   **UI Layer:** HTML/D3.js for rendering, isolated from parsing logic.
-   **Testing:** Vitest for Test-Driven Development (TDD).

## Guidelines

-   **TDD First:** Use Test-Driven Development for all core logic. Write failing tests in `tests/` before implementation.
-   **Separation of Concerns:** Keep core parsing logic independent of the UI layer to allow future integration with tools like VS Code.
-   **Git Commit Messages:** Always use `conventional-commits` when available. ONLY use the general Conventional Commits specification when the skill is not available.
-   **Confirm Before Execution:** Always prompt for confirmation from the user before executing a plan.
-   **Specs and Plans:**
  -   **Specs:** Create and use spec files (`docs/specs`) to specify WHAT must be done to complete a task.
  -   **Plans:** Create and use plan files (`docs/plans`) to specify HOW to complete a task.

## Requirements
The following requirements OVERRIDE any other conflicting instructions. When in doubt about the applicability of a requirement, ask the user.

- Do NOT include "Co-authored-by" lines in commit messages.
- ALWAYS format new plan (`docs/plan`) or spec (`docs/specs`) filenames as `YYYY-MM-DD--NN-<short, descriptive filename>.md`, where NN is a two-digit, monotonically increasing integer index that ensures unique filenames generated on the same day.

## Mistakes to Avoid
- To execute commands on Windows, prefer PowerShell 7 cmdlets over bash commands.
- Do not store plans or specs outside `docs/plans` and `docs/specs`.