'use client';

import Link from 'next/link';
import { Section, SectionHeading, FadeIn } from '../section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Terminal } from 'lucide-react';

export function DownloadCtaSection() {
  return (
    <Section className="border-t border-border">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 lg:p-14">
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl text-center space-y-6">
            <SectionHeading
              align="center"
              title={
                <>
                  Give your project
                  <br />
                  <span className="text-muted-foreground">permanent engineering memory.</span>
                </>
              }
              description="DevMemory AI v1.0.0 source code is publicly viewable for inspection and evaluation. Follow the recommended setup below to build and initialize locally."
            />

            {/* Recommended GitHub Setup Code Block */}
            <div className="mx-auto max-w-2xl text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-5 font-mono text-xs text-zinc-900 dark:text-zinc-100 space-y-2 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span className="text-primary font-bold">RECOMMENDED INSTALLATION WORKFLOW</span>
                <span>Bun / Node.js</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <div><span className="text-zinc-600 dark:text-zinc-400"># 1. Clone official repository</span></div>
                <div className="text-zinc-900 dark:text-zinc-200">git clone https://github.com/DevMemory-AI/devmemoryai.git</div>
                <div><span className="text-zinc-600 dark:text-zinc-400"># 2. Enter project directory</span></div>
                <div className="text-zinc-900 dark:text-zinc-200">cd devmemoryai</div>
                <div><span className="text-zinc-600 dark:text-zinc-400"># 3. Install dependencies & build</span></div>
                <div className="text-zinc-900 dark:text-zinc-200">bun install && bun link</div>
                <div><span className="text-zinc-600 dark:text-zinc-400"># 4. Initialize DevMemory AI in your repository</span></div>
                <div className="text-primary font-bold">dmai init</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/download">
                <Button size="lg" className="h-12 px-7 rounded-2xl gap-2 bg-primary text-sm font-semibold text-primary-foreground hover:bg-[#d94e09] shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
                  <Download className="h-4 w-4" />
                  Download & Install Setup
                </Button>
              </Link>
              <a href="https://github.com/DevMemory-AI/devmemoryai" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="h-12 px-7 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-primary/50 text-foreground font-semibold text-sm transition-all hover:scale-[1.02] gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </Button>
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
