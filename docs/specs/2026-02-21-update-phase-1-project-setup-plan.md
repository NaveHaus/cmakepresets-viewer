## Goal
Revise `docs/plans/2026-02-20--00-execute-project-setup.md` so Phase 1 (“Project Setup”) of `docs/specs/2026-02-20--02-initial-mvp.md` is:
- **TypeScript-first**
- Uses **npm**
- Includes **Vitest + a smoke test**
- Adds **ESLint + Prettier**
- Broken into **1–2 commit-sized tasks** with clear validation steps.

## Current plan gaps (why changes are needed)
- Assumes Debian `apt` + `npm`; Phase 1 needs to be Windows/Linux friendly and you chose **npm**.
- Doesn’t set up **TypeScript** (tsconfig, module target, build output) even though later phases call for TS core logic.
- No **lint/format** even though you requested it.
- Too many commits (4) and some commits are overly broad (`git add .`).

## Proposed new plan structure (1–2 commits)
### Prerequisites (verify core tools)
Before starting the plan, verify the core tools are installed.

**Check commands:**
- `node --version`
- `npm --version`
- `git --version`

**If any command is missing or fails:**
- Prompt the user to install the missing tool(s) using the appropriate OS/package manager (e.g., Windows installer, `winget`, `brew`, `apt`, etc.).
- Re-run the check commands until they succeed then ask if the user would like to continue.

**Stop point:**
Once all checks pass, continue with the plan steps below.

### Commit 1 — “build: bootstrap TS project tooling”
**Scope (files/dirs):**
- Create: `src/`, `tests/`, `dist/` (or prefer `dist/` as build output only)
- Add: `.gitignore`
- Initialize: `package.json` via `npm init`
- Install dev deps: `typescript`, `vitest`, `@types/node`
- Add config:
  - `tsconfig.json`
  - `vitest.config.ts`
- Add `package.json` scripts:
  - `test`: `vitest`
  - `test:run`: `vitest run`
  - `typecheck`: `tsc -p . --noEmit`

**Validation:**
- `npm test:run` succeeds (even if no tests yet, Vitest should run cleanly)
- `npm typecheck` succeeds.

**Commit:**
- `git status`
- `git add <only files listed in scope>`
- `git commit -m "build: bootstrap TS project tooling"`

### Commit 2 — “build: add eslint+prettier and test smoke”
**Scope:**
- Install dev deps:
  - `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-config-prettier`
  - `prettier`
- Add config:
  - `eslint.config.js` (flat config) targeting TS
  - `.prettierrc` (or `prettier.config.js`)
- Add scripts:
  - `lint`: `eslint .`
  - `format`: `prettier . --check`
  - `format:write`: `prettier . --write`
- Add initial test: `tests/smoke.test.ts` with a trivial assertion.

**Validation:**
- `npm test:run` passes
- `npm lint` passes
- `npm format` passes

**Commit:**
- `git status`
- `git add <only files listed in scope>`
- `git commit -m "build: add eslint+prettier and test smoke"`

## Editing rules for the plan doc
- Replace Debian-specific prerequisite with a cross-platform prerequisite note: “Install Node.js (>=18/20) and npm”.
- Avoid `git add .`; stage only relevant files per commit.
- Keep steps explicit (commands + expected result), suitable for someone to follow verbatim.

## Deliverable
Update only `docs/plans/2026-02-20--00-execute-project-setup.md` to reflect the above two-commit plan, including commands and validations.
