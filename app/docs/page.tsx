'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import {
  Terminal,
  Play,
  Database,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  HardDrive,
  Info,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const cliCommands = [
  {
    name: 'dmai init',
    syntax: 'dmai init [path]',
    description: 'Initialize DevMemory AI in the target repository. Creates .devmemory directory, initializes SQLite index, project.json manifest, starts Chokidar watcher, and prepares the embedded dashboard.',
    arguments: '[path] — (Optional) Path to repository root. Defaults to process.cwd()',
    example: 'dmai init',
    output: `✔ Repository initialized\n✔ Runtime initialized\n✔ Watcher started\n✔ Engineering Compiler ready\n✔ Engineering Index ready (.devmemory/index.db)\n✔ Dashboard available at http://localhost:31415`,
    generatedFiles: '.devmemory/project.json, .devmemory/index.db, .devmemory/watcher.log',
  },
  {
    name: 'dmai watch',
    syntax: 'dmai watch [path]',
    description: 'Start the Chokidar filesystem watcher process to observe file creations, modifications, and deletions.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai watch',
    output: `✔ Watcher started (PID 28401). Observing source changes with adaptive cooldown.`,
    generatedFiles: '.devmemory/watcher.log, .devmemory/watcher.pid',
  },
  {
    name: 'dmai stop',
    syntax: 'dmai stop [path]',
    description: 'Gracefully pause or stop the background repository watcher process.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai stop',
    output: `✔ Watcher stopped.`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai continue',
    syntax: 'dmai continue [path]',
    description: 'Resume a stopped or paused background repository watcher process.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai continue',
    output: `✔ Watcher resumed.`,
    generatedFiles: '.devmemory/watcher.pid, .devmemory/watcher.log',
  },
  {
    name: 'dmai restart',
    syntax: 'dmai restart [path]',
    description: 'Restart the background repository watcher process cleanly.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai restart',
    output: `✔ Watcher restarted.`,
    generatedFiles: '.devmemory/watcher.pid, .devmemory/watcher.log',
  },
  {
    name: 'dmai status',
    syntax: 'dmai status [path]',
    description: 'Display detailed status of the local Runtime, Git repository, Watcher, Compiler, and SQLite Index health.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai status',
    output: `Project:              devmemory-demo\nRepository:           /workspace/devmemory-demo\nGit:                  Active (main)\nWatcher:              ACTIVE\nEngineering Compiler: READY\nEngineering Index:    14.8 KB (SQLite)\nAI Provider:          Ollama (gpt-oss:120b-cloud)\nCurrent Transaction:  None (Idle)\nLast Build:           Build #2 (a7b4f8e)\nRepository Health:    100% Operational`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai ask',
    syntax: 'dmai ask "question" [--raw]',
    description: 'Query the SQLite Engineering Index to ask an architectural or codebase question.',
    arguments: '"question" — Prompt query string; [--raw] — Output unformatted raw JSON',
    example: 'dmai ask "What is the project architecture?"',
    output: `DevMemory AI Engineering Answer\n\nDevMemory AI v1.0.0 operates via a central local Runtime. Compiler writes AST extracted nodes to SQLite Index (.devmemory/index.db).`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai search',
    syntax: 'dmai search <query>',
    description: 'Perform keyword and symbol search across stored engineering memory.',
    arguments: '<query> — Search term or symbol name',
    example: 'dmai search compiler',
    output: `[Symbol] Compiler in src/compiler.ts (Line 1-45)\n  -> Sole writer of Engineering Memory.\n[Build #2] Updated Runtime AST`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai dashboard',
    syntax: 'dmai dashboard [path]',
    description: 'Launch the embedded HTTP Dashboard server locally (default http://localhost:31415).',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai dashboard',
    output: `Dashboard running at http://localhost:31415`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai config',
    syntax: 'dmai config [key] [value]',
    description: 'View or set project options (ai.url, ai.model, theme, cooldown, dashboard.port).',
    arguments: '[key] [value] — Configuration key and target value',
    example: 'dmai config ai.model gpt-oss:120b-cloud',
    output: `✔ ai.model updated to gpt-oss:120b-cloud.`,
    generatedFiles: '.devmemory/project.json',
  },
  {
    name: 'dmai logs',
    syntax: 'dmai logs [path]',
    description: 'Output runtime logs recorded by Watcher, Compiler, and Search components.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai logs',
    output: `[19:15:02] [Runtime] Initialized\n[19:15:03] [Watcher] Listening\n[19:15:10] [Compiler] Index created`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai doctor',
    syntax: 'dmai doctor [path]',
    description: 'Execute health diagnostics on repository Git status, SQLite DB integrity, and watcher state.',
    arguments: '[path] — (Optional) Repository path',
    example: 'dmai doctor',
    output: `✔ Git repository: Detected\n✔ Runtime state: Operational\n✔ Watcher process: Active\n✔ SQLite Index integrity: Passed\n\nOverall Status: Healthy`,
    generatedFiles: 'None',
  },
  {
    name: 'dmai version',
    syntax: 'dmai version | dmai --version | dmai -v',
    description: 'Display the current DevMemory AI release version.',
    arguments: 'None',
    example: 'dmai version',
    output: `DevMemoryAI 1.0.0`,
    generatedFiles: 'None',
  },
];

