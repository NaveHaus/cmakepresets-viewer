import { ParseError, ValidationError } from "./errors";
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
    throw new ValidationError(`${kindLabel} must be an array`, {
      field: kindLabel,
    });
  }

  return value.map((item, index) => parsePresetItem(item, kindLabel, index));
};

const parsePresetItem = (value: unknown, kindLabel: string, index: number): PresetBase => {
  if (value === null || typeof value !== "object") {
    throw new ValidationError(`${kindLabel}[${index}] must be an object`, {
      field: `${kindLabel}[${index}]`,
    });
  }

  const record = value as Record<string, unknown>;
  const name = record.name;

  if (typeof name !== "string") {
    throw new ValidationError(`${kindLabel}[${index}].name must be a string`, {
      field: `${kindLabel}[${index}].name`,
    });
  }

  const inherits = normalizeInherits(record.inherits, `${kindLabel}[${index}].inherits`);

  return {
    name,
    inherits,
    hidden: typeof record.hidden === "boolean" ? record.hidden : undefined,
    displayName: typeof record.displayName === "string" ? record.displayName : undefined,
    description: typeof record.description === "string" ? record.description : undefined,
  };
};

const normalizeInherits = (value: unknown, label: string): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new ValidationError(`${label} must be an array of strings`, {
      field: label,
    });
  }

  value.forEach((entry, index) => {
    if (typeof entry !== "string") {
      throw new ValidationError(`${label}[${index}] must be a string`, {
        field: `${label}[${index}]`,
      });
    }
  });

  return value.length > 0 ? [...value] : [];
};

export const parsePresetsJson = (text: string): ParsedPresets => {
  let parsed: PresetsJson;

  try {
    parsed = JSON.parse(text) as PresetsJson;
  } catch (error) {
    throw new ParseError("Invalid JSON", { cause: error });
  }

  const result = emptyParsedPresets();

  result.configure = parsePresetArray(parsed.configurePresets, "configurePresets");
  result.build = parsePresetArray(parsed.buildPresets, "buildPresets");
  result.test = parsePresetArray(parsed.testPresets, "testPresets");
  result.package = parsePresetArray(parsed.packagePresets, "packagePresets");

  return result;
};
