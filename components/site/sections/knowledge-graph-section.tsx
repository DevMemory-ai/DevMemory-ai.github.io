'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeading, FadeIn } from '../section';
import { FileCode2, FolderTree, Network, Database, GitBranch, Wrench, Bug, Clock, Users, Package, Layers, BookOpen } from 'lucide-react';

const memoryTypes = [
  { icon: FileCode2, label: 'Files', count: '4,832' },
  { icon: FolderTree, label: 'Folders', count: '312' },
  { icon: Network, label: 'Architecture', count: '47' },
  { icon: Wrench, label: 'APIs', count: '147' },
  { icon: Database, label: 'Databases', count: '8' },
  { icon: GitBranch, label: 'Builds', count: '1,204' },
  { icon: BookOpen, label: 'Decisions', count: '89' },
  { icon: Bug, label: 'Bugs', count: '247' },
  { icon: Clock, label: 'Timeline', count: '5,672' },
  { icon: Users, label: 'Relationships', count: '12,403' },
  { icon: Package, label: 'Dependencies', count: '89' },
  { icon: Layers, label: 'Context', count: '∞' },
];

export function KnowledgeGraphSection() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            label="Engineering Knowledge Graph"
            title={
              <>
                Everything your project knows,
                <br />
                <span className="text-muted-foreground">connected.</span>
              </>
            }
            description="DevMemoryAI doesn't just store files. It understands relationships — what depends on what, what changed when, what decisions were made, and what impact a change will have."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {memoryTypes.map((type, i) => (
              <FadeIn key={type.label} delay={i * 40}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3">
                  <type.icon className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-[11px] text-muted-foreground">{type.label}</div>
                    <div className="font-mono text-sm font-semibold tabular-nums">{type.count}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={200}>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card/40">
            <InteractiveGraph />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function InteractiveGraph() {
  const nodes = [
    { x: 50, y: 50, r: 8, label: 'core', primary: true },
    { x: 150, y: 30, r: 6, label: 'api' },
    { x: 150, y: 80, r: 6, label: 'db' },
    { x: 250, y: 50, r: 7, label: 'auth', primary: true },
    { x: 250, y: 100, r: 5, label: 'utils' },
    { x: 50, y: 120, r: 6, label: 'config' },
    { x: 150, y: 140, r: 5, label: 'types' },
    { x: 250, y: 150, r: 6, label: 'ui' },
    { x: 350, y: 60, r: 7, label: 'routes', primary: true },
    { x: 350, y: 120, r: 5, label: 'hooks' },
  ];
  const edges = [
    [0,1],[0,2],[0,5],[1,3],[2,3],[3,8],[4,8],[5,6],[6,7],[7,8],[8,9],[1,8],[2,6],
  ];

  return (
    <svg viewBox="0 0 400 200" className="h-full w-full">
      <g>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.primary ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
              opacity={node.primary ? 0.9 : 0.5}
            />
            <text
              x={node.x}
              y={node.y - node.r - 4}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[8px]"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
