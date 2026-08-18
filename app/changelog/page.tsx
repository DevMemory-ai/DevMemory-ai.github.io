'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Tag, Calendar, CheckCircle2, Cpu, Terminal, Database, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        label="Release Notes"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> Changelog</>}
        description="Official release history and technical changelogs for DevMemory AI."
      />

      <Section className="border-t border-border">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Release v1.0.0 */}
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card/40 p-8 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-sm font-bold text-primary border border-primary/30 flex items-center gap-1.5">
                    <Tag className="h-4 w-4" /> v1.0.0
                  </span>
                  <span className="text-xl font-bold text-foreground">Initial Official Release</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> August 6, 2026
                </div>
              </div>

              {/* Release Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Release Highlights</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  DevMemory AI v1.0.0 is the foundational release of the local-first engineering memory engine. Built strictly around a single Runtime, an AST Engineering Compiler, a single SQLite Engineering Index, and an embedded HTTP Dashboard server.
                </p>
              </div>

              {/* Major Features */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Core Features Included</h3>
                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Terminal className="h-4 w-4 text-primary" /> dmai CLI Suite
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Complete command set: <code className="text-primary font-mono font-bold">init</code>, <code className="text-primary font-mono font-bold">watch</code>, <code className="text-primary font-mono font-bold">stop</code>, <code className="text-primary font-mono font-bold">status</code>, <code className="text-primary font-mono font-bold">ask</code>, <code className="text-primary font-mono font-bold">search</code>, <code className="text-primary font-mono font-bold">context</code>, <code className="text-primary font-mono font-bold">logs</code>, <code className="text-primary font-mono font-bold">doctor</code>.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Database className="h-4 w-4 text-success" /> SQLite Engineering Index
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Single source of truth located at <code className="text-foreground font-mono font-bold">.devmemory/index.db</code>. Stores nodes, edges, builds, transactions, and prompts locally.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Cpu className="h-4 w-4 text-warning" /> Adaptive Cooldown Compiler
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Filesystem edits observed by Chokidar are grouped in transactions with adaptive cooldowns before compiling a single build.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> Embedded Dashboard (:31415)
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Embedded HTTP server rendering dark/light theme dashboard with Cytoscape/Mermaid knowledge graph visuals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link href="/simulation">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                    Test v1.0.0 features in the interactive simulator <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
