'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { motion } from 'framer-motion';
import { FileCode2, GitBranch, Database, MonitorSmartphone, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

const stages = [
  { icon: FileCode2, label: 'Watcher (Chokidar)', description: 'Observes filesystem events without altering code', color: 'text-primary' },
  { icon: GitBranch, label: 'Transaction Manager', description: 'Groups edits with adaptive cooldown (default 20000ms)', color: 'text-warning' },
  { icon: Cpu, label: 'Engineering Compiler', description: 'Sole writer of Engineering Memory & AST symbols', color: 'text-primary' },
  { icon: Database, label: 'SQLite Index', description: 'Single source of truth (.devmemory/index.db)', color: 'text-success' },
  { icon: MonitorSmartphone, label: 'Embedded Dashboard', description: 'Renders UI on port 31415 via Runtime API', color: 'text-primary' },
  { icon: ArrowRight, label: 'CLI & Agents', description: 'Queries memory via dmai ask and dmai summary', color: 'text-success' },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        label="Canonical Architecture — v1.0.0"
        title={<>System Architecture <span className="text-muted-foreground">& Pipeline</span></>}
        description="DevMemory AI v1.0.0 is built on a single Runtime orchestrator. Learn how file changes move from Watcher to Engineering Compiler to SQLite Index."
      />

      <Section className="border-t border-border">
        {/* Pipeline diagram */}
        <FadeIn>
          <div className="rounded-3xl border border-border bg-card/40 p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
              {stages.map((stage, i) => (
                <div key={stage.label} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="flex w-full flex-col items-center gap-2.5 rounded-2xl border border-border bg-background p-4 text-center min-h-[140px] justify-center"
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl border border-border ${stage.color}`}>
                      <stage.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{stage.label}</div>
                      <div className="mt-1 text-[10px] leading-tight text-muted-foreground">{stage.description}</div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Core Rules */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card/40 p-8 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Local-First Architecture Rules</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                 DevMemory AI v1.0.0 operates completely offline. No cloud dependencies, no remote telemetries, no data leaving your machine.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  'ONE Runtime orchestrator — central management',
                  'ONE Engineering Compiler — sole writer of Engineering Memory',
                  'ONE SQLite Index — .devmemory/index.db single source of truth',
                  'ONE query engine — powering dmai ask & dashboard',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="rounded-3xl border border-border bg-card/40 p-8 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Transaction & Build Lifecycle</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Instead of building on every keystroke, file save events are grouped into transactions with adaptive cooldown timers.
              </p>
              <div className="space-y-2.5 font-mono text-xs pt-2">
                <div className="rounded-xl border border-border bg-background p-3 text-zinc-300">
                  File Saves → Chokidar Watcher → Transaction (Cooldown)
                </div>
                <div className="rounded-xl border border-border bg-background p-3 text-zinc-300">
                  Transaction Closed → Engineering Compiler AST Scan
                </div>
                <div className="rounded-xl border border-border bg-background p-3 text-success font-bold">
                  Write Build #N to SQLite Index (.devmemory/index.db)
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Data flow */}
        <FadeIn delay={200}>
          <div className="mt-12 rounded-3xl border border-border bg-card/40 p-8 space-y-4">
            <h3 className="text-xl font-bold text-foreground">System Component Boundaries</h3>
            <div className="overflow-x-auto">
              <pre className="font-mono text-xs leading-relaxed text-zinc-900 dark:text-zinc-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-5 shadow-sm">
{`Watcher (Chokidar)  → Observes filesystem changes (No Writes)
       ↓
Transaction Manager → Groups file events with adaptive cooldown (No Writes)
       ↓
Engineering Compiler→ Sole writer of Engineering Memory (AST extraction)
       ↓
SQLite Database     → .devmemory/index.db (Nodes, Edges, Builds, Prompts)
       ↓
Runtime API Engine  → Serves CLI (dmai ask) & Embedded Dashboard (:31415)`}
              </pre>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
