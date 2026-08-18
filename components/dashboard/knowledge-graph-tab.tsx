'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Maximize2, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type GraphNode = {
  id: string;
  x: number;
  y: number;
  r: number;
  type: 'core' | 'api' | 'db' | 'ui' | 'util';
  label: string;
};

const nodes: GraphNode[] = [
  { id: 'core', x: 400, y: 200, r: 10, type: 'core', label: 'core' },
  { id: 'api', x: 200, y: 120, r: 8, type: 'api', label: 'api/' },
  { id: 'auth', x: 600, y: 120, r: 8, type: 'api', label: 'auth/' },
  { id: 'db', x: 150, y: 280, r: 7, type: 'db', label: 'database' },
  { id: 'cache', x: 300, y: 340, r: 6, type: 'db', label: 'cache' },
  { id: 'ui', x: 650, y: 280, r: 7, type: 'ui', label: 'components/' },
  { id: 'hooks', x: 550, y: 340, r: 6, type: 'ui', label: 'hooks/' },
  { id: 'utils', x: 400, y: 360, r: 5, type: 'util', label: 'utils/' },
  { id: 'config', x: 500, y: 80, r: 5, type: 'util', label: 'config' },
  { id: 'routes', x: 250, y: 200, r: 6, type: 'api', label: 'routes/' },
  { id: 'middleware', x: 350, y: 120, r: 5, type: 'api', label: 'middleware' },
  { id: 'types', x: 480, y: 280, r: 5, type: 'util', label: 'types' },
];

const edges: [string, string][] = [
  ['core', 'api'], ['core', 'auth'], ['core', 'db'], ['core', 'ui'],
  ['api', 'routes'], ['api', 'middleware'], ['api', 'db'], ['auth', 'db'],
  ['auth', 'cache'], ['db', 'cache'], ['ui', 'hooks'], ['hooks', 'utils'],
  ['core', 'utils'], ['core', 'config'], ['routes', 'types'], ['auth', 'types'],
];

const typeColors: Record<GraphNode['type'], string> = {
  core: 'hsl(var(--primary))',
  api: 'hsl(217 90% 60%)',
  db: 'hsl(142 71% 45%)',
  ui: 'hsl(280 65% 65%)',
  util: 'hsl(var(--muted-foreground))',
};

export function KnowledgeGraphTab() {
  const [selected, setSelected] = useState<string | null>('core');
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selected);
  const connectedIds = new Set<string>();
  const connectedArr: string[] = [];
  if (selected) {
    edges.forEach(([a, b]) => {
      if (a === selected) { connectedIds.add(b); connectedArr.push(b); }
      if (b === selected) { connectedIds.add(a); connectedArr.push(a); }
    });
  }

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Knowledge Graph</h2>
          <span className="rounded-md bg-success/15 px-2 py-0.5 font-mono text-[11px] text-success">synced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search nodes..."
              className="w-32 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
            <Filter className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Graph canvas */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background">
            <div className="absolute inset-0 bg-dots opacity-30" />
            <svg viewBox="0 0 800 450" className="relative h-full w-full">
              {/* Edges */}
              {edges.map(([a, b], i) => {
                const nodeA = nodes.find((n) => n.id === a)!;
                const nodeB = nodes.find((n) => n.id === b)!;
                const isActive = selected && (a === selected || b === selected);
                return (
                  <line
                    key={i}
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={isActive ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                    strokeWidth={isActive ? 1.5 : 1}
                    opacity={isActive ? 0.8 : 0.4}
                    strokeDasharray={isActive ? '0' : '4 4'}
                  />
                );
              })}
              {/* Nodes */}
              {nodes.map((node) => {
                const isSelected = selected === node.id;
                const isConnected = connectedIds.has(node.id);
                const isHovered = hovered === node.id;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelected(node.id)}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                  >
                    {(isSelected || isHovered) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 6}
                        fill={typeColors[node.type]}
                        opacity={0.15}
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={typeColors[node.type]}
                      opacity={isSelected ? 1 : isConnected ? 0.8 : 0.5}
                      stroke={isSelected ? 'white' : 'none'}
                      strokeWidth={1}
                    />
                    <text
                      x={node.x}
                      y={node.y - node.r - 6}
                      textAnchor="middle"
                      className={cn(
                        'font-mono text-[10px]',
                        isSelected ? 'fill-foreground' : 'fill-muted-foreground'
                      )}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg border border-border bg-card/80 p-2.5 backdrop-blur-sm">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                  <span className="text-[10px] capitalize text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node details panel */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-background p-4">
            {selectedNode ? (
              <>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: typeColors[selectedNode.type] }}
                  />
                  <h3 className="font-mono text-sm font-semibold">{selectedNode.label}</h3>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {selectedNode.type} node
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-[11px] text-muted-foreground">Node ID</div>
                    <div className="font-mono text-[12px]">{selectedNode.id}_001</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Connections</div>
                    <div className="font-mono text-[12px]">{connectedIds.size} edges</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Connected to</div>
                    <div className="mt-1 space-y-1">
                      {connectedArr.map((id) => {
                        const n = nodes.find((x) => x.id === id)!;
                        return (
                          <button
                            key={id}
                            onClick={() => setSelected(id)}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left font-mono text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: typeColors[n.type] }} />
                            {n.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-[13px] text-muted-foreground">
                Select a node to inspect
              </div>
            )}
          </div>

          <div className="mt-3 rounded-xl border border-border bg-background p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Graph Stats</div>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Total Nodes', value: '2,847' },
                { label: 'Total Edges', value: '12,403' },
                { label: 'Max Depth', value: '7' },
                { label: 'Avg Degree', value: '4.36' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-mono font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
