import { Graph as GraphlibGraph } from "@dagrejs/graphlib";

import type { ParsedPresets, PresetBase, PresetKind } from "./types";

export type GraphNode = {
  id: string;
  label: string;
  kind: PresetKind;
  meta?: {
    hidden?: boolean;
    displayName?: string;
    description?: string;
    missing?: boolean;
  };
};

export type GraphEdge = {
  from: string;
  to: string;
  type: "inherits";
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export const makePresetId = (kind: PresetKind, name: string): string =>
  `${kind}:${name}`;

export const buildGraph = (parsed: ParsedPresets): Graph => {
  const graph = new GraphlibGraph({ directed: true, multigraph: true });
  const nodes: GraphNode[] = [];
  const nodeById = new Map<string, GraphNode>();

  const addPresetNodes = (kind: PresetKind, presets: PresetBase[]) => {
    presets.forEach((preset) => {
      const node: GraphNode = {
        id: makePresetId(kind, preset.name),
        label: preset.name,
        kind,
        meta: {
          hidden: preset.hidden,
          displayName: preset.displayName,
          description: preset.description,
        },
      };

      graph.setNode(node.id, node);
      nodes.push(node);
      nodeById.set(node.id, node);
    });
  };

  addPresetNodes("configure", parsed.configure);
  addPresetNodes("build", parsed.build);
  addPresetNodes("test", parsed.test);
  addPresetNodes("package", parsed.package);

  const edges: GraphEdge[] = [];

  const addEdgesForKind = (kind: PresetKind, presets: PresetBase[]) => {
    presets.forEach((preset) => {
      if (!preset.inherits || preset.inherits.length === 0) {
        return;
      }

      preset.inherits.forEach((parent) => {
        if (typeof parent !== "string") {
          return;
        }

        const parentId = makePresetId(kind, parent);
        const edge: GraphEdge = {
          from: makePresetId(kind, preset.name),
          to: parentId,
          type: "inherits",
        };

        if (!nodeById.has(parentId)) {
          const missingNode: GraphNode = {
            id: parentId,
            label: parent,
            kind,
            meta: { missing: true },
          };

          graph.setNode(parentId, missingNode);
          nodes.push(missingNode);
          nodeById.set(parentId, missingNode);
        }

        graph.setEdge(edge.from, edge.to, edge);
        edges.push(edge);
      });
    });
  };

  addEdgesForKind("configure", parsed.configure);
  addEdgesForKind("build", parsed.build);
  addEdgesForKind("test", parsed.test);
  addEdgesForKind("package", parsed.package);

  return { nodes, edges };
};
