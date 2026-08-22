'use client';

import { Section, SectionHeading, FadeIn } from '../section';
import { Check, X } from 'lucide-react';

const features = [
  { label: 'Single-Runtime Architecture', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'AST Engineering Compiler', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'Local SQLite Index (.devmemory/index.db)', devmemory: true, rag: false, notes: true, copilot: false },
  { label: 'Deterministic Knowledge Graph', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'dmai CLI Command Suite', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'Embedded Local Dashboard (:31415)', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'Executive Summary & Context Generator', devmemory: true, rag: 'partial', notes: false, copilot: 'partial' },
  { label: 'Engineering Timeline & Build History', devmemory: true, rag: false, notes: false, copilot: false },
  { label: 'Works 100% Offline', devmemory: true, rag: true, notes: true, copilot: false },
  { label: 'Zero Cloud & Zero Telemetry Dependency', devmemory: true, rag: true, notes: true, copilot: false },
];

export function ComparisonSection() {
  return (
    <Section className="border-t border-border py-12 lg:py-16" id="comparison">
      <SectionHeading
        label="Architecture Comparison"
        align="center"
        title={
          <>
            Not another RAG layer.
            <br />
            <span className="text-muted-foreground">Not another note app.</span>
          </>
        }
        description="DevMemory AI is a fundamentally different approach. It builds a deterministic index over compiled AST transactions — not probabilistic similarity search over text chunks."
      />

      <FadeIn delay={100}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-1.5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-border/80 text-sm">
                  <th className="w-[40%] py-3.5 px-4 sm:px-6 font-bold text-foreground tracking-tight">
                    Capability / Feature
                  </th>
                  <th className="w-[21%] py-3.5 px-4 text-center bg-primary/10 border-x border-primary/20 rounded-t-xl">
                    <div className="flex flex-col items-center justify-center gap-0.5">
                      <span className="text-base font-extrabold text-primary">DevMemory AI</span>
                      <span className="rounded-full bg-primary/20 px-2 py-0.2 text-[10px] font-bold text-primary border border-primary/30 font-mono">
                        v1.1.0 Engine
                      </span>
                    </div>
                  </th>
                  <th className="w-[13%] py-3.5 px-3 text-center font-bold text-muted-foreground text-xs">
                    Vector RAG
                  </th>
                  <th className="w-[13%] py-3.5 px-3 text-center font-bold text-muted-foreground text-xs">
                    Markdown Notes
                  </th>
                  <th className="w-[13%] py-3.5 px-3 text-center font-bold text-muted-foreground text-xs">
                    Copilot Context
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {features.map((feature) => (
                  <tr
                    key={feature.label}
                    className="transition-colors hover:bg-accent/40"
                  >
                    <td className="py-2.5 px-4 sm:px-6 font-semibold text-foreground leading-tight">
                      {feature.label}
                    </td>
                    <td className="py-2.5 px-4 text-center bg-primary/10 border-x border-primary/20">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 border border-primary/40">
                        <Check className="h-3.5 w-3.5 text-primary stroke-[3]" />
                      </div>
                    </td>
                    {['rag', 'notes', 'copilot'].map((key) => (
                      <td key={key} className="py-2.5 px-3 text-center">
                        {feature[key as 'rag' | 'notes' | 'copilot'] === true ? (
                          <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted/30">
                            <Check className="h-3 w-3 text-muted-foreground" />
                          </div>
                        ) : feature[key as 'rag' | 'notes' | 'copilot'] === 'partial' ? (
                          <span className="inline-block rounded bg-muted/40 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
                            Partial
                          </span>
                        ) : (
                          <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/30" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
