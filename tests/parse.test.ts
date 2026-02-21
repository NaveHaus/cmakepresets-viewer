import { describe, expect, it } from "vitest";

import { parsePresetsJson } from "../src/core/parse";

describe("parsePresetsJson", () => {
  it("throws on invalid JSON", () => {
    expect(() => parsePresetsJson("{invalid"))
      .toThrow(/Unexpected token|Expected property name/);
  });

  it("returns empty arrays when preset arrays are missing", () => {
    const result = parsePresetsJson("{}");

    expect(result).toEqual({
      configure: [],
      build: [],
      test: [],
      package: [],
    });
  });

  it("rejects inherits that are not string arrays", () => {
    const text = JSON.stringify({
      configurePresets: [{ name: "alpha", inherits: "base" }],
    });

    expect(() => parsePresetsJson(text)).toThrow(
      "configurePresets[0].inherits must be an array of strings",
    );
  });

  it("extracts preset arrays for all kinds", () => {
    const text = JSON.stringify({
      configurePresets: [{ name: "cfg" }],
      buildPresets: [{ name: "build", inherits: ["base"] }],
      testPresets: [{ name: "test" }],
      packagePresets: [{ name: "pkg", displayName: "Package" }],
    });

    const result = parsePresetsJson(text);

    expect(result.configure).toEqual([{ name: "cfg" }]);
    expect(result.build).toEqual([{ name: "build", inherits: ["base"] }]);
    expect(result.test).toEqual([{ name: "test" }]);
    expect(result.package).toEqual([
      { name: "pkg", displayName: "Package" },
    ]);
  });
});
