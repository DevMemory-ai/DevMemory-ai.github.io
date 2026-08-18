'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About DevMemory AI"
        title={<>Engineering Memory Operating System <span className="text-muted-foreground">for Software Projects</span></>}
        description="DevMemory AI is an Engineering Memory Operating System for software projects. It continuously captures project knowledge, build history, engineering context, generated summaries, timelines, architecture understanding, and development artifacts to create long-term engineering memory."
      />

      <Section className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Target, title: 'Mission', text: 'Solve engineering context loss by giving software projects permanent, structured, local engineering memory.' },
            { icon: Eye, title: 'Vision', text: 'Enable developers and tools to query software architecture and build history deterministically.' },
            { icon: Heart, title: 'Core Principles', text: 'Local-first. Open source. Single SQLite index. Zero telemetry. Zero cloud dependence.' },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-card/40 p-8 space-y-4">
                <item.icon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-14 rounded-3xl border border-border bg-card/40 p-8 lg:p-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why We Built DevMemory AI</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Software repositories are complex systems. Every day, critical architectural context, build decisions, and component relationships evaporate across sessions.
              </p>
              <p>
                DevMemory AI is not chat history, prompt storage, traditional RAG, or an AI coding assistant.
              </p>
              <p>
                Instead, DevMemory AI is an Engineering Memory Operating System built on a deterministic single-runtime architecture:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-foreground">
                <li>ONE Runtime orchestrator managing the watcher, compiler, index, and dashboard.</li>
                <li>ONE Engineering Compiler acting as the sole writer of Engineering Memory.</li>
                <li>ONE SQLite Index (.devmemory/index.db) storing all nodes, edges, builds, and prompts.</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
