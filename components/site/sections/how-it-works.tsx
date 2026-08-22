'use client';

import { Section, SectionHeading, FadeIn } from '../section';
import { FileCode2, Network, Database, GitBranch, Cpu, MonitorSmartphone } from 'lucide-react';

const steps = [
  {
    icon: FileCode2,
    title: '1. Initialize Repository (dmai init)',
    description: 'Run dmai init in your project root. DevMemoryAI creates the .devmemory directory, starts the Chokidar watcher, prepares the Engineering Compiler, and boots the local index.',
    code: '$ dmai init\n✔ Repository initialized\n✔ Watcher started\n✔ Engineering Compiler ready\n✔ Engineering Index ready (.devmemory/index.db)\n✔ Dashboard available at http://localhost:31415',
  },
  {
    icon: GitBranch,
    title: '2. Observe Changes (Watcher)',
    description: 'The Watcher continuously monitors source files, AST symbol modifications, and file creations without needing manual git triggers or cloud webhooks.',
    code: '[Watcher] Listening to source changes\n→ Event: file_modified src/runtime.ts\n→ Event: file_modified src/compiler.ts\n→ Transaction tx_042 opened (cooldown 3000ms)',
  },
  {
    icon: Cpu,
    title: '3. Group Events (Transaction Manager)',
    description: 'Raw file save events are grouped into logical transactions using adaptive cooldowns, preventing build churn from rapid intermediate keystrokes.',
    code: '[Transaction Manager] Cooldown timer elapsed (3000ms)\n→ Closing Transaction tx_042 (2 files changed)\n→ Forwarding to Engineering Compiler',
  },
  {
    icon: Database,
    title: '4. Compile Build & Write to SQLite',
    description: 'The Engineering Compiler acts as the sole writer of Engineering Memory. It parses AST symbols and records an immutable build in .devmemory/index.db.',
    code: '[Engineering Compiler] Processing tx_042\n→ Extracted 12 nodes, 8 edges\n→ Writing Build #3 (Commit f83c10a) to SQLite index\n✔ .devmemory/index.db updated',
  },
  {
    icon: Network,
    title: '5. Query Memory via dmai ask',
    description: 'Developers and agents query engineering memory using dmai ask to retrieve instant project context from SQLite.',
    code: '$ dmai ask "What is the project architecture?"\n[Engineering Memory Answer]\nSingle Runtime orchestrating Watcher, Compiler & SQLite Index...\n✔ Queried from .devmemory/index.db',
  },
  {
    icon: MonitorSmartphone,
    title: '6. Embedded Dashboard (:31415)',
    description: 'Open http://localhost:31415 to inspect the interactive Cytoscape knowledge graph, build timeline, SQLite nodes, and runtime logs.',
    code: 'http://localhost:31415\n→ Knowledge Graph · 142 nodes, 218 edges\n→ Engineering Timeline · Build #1, Build #2\n→ Embedded HTTP Server active',
  },
];

export function HowItWorks() {
  return (
    <Section className="border-t border-border" id="how-it-works">
      <SectionHeading
        label="How DevMemoryAI Works"
        title={
          <>
            Six stages from code
            <br />
            <span className="text-muted-foreground">to engineering memory.</span>
          </>
        }
        description="DevMemoryAI v1.1.0 continuously observes your repository, compiles AST symbols into builds, stores them in SQLite, and serves context via CLI and dashboard."
      />

      <div className="mt-16 space-y-4">
        {steps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 60}>
            <div className="group relative grid gap-6 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-border/80 lg:grid-cols-2 lg:p-8">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:ml-14">
                  {step.description}
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-border bg-background/80">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">terminal</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-muted-foreground">
                  <code>{step.code}</code>
                </pre>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute left-8 top-full h-4 w-px bg-border lg:left-12" />
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
