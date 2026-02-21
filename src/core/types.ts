export type PresetKind = "configure" | "build" | "test" | "package";

export type PresetBase = {
  name: string;
  inherits?: string[];
  hidden?: boolean;
  displayName?: string;
  description?: string;
};

export type Preset = PresetBase & { kind: PresetKind };

export type ParsedPresets = {
  configure: PresetBase[];
  build: PresetBase[];
  test: PresetBase[];
  package: PresetBase[];
};
