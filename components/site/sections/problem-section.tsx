'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeading, FadeIn } from '../section';
import { Brain, FileCode2, Network, Database, GitBranch, Zap, Clock, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Thousands of wasted prompts',
    description: 'Every new session starts from zero. You re-explain your architecture, your conventions, your decisions — every single time.',
  },
  {
    icon: AlertTriangle,
    title: 'AI hallucinates your codebase',
    description: 'Without real context, AI invents APIs that don\'t exist, imports from wrong paths, and suggests patterns you abandoned months ago.',
  },
  {
    icon: Brain,
    title: 'Engineering context is lost',
    description: 'Why was this decision made? What depends on this module? What broke last release? That knowledge lives in someone\'s head — until it doesn\'t.',
  },
  {
    icon: FileCode2,
    title: 'RAG isn\'t enough',
    description: 'Vector search retrieves text. It doesn\'t understand relationships, dependencies, or architecture. Your codebase isn\'t a document — it\'s a system.',
  },
];

export function ProblemSection() {
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="The Problem"
        title={
          <>
            AI forgets everything.
            <br />
            <span className="text-muted-foreground">Developers pay the price.</span>
          </>
        }
        description="Every AI coding session starts with amnesia. No memory of your architecture, your decisions, your dependencies, or your conventions. The result is wasted time, hallucinated code, and lost engineering context."
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {problems.map((problem, i) => (
          <FadeIn key={problem.title} delay={i * 80}>
            <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-border/80">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                  <problem.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