const faqList = [
  {
    q: 'Does DevMemory AI send my source code to the cloud?',
    a: 'No. DevMemory AI v1.0.0 is 100% local-first. All indexing, AST parsing, transaction cooldowns, and SQLite storage stay strictly inside your local .devmemory/ folder. Zero cloud dependencies, zero telemetry, and zero data leaving your machine.',
  },
  {
    q: 'Which LLM providers and models are officially supported in v1.0.0?',
    a: 'Only Ollama local models are officially supported and tested in DevMemory AI v1.0.0 (specifically model gpt-oss:120b-cloud at http://localhost:11434). Additional providers like OpenAI, Anthropic, and LM Studio will be added in future releases after thorough validation.',
  },
  {
    q: 'How is DevMemory AI different from traditional vector RAG?',
    a: 'Traditional vector RAG chops code into text chunks and performs probabilistic vector distance searches, frequently missing exact function definitions or dependency relationships. DevMemory AI compiles AST symbol trees and dependency edges deterministically into a single SQLite Engineering Index (.devmemory/index.db).',
  },
  {
    q: 'Where is project engineering memory stored?',
    a: 'All engineering memory is stored directly inside your repository in .devmemory/index.db (a single-file SQLite database), accompanied by .devmemory/project.json manifest configuration and WAL mode transaction journals (index.db-shm and index.db-wal).',
  },
  {
    q: 'How does the adaptive transaction cooldown work?',
    a: 'To prevent rapid keystrokes or individual file saves from causing build churn, the Watcher groups file modification events over an adaptive cooldown window (default 20,000ms). When editing pauses, the Engineering Compiler commits a single immutable build record.',
  },
  {
    q: 'How do I launch and access the local embedded dashboard?',
    a: 'Run dmai dashboard in your terminal. It starts an embedded Node HTTP server on http://localhost:31415, allowing you to inspect real-time Cytoscape knowledge graphs, build history, and watcher logs directly in your browser.',
  },
  {
    q: 'What happens if I delete or corrupt the .devmemory/ directory?',
    a: 'Running dmai init or dmai build safely re-initializes .devmemory/, rebuilds project.json, and rescans your repository to compile a fresh SQLite Engineering Index without modifying your actual source code.',
  },
  {
    q: 'Can I commit the .devmemory/ folder to Git?',
    a: 'By default, .devmemory/ is added to .gitignore so index files stay local to your machine. Multi-developer team sync capabilities will be introduced in a future release.',
  },
  {
    q: 'How do I check system health and diagnose watcher issues?',
    a: 'Run dmai doctor. It executes automated diagnostics verifying Git repository status, watcher process ID lock (watcher.pid), and SQLite database integrity.',
  },
  {
    q: 'How do I change the default dashboard port or Ollama model?',
    a: 'Use dmai config ai.model <model_name>, dmai config ai.url <url>, or dmai config dashboard.port <port>. Changes are automatically saved to .devmemory/project.json.',
  },
];

