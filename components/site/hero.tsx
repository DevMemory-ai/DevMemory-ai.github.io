'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Terminal, Github, Play, ShieldCheck, Database, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KnowledgeGraphBg } from './knowledge-graph-bg';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade" />
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-40">
        <KnowledgeGraphBg />
      </div>
      {/* Primary glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex w-fit max-w-max items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-bold text-primary font-mono backdrop-blur-sm">
              DevMemory AI v1.0.0 Released
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[64px] text-foreground"
          >
            Engineering Memory
            <br />
            <span className="text-muted-foreground">for Software Projects.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            DevMemory AI is an Engineering Memory Operating System for software projects. It continuously captures project knowledge, build history, engineering context, generated summaries, timelines, architecture understanding, and development artifacts to create long-term engineering memory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row"
          >
            <Link href="/simulation">
              <Button size="lg" className="h-11 px-6 rounded-xl gap-2 bg-primary text-sm font-semibold text-primary-foreground hover:bg-[#d94e09] shadow-md shadow-primary/25 transition-all hover:scale-[1.02]">
                <Play className="h-3.5 w-3.5 fill-current" />
                Launch Interactive Simulation
              </Button>
            </Link>
            <Link href="/download">
              <Button size="lg" variant="outline" className="h-11 px-6 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/50 text-foreground font-semibold text-sm transition-all hover:scale-[1.02] gap-2">
                <Download className="h-3.5 w-3.5 text-muted-foreground" />
                Download v1.0.0
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground font-mono"
          >
            <span className="flex items-center gap-1.5 text-foreground font-bold">
              <Github className="h-3.5 w-3.5 text-primary" /> Source-Available Code
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-success font-bold">100% Local-First</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-primary font-bold">SQLite (.devmemory/index.db)</span>
          </motion.div>
        </div>

        {/* Product Interactive Preview Box */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 lg:mt-16"
        >
          <div className="absolute -inset-x-4 -inset-y-2 rounded-3xl bg-primary/5 blur-2xl" />
          <HeroProductPreview />
        </motion.div>
      </div>
    </section>
  );
}

function HeroProductPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-zinc-100 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 shadow-elevated font-mono">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between border-b border-border bg-zinc-200/80 dark:bg-[#111217] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-[11px] font-bold text-foreground">
            DevMemory AI Terminal &mdash; devmemory-demo
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="text-success font-bold">● Watcher: ACTIVE</span>
          <span className="text-primary font-bold">Dashboard: http://localhost:31415</span>
        </div>
      </div>

      {/* Terminal Grid View */}
      <div className="grid grid-cols-12 gap-0 text-xs">
        {/* Left Terminal Streams */}
        <div className="col-span-12 md:col-span-7 border-r border-border p-4 leading-relaxed space-y-2.5 text-zinc-900 dark:text-zinc-300">
          <div className="text-primary font-bold text-xs">$ dmai status</div>
          <div className="text-zinc-600 dark:text-zinc-400 space-y-0.5 text-[11px]">
            <div>Project:              devmemory-demo</div>
            <div>Repository:           /workspace/devmemory-demo</div>
            <div>Watcher:              ACTIVE (Chokidar)</div>
            <div>Engineering Compiler: READY</div>
            <div>Engineering Index:    14.8 KB (SQLite)</div>
            <div>AI Provider:          Ollama (gpt-oss:120b-cloud)</div>
            <div>Last Build:           Build #2 (a7b4f8e)</div>
            <div>Repository Health:    100% Operational</div>
          </div>
          <div className="text-primary font-bold text-xs mt-3">$ dmai ask &quot;What is the architecture?&quot;</div>
          <div className="text-success font-semibold text-[11px]">
            ✔ Queried SQLite Engineering Index (.devmemory/index.db)
          </div>
        </div>

        {/* Right Info Inspector */}
        <div className="col-span-12 md:col-span-5 bg-card/30 p-4 space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] font-bold text-foreground uppercase tracking-wider">
            <span>ENGINEERING INDEX STATUS</span>
            <Database className="h-3.5 w-3.5 text-success" />
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="rounded-xl border border-border bg-background p-2.5">
              <div className="text-muted-foreground text-[10px]">Local Index Storage</div>
              <div className="font-mono font-bold text-success text-xs mt-0.5">.devmemory/index.db</div>
            </div>

            <div className="rounded-xl border border-border bg-background p-2.5">
              <div className="text-muted-foreground text-[10px]">Inference Engine</div>
              <div className="font-mono font-bold text-primary text-xs mt-0.5">Ollama (gpt-oss:120b-cloud)</div>
            </div>

            <div className="rounded-xl border border-border bg-background p-2.5">
              <div className="text-muted-foreground text-[10px]">Manifest Configuration</div>
              <div className="font-mono font-bold text-foreground text-xs mt-0.5">.devmemory/project.json</div>
            </div>
          </div>

          <Link href="/simulation" className="block pt-0.5">
            <Button size="sm" className="w-full h-8 text-[11px] rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground font-bold transition-all">
              Launch Interactive Simulator &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
