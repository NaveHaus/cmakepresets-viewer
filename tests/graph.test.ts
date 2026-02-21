import { describe, expect, it } from "vitest";

import type { ParsedPresets } from "../src/core/types";
import { buildGraph, makePresetId } from "../src/core/graph";

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
      {
        id: makePresetId("configure", "cfg"),
        label: "cfg",
        kind: "configure",
        meta: {},
      },
      {
        id: makePresetId("build", "build"),
        label: "build",
        kind: "build",
        meta: {},
      },
      {
        id: makePresetId("test", "test"),
        label: "test",
        kind: "test",
        meta: {},
      },
      {
        id: makePresetId("package", "pkg"),
        label: "pkg",
        kind: "package",
        meta: {},
      },
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
      {
        from: makePresetId("configure", "cfg"),
        to: makePresetId("configure", "a"),
        type: "inherits",
      },
      {
        from: makePresetId("configure", "cfg"),
        to: makePresetId("configure", "b"),
        type: "inherits",
      },
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
      {
        from: makePresetId("configure", "child"),
        to: makePresetId("configure", "missing"),
        type: "inherits",
      },
    ]);

    expect(graph.nodes).toContainEqual({
      id: makePresetId("configure", "missing"),
      label: "missing",
      kind: "configure",
      meta: { missing: true },
    });
  });

  it("creates distinct node IDs for same names across kinds", () => {
    const parsed: ParsedPresets = {
      configure: [{ name: "shared" }],
      build: [{ name: "shared" }],
      test: [],
      package: [],
    };

    const graph = buildGraph(parsed);

    expect(graph.nodes).toContainEqual({
      id: makePresetId("configure", "shared"),
      label: "shared",
      kind: "configure",
      meta: {},
    });

    expect(graph.nodes).toContainEqual({
      id: makePresetId("build", "shared"),
      label: "shared",
      kind: "build",
      meta: {},
    });
  });
});
