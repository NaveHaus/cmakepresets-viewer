# Initial MVP Overview

This document outlines the high-level plan for creating a tool that visualizes CMake presets as an interactive graph.

## Requirements

*   The tool will parse a root `CMakePresets.json` file.
*   It will recursively follow `include` directives to find all preset definitions.
*   The presets will be displayed as an interactive graph, where each node is a preset and a directed edge from A to B indicates that A "inherits" from B.
*   The graph will support panning and zooming.
*   Each node will be labeled with the preset name.
*   The final output will be a self-contained application compatible with Windows and Linux.
*   The user will be able to specify the root presets file via the command line or a menu.

## Architecture

To facilitate future development, such as a VSCode extension, the application will be designed with a clear separation between the core logic and the user interface.

### Core Logic Module

A dedicated JavaScript/TypeScript module responsible for:
*   Parsing `CMakePresets.json` files.
*   Recursively handling `include` directives.
*   Building the graph data structure (nodes and edges).
*   Providing a simple, well-documented API to the UI layer.

### UI Layer

A separate module that handles all aspects of the user interface. For the initial version, it will:
*   Contain the HTML file with a file input.
*   Use the Core Logic Module's API to get the graph data.
*   Render the graph using a library like D3.js.
*   Handle user interactions like panning and zooming.

## Recommended Approach for Initial MVP

A **pure JavaScript/TypeScript web application** bundled into a **single HTML file**.

### Implementation Steps

1.  **Install Tools:**
    *   Install Node.js and npm. On a Debian-based system, this can be done with `sudo apt update && sudo apt install nodejs npm`.

2.  **Project Setup:**
    *   Set up the project structure with `src`, `tests`, and `dist` directories.
    *   Initialize a new project using `npm`.
    *   Install and configure `Vitest` as the testing framework.

3.  **Core Logic (Test-Driven Development):**
    *   **Write a Failing Test:** Start by writing a `Vitest` test for parsing a basic `CMakePresets.json` file. This test will fail initially.
    *   **Implement the Logic:** Write the necessary TypeScript code to make the test pass.
    *   **Refactor:** Clean up and improve the code while ensuring the tests still pass.
    *   **Repeat:** Continue this TDD cycle for all core functionalities:
        *   Handling `include` directives.
        *   Resolving `inherits` relationships to build the graph.
        *   Building the graph data structure (nodes and edges).

4.  **UI and Integration:**
    *   Create the main `index.html` file and a file input for selecting the root presets file.
    *   Connect the UI to the core logic API to get the graph data.
    *   Render the interactive graph using a visualization library like D3.js.
    *   Implement panning, zooming, and node labeling.

5.  **Finalization and Bundling:**
    *   Style the graph for better readability.
    *   Bundle the application into a single, self-contained HTML file.
    *   Add end-to-end tests to ensure the entire application works as expected.
