**Prerequisite: Install Tools**
*   Install Node.js and npm. On a Debian-based system, this can be done with `sudo apt update && sudo apt install nodejs npm`.

**Execution Plan**

**Step 1: Create `.gitignore`**

*   **Actions:**
    *   Create a `.gitignore` file with standard Node.js project ignores.
    *   Run `git add .gitignore && git commit -m "build: add gitignore"`

**Step 2: Initialize Project**

*   **Actions:**
    *   Create the `src`, `tests`, and `dist` directories.
    *   Run `npm init -y` to create a `package.json` file.
    *   Run `git add . && git commit -m "build: initialize project"`

**Step 3: Install and Configure Vitest**

*   **Actions:**
    *   Run `npm install -D vitest`.
    *   Create a `vitest.config.ts` file.
    *   Add a `"test": "vitest"` script to `package.json`.
    *   Run `npm test` to verify that Vitest runs without errors.
    *   Run `git add . && git commit -m "build: install and configure vitest"`

**Step 4: Create Initial Test**

*   **Actions:**
    *   Create a simple test file in the `tests/` directory.
    *   Run `npm test` to verify the test passes.
    *   Run `git add . && git commit -m "test: add initial test"`
