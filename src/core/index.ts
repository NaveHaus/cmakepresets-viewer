import { buildGraph } from "./graph";
import { parsePresetsJson } from "./parse";

export const buildGraphFromText = (text: string) => buildGraph(parsePresetsJson(text));

export { buildGraph, type Graph, type GraphEdge, type GraphNode } from "./graph";
export { ParseError, ValidationError } from "./errors";
export { parsePresetsJson } from "./parse";
export type { ParsedPresets, Preset, PresetBase, PresetKind } from "./types";
