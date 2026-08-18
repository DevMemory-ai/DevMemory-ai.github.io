'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Brain, Clock, Network, Database, Cpu, Terminal, Layers, ShieldCheck, Play, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const v100Features = [
  {
    icon: Brain,
    title: 'Single-Runtime Orchestrator',
    description: 'All components (watcher, transaction manager, compiler, index, and dashboard) communicate through a unified local Runtime.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Terminal,
    title: 'dmai CLI Command Suite',
    description: 'Execute dmai init, watch, stop, status, ask, search, context, logs, doctor, and version directly in your terminal.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Database,
    title: 'SQLite Engineering Index',
    description: 'Local single source of truth stored in .devmemory/index.db. Stores nodes, edges, transactions, builds, and prompts with microsecond speed.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Cpu,
    title: 'Engineering Compiler',
    description: 'Sole writer of Engineering Memory. Extracts AST symbols and writes transaction events into immutable compiled builds.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Network,
    title: 'Interactive Knowledge Graph',
    description: 'Visualizes code nodes, import edges, and dependency trees inside the embedded dashboard on port 31415.',
    status: 'v1.0.0 Active',
  },
  {
    icon: FileText,
    title: 'Context Generation Engine',
    description: 'Synthesizes clean, non-probabilistic summaries of your project architecture for developers and AI assistants.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Clock,
    title: 'Engineering Build Timeline',
    description: 'Chronological tracking of transactions, compilation events, and AST updates recorded per build.',
    status: 'v1.0.0 Active',
  },
  {
    icon: Layers,
    title: 'Embedded Dashboard Server',
    description: 'Embedded HTTP server running locally on http://localhost:31415 with dark/light themes and Cytoscape graph rendering.',
    status: 'v1.0.0 Active',
  },
  {
    icon: ShieldCheck,
    title: 'Local Health Diagnostics',
    description: 'Runs automated diagnostics verifying Git repository presence, watcher status, and SQLite database integrity via dmai doctor.',
    status: 'v1.0.0 Active',
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        label="Product Overview"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> v1.0.0 Capabilities</>}
        description="DevMemory AI v1.0.0 is built for software developers who require fast, private, local-first engineering memory for their projects."
      />

      <Section className="border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-foreground">v1.0.0 Release Features</h2>
          <Link href="/simulation">
            <Button size="sm" className="gap-2 bg-primary text-sm font-semibold text-primary-foreground hover:bg-[#d94e09] rounded-xl transition-all shadow-md shadow-primary/20">
              <Play className="h-4 w-4 fill-current" /> Experience in Simulation
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {v100Features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 50}>
              <div className="group h-full rounded-3xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="rounded-full bg-success/15 px-2.5 py-1 font-mono text-xs font-bold text-success border border-success/20">
                      {feature.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <Link href={`/simulation?cmd=${encodeURIComponent('dmai status')}`}>
                    <span className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      See in simulator →
                    </span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
