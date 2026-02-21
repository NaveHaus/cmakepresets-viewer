import type { ParsedPresets, PresetBase } from "./types";

type PresetsJson = {
  configurePresets?: unknown;
  buildPresets?: unknown;
  testPresets?: unknown;
  packagePresets?: unknown;
};

const emptyParsedPresets = (): ParsedPresets => ({
  configure: [],
  build: [],
  test: [],
  package: [],
});

const parsePresetArray = (value: unknown, kindLabel: string): PresetBase[] => {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`${kindLabel} must be an array`);
  }

  return value.map((item, index) => parsePresetItem(item, kindLabel, index));
};

const parsePresetItem = (
  value: unknown,
  kindLabel: string,
  index: number,
): PresetBase => {
  if (value === null || typeof value !== "object") {
    throw new Error(`${kindLabel}[${index}] must be an object`);
  }

  const record = value as Record<string, unknown>;
  const name = record.name;

  if (typeof name !== "string") {
    throw new Error(`${kindLabel}[${index}].name must be a string`);
  }

  const inherits = normalizeInherits(record.inherits, `${kindLabel}[${index}].inherits`);

  return {
    name,
    inherits,
    hidden: typeof record.hidden === "boolean" ? record.hidden : undefined,
    displayName:
      typeof record.displayName === "string" ? record.displayName : undefined,
    description:
      typeof record.description === "string" ? record.description : undefined,
  };
};

const normalizeInherits = (value: unknown, label: string): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array of strings`);
  }

  value.forEach((entry, index) => {
    if (typeof entry !== "string") {
      throw new Error(`${label}[${index}] must be a string`);
    }
  });

  return value.length > 0 ? [...value] : [];
};

export const parsePresetsJson = (text: string): ParsedPresets => {
  const parsed = JSON.parse(text) as PresetsJson;
  const result = emptyParsedPresets();

  result.configure = parsePresetArray(parsed.configurePresets, "configurePresets");
  result.build = parsePresetArray(parsed.buildPresets, "buildPresets");
  result.test = parsePresetArray(parsed.testPresets, "testPresets");
  result.package = parsePresetArray(parsed.packagePresets, "packagePresets");

  return result;
};
