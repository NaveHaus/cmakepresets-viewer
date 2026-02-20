**Prerequisite: Install Tools**
*   Install Node.js and npm. On a Debian-based system, this can be done with `sudo apt update && sudo apt install nodejs npm`.

**Execution Plan**

**Step 1: Initialize Project**

*   **Actions:**
    *   Create the `src`, `tests`, and `dist` directories.
    *   Run `npm init -y` to create a `package.json` file.
*   **Commit Message:** `build: initialize project`

**Step 2: Install and Configure Vitest**

*   **Actions:**
    *   Run `npm install -D vitest`.
    *   Create a `vitest.config.ts` file.
    *   Add a `"test": "vitest"` script to `package.json`.
    *   Run `npm test` to verify that Vitest runs without errors.
*   **Commit Message:** `build: install and configure vitest`

**Step 3: Create Initial Test**

*   **Actions:**
    *   Create a simple test file in the `tests/` directory.
    *   Run `npm test` to verify the test passes.
*   **Commit Message:** `test: add initial test`