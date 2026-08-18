'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Check } from 'lucide-react';

const supportedRuntimes = [
  {
    name: 'Ollama Engine',
    category: 'Local Inference Runtime',
    status: 'Officially Supported',
    models: ['gpt-oss:120b-cloud', 'Other Ollama local models'],
    note: 'Only Ollama has been fully tested and officially supported in DevMemory AI v1.0.0.',
  },
];

const upcomingRuntimes = [
  { name: 'OpenAI API', category: 'Cloud Provider', status: 'Planned for Validation' },
  { name: 'Anthropic API', category: 'Cloud Provider', status: 'Planned for Validation' },
  { name: 'LM Studio', category: 'Local LLM', status: 'Planned for Validation' },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        label="Runtime & Provider Support"
        title={<>Inference Providers <span className="text-muted-foreground">& Engine Support</span></>}
        description="Only Ollama has been fully tested and officially supported in DevMemory AI v1.0.0. Additional providers will be added in future releases after proper validation."
      />

      <Section className="border-t border-border space-y-12">
        {/* Officially Supported */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-success/20 px-3 py-1 font-mono text-xs font-bold text-success border border-success/30">
              OFFICIALLY SUPPORTED IN V1.0.0
            </span>
            <h2 className="text-2xl font-bold text-foreground">Tested Local Inference Runtime</h2>
          </div>

          {supportedRuntimes.map((item) => (
            <FadeIn key={item.name}>
              <div className="rounded-3xl border border-primary/40 bg-card/60 p-8 space-y-4 glow-primary">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                    <div className="text-xs font-mono text-primary font-bold mt-1">{item.category}</div>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success border border-success/30 font-mono">
                    <Check className="h-4 w-4" /> {item.status}
                  </span>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">{item.note}</p>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 space-y-2 shadow-sm">
                  <div className="text-primary font-bold">Tested Models:</div>
                  <div className="text-zinc-200 font-bold">• gpt-oss:120b-cloud</div>
                  <div className="text-zinc-400">• Other Ollama-compatible local models</div>
                  <div className="pt-2 border-t border-zinc-800 text-zinc-400">
                    # Config command example<br />
                    <span className="text-primary font-bold">$ dmai config ai.model gpt-oss:120b-cloud</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Planned Runtimes */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Upcoming Provider Validation</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Additional providers will be added in future releases after thorough validation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingRuntimes.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-card/40 p-5 space-y-1 opacity-80">
                <div className="font-bold text-foreground text-base">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.category}</div>
                <div className="text-[11px] font-mono text-warning pt-2">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