export default function DocsPage() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<'cli' | 'runtime' | 'architecture' | 'files' | 'config' | 'faq'>('cli');

  useEffect(() => {
    const tabParam = searchParams ? searchParams.get('tab') : null;
    if (tabParam === 'faq' || window.location.hash === '#faq') {
      setActiveSection('faq');
    }
  }, [searchParams]);

  return (
    <>
      <PageHero
        label="Official Documentation — v1.0.0"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> Documentation</>}
        description="Official technical reference for DevMemory AI v1.0.0 — Architecture, CLI commands, Runtime support, SQLite Engineering Index, and Dashboard."
      />

      <Section className="border-t border-border">
        {/* Section Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4 font-sans text-sm font-bold">
          {[
            { id: 'cli', label: 'CLI Reference (dmai)' },
            { id: 'runtime', label: 'Runtime & Inference Support' },
            { id: 'architecture', label: 'Architecture & Pipeline' },
            { id: 'files', label: 'Generated Directory & Storage' },
            { id: 'config', label: 'Configuration & Diagnostics' },
            { id: 'faq', label: 'FAQ & Troubleshooting' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`rounded-xl px-5 py-2.5 transition-all ${
                activeSection === tab.id
                  ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CLI Section */}
        {activeSection === 'cli' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">CLI Command Reference (`dmai`)</h2>
              <Link href="/simulation">
                <Button size="sm" variant="outline" className="gap-2 border-primary/40 text-sm font-bold text-primary hover:bg-primary/10 rounded-xl">
                  <Play className="h-4 w-4 fill-current" /> Open Command Simulation
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {cliCommands.map((cmd) => (
                <div key={cmd.name} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-primary" />
                      <h3 className="font-mono text-xl font-bold text-primary">{cmd.name}</h3>
                    </div>
                    <Link href={`/simulation?cmd=${encodeURIComponent(cmd.name)}`}>
                      <Button size="sm" className="h-8 text-xs font-bold rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground">
                        See this command in action <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed">{cmd.description}</p>

                  <div className="grid gap-2 text-xs font-mono">
                    <div className="rounded-xl border border-border bg-background p-3">
                      <span className="text-muted-foreground font-semibold">Syntax: </span>
                      <span className="text-foreground font-bold">{cmd.syntax}</span>
                    </div>
                    <div className="rounded-xl border border-border bg-background p-3">
                      <span className="text-muted-foreground font-semibold">Arguments: </span>
                      <span className="text-foreground">{cmd.arguments}</span>
                    </div>
                    <div className="rounded-xl border border-border bg-background p-3">
                      <span className="text-muted-foreground font-semibold">Generated Files: </span>
                      <span className="text-success font-bold">{cmd.generatedFiles}</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Output Format</div>
                    <pre className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-sm">
                      {cmd.output}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Runtime Support Section */}
        {activeSection === 'runtime' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Inference Runtime & Provider Support</h2>
            
            <div className="rounded-3xl border border-primary/40 bg-card/60 p-8 space-y-4 glow-primary">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-success/20 px-3 py-1 font-mono text-xs font-bold text-success border border-success/30">
                    OFFICIALLY SUPPORTED IN V1.0.0
                  </span>
                  <h3 className="text-xl font-bold text-foreground">Ollama Local LLM Engine</h3>
                </div>
                <a
                  href="https://ollama.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="h-9 px-4 rounded-xl gap-2 bg-primary text-xs font-semibold text-primary-foreground hover:bg-[#d94e09]">
                    <ExternalLink className="h-3.5 w-3.5" /> Official Ollama Website (ollama.com)
                  </Button>
                </a>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Only <strong>Ollama</strong> has been fully tested and officially supported in DevMemory AI v1.0.0. Additional providers will be added in future releases after proper validation.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="rounded-xl border border-border bg-background p-4 space-y-2">
                  <div className="text-primary font-bold">Tested & Validated Models:</div>
                  <div className="text-foreground font-bold">• gpt-oss:120b-cloud</div>
                  <div className="text-muted-foreground">• Other Ollama-compatible local models</div>
                </div>

                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 space-y-1">
                  <div className="text-muted-foreground"># Configure Ollama model in project.json</div>
                  <div>$ dmai config ai.model gpt-oss:120b-cloud</div>
                  <div>$ dmai config ai.url http://localhost:11434</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Section */}
        {activeSection === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">DevMemory AI v1.0.0 Architecture Rules</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card/40 p-6 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <CheckCircle2 className="h-5 w-5" /> ONE Runtime Orchestrator
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All components (Watcher, Transaction Manager, Compiler, Index, Dashboard) communicate exclusively through a single local Runtime instance.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/40 p-6 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <CheckCircle2 className="h-5 w-5" /> ONE Engineering Compiler
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Engineering Compiler is the sole writer of Engineering Memory, ensuring deterministic AST symbol compilation into SQLite.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/40 p-6 space-y-2">
                <div className="flex items-center gap-2 text-success font-bold text-lg">
                  <CheckCircle2 className="h-5 w-5" /> ONE SQLite Index
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Single source of truth located at <code className="text-foreground font-mono font-bold">.devmemory/index.db</code>. Stores all nodes, edges, builds, transactions, and prompts.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/40 p-6 space-y-2">
                <div className="flex items-center gap-2 text-warning font-bold text-lg">
                  <CheckCircle2 className="h-5 w-5" /> One Transaction → One Build
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  File saves are grouped into adaptive cooldown transactions before a single deterministic build is compiled.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Files Section */}
        {activeSection === 'files' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Generated Directory Structure & File Explanations</h2>
            <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8 space-y-6 text-sm">
              <div className="space-y-3 font-mono">
                <div className="text-primary font-bold text-base">.devmemory/ Directory Layout & Explanations</div>
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-5 space-y-3 text-xs">
                  <div>
                    <strong className="text-primary">project.json</strong> — Project Manifest Configuration File. Stores version, project ID, repository path, AI provider options, and dashboard server port.
                  </div>
                  <div>
                    <strong className="text-success">index.db</strong> — Primary SQLite Engineering Index Database. The single source of truth storing AST symbol nodes, dependency edges, compiled builds, file transactions, and prompt history.
                  </div>
                  <div>
                    <strong className="text-muted-foreground">index.db-shm</strong> — SQLite Shared Memory File. Coordinates concurrent non-blocking reads in Write-Ahead Log (WAL) mode.
                  </div>
                  <div>
                    <strong className="text-muted-foreground">index.db-wal</strong> — SQLite Write-Ahead Log Journal. Ensures fast, zero-latency atomic writes.
                  </div>
                  <div>
                    <strong className="text-foreground">runtime.log</strong> — Central Runtime Operational Log. Records runtime initialization, orchestrator state, and compiler pipeline events.
                  </div>
                  <div>
                    <strong className="text-foreground">watcher.log</strong> — Watcher Activity Log. Records Chokidar file addition, modification, and deletion events.
                  </div>
                  <div>
                    <strong className="text-warning">watcher.pid</strong> — Watcher Process ID Lock File. Prevents duplicate background watcher process instances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Config & Diagnostics */}
        {activeSection === 'config' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Configuration & Diagnostics</h2>
            <div className="rounded-3xl border border-border bg-card/40 p-6 space-y-4 text-sm">
              <h3 className="font-bold text-foreground text-lg">Editable Config Options (`dmai config [key] [value]`)</h3>
              <div className="grid gap-3 font-mono text-xs">
                <div className="rounded-xl border border-border bg-background p-3">
                  <span className="text-primary font-bold">ai.url</span> — Custom local LLM endpoint URL (e.g. http://localhost:11434)
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <span className="text-primary font-bold">ai.model</span> — AI provider model (e.g. gpt-oss:120b-cloud)
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <span className="text-primary font-bold">cooldown</span> — Preferred transaction cooldown in ms (default 20000ms)
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <span className="text-primary font-bold">dashboard.port</span> — Embedded HTTP server port (default 31415)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div id="faq" className="space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions (FAQ)</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Common technical questions regarding DevMemory AI architecture, local security, SQLite indexing, and CLI operations.
            </p>

            <div className="grid gap-4 pt-2">
              {faqList.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card/40 p-6 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary font-mono border border-primary/30 mt-0.5">
                      Q{i + 1}
                    </span>
                    <div className="font-bold text-foreground text-base">{faq.q}</div>
                  </div>
                  <div className="pl-9 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
