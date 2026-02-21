import { describe, expect, it } from "vitest";

import type { ParsedPresets } from "../src/core/types";
import { buildGraph } from "../src/core/graph";

describe("buildGraph", () => {
  it("creates nodes for all preset kinds", () => {
    const parsed: ParsedPresets = {
      configure: [{ name: "cfg" }],
      build: [{ name: "build" }],
      test: [{ name: "test" }],
      package: [{ name: "pkg" }],
    };

    const graph = buildGraph(parsed);

    expect(graph.nodes).toEqual([
      { id: "cfg", label: "cfg", kind: "configure", meta: {} },
      { id: "build", label: "build", kind: "build", meta: {} },
      { id: "test", label: "test", kind: "test", meta: {} },
      { id: "pkg", label: "pkg", kind: "package", meta: {} },
    ]);
  });

  it("creates one edge per parent", () => {
    const parsed: ParsedPresets = {
      configure: [{ name: "cfg", inherits: ["a", "b"] }],
      build: [],
      test: [],
      package: [],
    };

    const graph = buildGraph(parsed);

    expect(graph.edges).toEqual([
      { from: "cfg", to: "a", type: "inherits" },
      { from: "cfg", to: "b", type: "inherits" },
    ]);
  });

  it("skips edges when inherits is missing", () => {
    const parsed: ParsedPresets = {
      configure: [{ name: "cfg" }],
      build: [],
      test: [],
      package: [],
    };

    const graph = buildGraph(parsed);

    expect(graph.edges).toEqual([]);
  });

  it("keeps edges to unknown parents", () => {
    const parsed: ParsedPresets = {
      configure: [{ name: "child", inherits: ["missing"] }],
      build: [],
      test: [],
      package: [],
    };

    const graph = buildGraph(parsed);

    expect(graph.edges).toEqual([
      { from: "child", to: "missing", type: "inherits" },
    ]);
  });
});
