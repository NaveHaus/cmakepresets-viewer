## Prerequisites (verify core tools)
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

## Commit 1 — “build: bootstrap TS project tooling”
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

**Steps:**
1. Create directories: `src/`, `tests/`, `dist/`.
2. Create `.gitignore` with standard Node.js ignores.
3. Initialize `package.json`:
   - `npm init -y`
4. Install dev dependencies:
   - `npm install -D typescript vitest @types/node`
5. Create `tsconfig.json` for TypeScript builds.
6. Create `vitest.config.ts` for Vitest.
7. Update `package.json` scripts to include `test`, `test:run`, and `typecheck`.

**Validation:**
- `npm test:run` succeeds (even if no tests yet, Vitest should run cleanly)
- `npm typecheck` succeeds.

**Commit:**
- `git status`
- `git add <only files listed in scope>`
- `git commit -m "build: bootstrap TS project tooling"`

## Commit 2 — “build: add eslint+prettier and test smoke”
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

**Steps:**
1. Install dev dependencies:
   - `npm install -D eslint @eslint/js typescript-eslint eslint-config-prettier prettier`
2. Add `eslint.config.js` with a TypeScript-focused flat config.
3. Add Prettier config (`.prettierrc` or `prettier.config.js`).
4. Update `package.json` scripts to include `lint`, `format`, and `format:write`.
5. Add `tests/smoke.test.ts` with a trivial assertion.

**Validation:**
- `npm test:run` passes
- `npm lint` passes
- `npm format` passes

**Commit:**
- `git status`
- `git add <only files listed in scope>`
- `git commit -m "build: add eslint+prettier and test smoke"`
