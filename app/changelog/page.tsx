'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Tag, Calendar, CheckCircle2, Cpu, Terminal, Database, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        label="Release Notes"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> Changelog</>}
        description="Official release history, bug fixes, and technical changelogs for DevMemory AI."
      />

      <Section className="border-t border-border">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Release v1.1.0 */}
          <FadeIn>
            <div className="rounded-3xl border border-primary/40 bg-card/60 p-8 space-y-8 glow-primary">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-sm font-bold text-primary border border-primary/30 flex items-center gap-1.5">
                    <Tag className="h-4 w-4" /> v1.1.0
                  </span>
                  <span className="text-xl font-bold text-foreground">Instant File Change Detection & Ultra-Fast Cooldown</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> August 22, 2026
                </div>
              </div>

              {/* Release Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Release Highlights</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  DevMemory AI v1.1.0 introduces critical performance optimizations and bug fixes. File change detection is now instantaneous (&lt;300ms), adaptive cooldown build windows trigger within 2 seconds of typing pause, and automatic manifest migration brings 100x faster responsiveness.
                </p>
              </div>

              {/* Bug Fixes & Improvements */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Key Enhancements & Fixes</h3>
                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Zap className="h-4 w-4 text-primary" /> Instant File Detection (&lt;300ms)
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Decoupled Chokidar <code className="text-primary font-mono font-bold">stabilityThreshold</code> to 300ms (down from 120,000ms). File saves trigger change events immediately on disk write.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Cpu className="h-4 w-4 text-success" /> Optimal 60s Adaptive Cooldown
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Configured default adaptive cooldown window to <code className="text-foreground font-mono font-bold">preferredMs: 60,000</code> (60s). Gives developers &amp; AI agents ideal time for batch edits before build compilation.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <ShieldCheck className="h-4 w-4 text-warning" /> Automatic Manifest Migration
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Added automatic in-flight config migration for existing v1.0.0 projects so legacy 120,000ms cooldowns are safely upgraded to v1.1.0 fast defaults.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <Terminal className="h-4 w-4 text-primary" /> PowerShell PATH Reloading
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Fixed <code className="text-primary font-mono font-bold">install.ps1</code> in-session PATH environment reloading for seamless one-click installation on Windows.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 space-y-2 sm:col-span-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base">
                      <ShieldCheck className="h-4 w-4 text-destructive" /> System-Wide Process Cleanup (<code className="text-primary font-mono text-sm">dmai disable --all</code>)
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Enhanced <code className="text-primary font-mono font-bold">dmai disable --all</code> (aliases: <code className="text-primary font-mono font-bold">dmai destroy -all</code>, <code className="text-primary font-mono font-bold">dmai purge -a</code>) to run unconditionally from any directory—even uninitialized folders. Sweeps system launch agents, terminates background watcher daemons, releases SQLite file locks, and purges registered <code className="text-foreground font-mono font-bold">.devmemory/</code> directories. Added <code className="text-primary font-mono font-bold">dmai projects</code> to list all registered projects on the machine.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link href="/download">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                    Upgrade to v1.1.0 via one-click installers <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>

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
                  <Calendar className="h-4 w-4" /> August 18, 2026
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
                    Test features in the interactive simulator <ArrowUpRight className="h-4 w-4" />
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
