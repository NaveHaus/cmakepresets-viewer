import { describe, expect, it } from "vitest";

import { buildGraphFromText } from "../src/core";

describe("core integration", () => {
  it("builds a graph from JSON text", () => {
    const text = JSON.stringify({
      configurePresets: [{ name: "cfg", inherits: ["base"] }],
      buildPresets: [{ name: "build" }],
      testPresets: [{ name: "test", inherits: ["tbase"] }],
    });

    const graph = buildGraphFromText(text);
    const nodeIds = new Set(graph.nodes.map((node) => node.id));

    expect(nodeIds).toEqual(
      new Set(["configure:cfg", "configure:base", "build:build", "test:test", "test:tbase"]),
    );
    expect(graph.edges).toEqual(
      expect.arrayContaining([
        { from: "configure:cfg", to: "configure:base", type: "inherits" },
        { from: "test:test", to: "test:tbase", type: "inherits" },
      ]),
    );
  });
});
