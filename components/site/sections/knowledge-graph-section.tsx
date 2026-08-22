'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeading, FadeIn } from '../section';
import {
  FileCode2,
  FolderTree,
  Network,
  Database,
  GitBranch,
  Wrench,
  Bug,
  Clock,
  Users,
  Package,
  Layers,
  BookOpen,
  Activity,
  Cpu,
  Zap,
  Sparkles,
  RefreshCw,
  Search,
} from 'lucide-react';

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

interface GraphNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  r: number;
  color: string;
  glow: string;
  desc: string;
  metrics: string;
}

const graphNodes: GraphNode[] = [
  {
    id: 'runtime',
    label: 'Local Runtime',
    type: 'Core Engine',
    x: 250,
    y: 180,
    r: 16,
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.4)',
    desc: 'Central local orchestration runtime. Coordinates Watcher, Compiler, and SQLite Index.',
    metrics: 'Active • PID 17880',
  },
  {
    id: 'compiler',
    label: 'Engineering Compiler',
    type: 'AST Pipeline',
    x: 160,
    y: 110,
    r: 13,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    desc: 'Sole writer of Engineering Memory. Extracts Tree-sitter AST nodes and generates build summaries.',
    metrics: '1,204 Builds Compiled',
  },
  {
    id: 'database',
    label: 'SQLite Index',
    type: 'Storage Layer',
    x: 340,
    y: 110,
    r: 13,
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    desc: 'Single source of truth. Stores AST symbol references, build transactions, and search vectors.',
    metrics: '14.8 KB • 100% Local',
  },
  {
    id: 'watcher',
    label: 'Filesystem Watcher',
    type: 'Event Observer',
    x: 80,
    y: 180,
    r: 11,
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.4)',
    desc: 'Chokidar filesystem daemon. Detects file additions, edits, and deletions in 300ms.',
    metrics: '300ms Detection Window',
  },
  {
    id: 'transactions',
    label: 'Transaction Manager',
    type: 'Event Windowing',
    x: 160,
    y: 260,
    r: 11,
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.4)',
    desc: 'Groups rapid file saves into single engineering builds with 60s adaptive cooldown.',
    metrics: '60s Cooldown Active',
  },
  {
    id: 'git',
    label: 'Git Integration',
    type: 'Version Control',
    x: 340,
    y: 260,
    r: 11,
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.4)',
    desc: 'Extracts commit SHA, branch metadata, and git diff snippets for build synthesis.',
    metrics: 'Branch: main',
  },
  {
    id: 'search',
    label: 'Search & Ask Engine',
    type: 'Query System',
    x: 420,
    y: 180,
    r: 11,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    desc: 'CLI and HTTP query engine for instant architectural answers and symbol search.',
    metrics: 'dmai ask "architecture"',
  },
  {
    id: 'prompt',
    label: 'Project Regeneration',
    type: 'AI Context',
    x: 250,
    y: 60,
    r: 12,
    color: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.4)',
    desc: 'Generates structured repository prompt to ground incoming AI agents in project intent.',
    metrics: '1 Repository Prompt',
  },
  {
    id: 'dashboard',
    label: 'Interactive Dashboard',
    type: 'Embedded HTTP Server',
    x: 250,
    y: 310,
    r: 11,
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    desc: 'Embedded local web UI serving real-time build timelines, dependency graph, and logs.',
    metrics: 'http://localhost:31415',
  },
];

const graphEdges: [number, number][] = [
  [0, 1], // runtime -> compiler
  [0, 2], // runtime -> database
  [0, 3], // runtime -> watcher
  [0, 4], // runtime -> transactions
  [0, 5], // runtime -> git
  [0, 6], // runtime -> search
  [0, 7], // runtime -> prompt
  [0, 8], // runtime -> dashboard
  [3, 4], // watcher -> transactions
  [4, 1], // transactions -> compiler
  [1, 2], // compiler -> database
  [2, 6], // database -> search
  [2, 7], // database -> prompt
  [2, 8], // database -> dashboard
  [5, 1], // git -> compiler
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
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 hover:border-primary/40 transition-colors">
                  <type.icon className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] text-muted-foreground">{type.label}</div>
                    <div className="font-mono text-sm font-semibold tabular-nums text-foreground">{type.count}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={200}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl border border-border bg-zinc-950 p-4 sm:p-6 shadow-2xl glow-primary flex flex-col justify-between">
            {/* Header Badge */}
            <div className="flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                LIVE KNOWLEDGE GRAPH
              </div>
              <div className="text-[11px] font-mono text-zinc-500">
                12,403 Active Edges • 100% Local
              </div>
            </div>

            {/* SVG Graph Component */}
            <div className="relative flex-1 my-2">
              <InteractiveGraph />
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function InteractiveGraph() {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(graphNodes[0]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-64 sm:h-72">
        <svg viewBox="0 0 500 360" className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Connected Edges */}
          <g>
            {graphEdges.map(([sourceIdx, targetIdx], i) => {
              const source = graphNodes[sourceIdx];
              const target = graphNodes[targetIdx];
              const isConnectedToSelected =
                selectedNode.id === source.id || selectedNode.id === target.id;

              return (
                <g key={i}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isConnectedToSelected ? source.color : '#3f3f46'}
                    strokeWidth={isConnectedToSelected ? '2' : '1'}
                    strokeOpacity={isConnectedToSelected ? '0.9' : '0.35'}
                    strokeDasharray={isConnectedToSelected ? 'none' : '4 4'}
                  />
                  {isConnectedToSelected && (
                    <motion.circle
                      r="2.5"
                      fill={source.color}
                      initial={{ cx: source.x, cy: source.y }}
                      animate={{
                        cx: [source.x, target.x],
                        cy: [source.y, target.y],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.1,
                      }}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Graph Nodes */}
          <g>
            {graphNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setSelectedNode(node)}
                >
                  {/* Outer Glow Ring when selected */}
                  {isSelected && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 8}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2"
                      strokeOpacity="0.8"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={node.color}
                    fillOpacity={isSelected ? '1' : '0.8'}
                    className="transition-all duration-300 group-hover:scale-125"
                    style={{ filter: isSelected ? `drop-shadow(0 0 10px ${node.glow})` : undefined }}
                  />

                  {/* Inner Accent Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r * 0.35}
                    fill="#ffffff"
                    fillOpacity="0.9"
                  />

                  {/* Node Label */}
                  <text
                    x={node.x}
                    y={node.y + node.r + 14}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#a1a1aa'}
                    fontSize="10"
                    fontWeight={isSelected ? '700' : '500'}
                    fontFamily="monospace"
                    className="select-none transition-colors duration-200"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Node Details Card Overlay */}
      <div className="relative mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3.5 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full inline-block"
                  style={{ backgroundColor: selectedNode.color }}
                />
                <span className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                  {selectedNode.label}
                </span>
                <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  {selectedNode.type}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-snug">{selectedNode.desc}</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-block rounded-lg bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-amber-400 font-semibold border border-zinc-800">
                {selectedNode.metrics}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
