import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ParseError, ValidationError } from "../src/core/errors";
import { parsePresetsJson } from "../src/core/parse";

describe("parsePresetsJson", () => {
  const fixture = (name: string) => readFileSync(join(__dirname, "fixtures", name), "utf-8");

  it("throws on invalid JSON", () => {
    expect(() => parsePresetsJson(fixture("invalid-json.txt"))).toThrow(ParseError);

    try {
      parsePresetsJson(fixture("invalid-json.txt"));
      throw new Error("Expected parsePresetsJson to throw");
    } catch (error) {
      const err = error as ParseError;
      expect(err).toBeInstanceOf(ParseError);
      expect(err.message).toBe("Invalid JSON");
      expect(err.cause).toBeTruthy();
    }
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

    expect(() => parsePresetsJson(text)).toThrow(ValidationError);

    try {
      parsePresetsJson(text);
      throw new Error("Expected parsePresetsJson to throw");
    } catch (error) {
      const err = error as ValidationError;
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe("configurePresets[0].inherits must be an array of strings");
      expect(err.field).toBe("configurePresets[0].inherits");
    }
  });

  it("rejects preset items missing a name", () => {
    const text = JSON.stringify({
      buildPresets: [{}],
    });

    expect(() => parsePresetsJson(text)).toThrow(ValidationError);

    try {
      parsePresetsJson(text);
      throw new Error("Expected parsePresetsJson to throw");
    } catch (error) {
      const err = error as ValidationError;
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe("buildPresets[0].name must be a string");
      expect(err.field).toBe("buildPresets[0].name");
    }
  });

  it("extracts preset arrays for all kinds", () => {
    const result = parsePresetsJson(
      JSON.stringify({
        configurePresets: [{ name: "cfg" }],
        buildPresets: [{ name: "build", inherits: ["base"] }],
        testPresets: [{ name: "test" }],
        packagePresets: [{ name: "pkg", displayName: "Package" }],
      }),
    );

    expect(result.configure).toEqual([{ name: "cfg" }]);
    expect(result.build).toEqual([{ name: "build", inherits: ["base"] }]);
    expect(result.test).toEqual([{ name: "test" }]);
    expect(result.package).toEqual([{ name: "pkg", displayName: "Package" }]);
  });

  it("parses a minimal fixture", () => {
    const result = parsePresetsJson(fixture("minimal.json"));

    expect(result.configure).toEqual([{ name: "cfg" }]);
    expect(result.build).toEqual([{ name: "build", inherits: ["base"] }]);
  });
});
