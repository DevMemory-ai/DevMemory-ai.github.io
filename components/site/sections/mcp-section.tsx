'use client';

import { Section, SectionHeading, FadeIn } from '../section';
import { Terminal, Database, Zap, Code2 } from 'lucide-react';

const cliConfig = `# devmemory project manifest (.devmemory/project.json)
{
  "version": "1.1.0",
  "projectId": "proj_8f93a1c2",
  "repository": {
    "name": "devmemory-demo",
    "path": "/workspace/devmemory-demo"
  },
  "ai": {
    "provider": "ollama",
    "model": "gpt-oss:120b-cloud",
    "url": "http://localhost:11434"
  },
  "dashboard": {
    "port": 31415,
    "autoOpen": true
  }
}`;

export function McpSection() {
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="Query Engine & CLI Integration"
        align="center"
        title={
          <>
            One index. Every tool & developer.
            <br />
            <span className="text-muted-foreground">Deterministic engineering context.</span>
          </>
        }
        description="DevMemory AI v1.1.0 exposes your Engineering Memory through a fast single query engine. CLI queries (dmai ask, dmai summary) retrieve instant, structured context directly from SQLite."
      />

      <FadeIn delay={100}>
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/80 dark:bg-zinc-900 px-4 py-3">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">.devmemory/project.json</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-900 dark:text-zinc-200">
            <code>{cliConfig}</code>
          </pre>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Database,
            title: 'Single Source of Truth',
            description: 'All nodes, edges, builds, and prompts are queried directly from local .devmemory/index.db with microsecond latency.',
          },
          {
            icon: Zap,
            title: 'Zero Latency Queries',
            description: 'dmai ask returns architectural answers locally. No remote RAG bottlenecks, zero cloud dependencies.',
          },
          {
            icon: Code2,
            title: 'Structured Context Output',
            description: 'Generate standardized Engineering Context summaries or structured JSON for CLI scripts.',
          },
        ].map((feature, i) => (
          <FadeIn key={feature.title} delay={i * 80}>
            <div className="h-full rounded-2xl border border-border bg-card/40 p-6">
              <feature.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
