'use client';

import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Github, Scale, Lock, Info, MessagesSquare, ShieldAlert } from 'lucide-react';

export default function CommunityPage() {
  return (
    <>
      <PageHero
        label="Community & Source Policy"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> Community & License Policy</>}
        description="DevMemory AI v1.0.0 source code is publicly viewable for inspection, architectural learning, and educational evaluation."
      />

      <Section className="border-t border-border">
        {/* Contribution Policy Alert */}
        <FadeIn>
          <div className="rounded-3xl border border-warning/40 bg-card/60 p-8 space-y-3">
            <div className="flex items-center gap-3 font-bold text-warning text-lg">
              <Lock className="h-5 w-5" /> Contribution Policy Notice
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Contributions are currently closed while DevMemory AI is under active foundational development. Public contribution guidelines will be released in a future version.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn delay={60}>
            <a
              href="https://github.com/DevMemory-AI/devmemoryai"
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-3xl border border-border bg-card/40 p-6 transition-all hover:border-primary/40"
            >
              <Github className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">GitHub Repository</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Inspect official source code, track release tags, and follow development updates.
              </p>
            </a>
          </FadeIn>

          <FadeIn delay={120}>
            <a
              href="https://discord.gg/ycF48ADnx"
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-3xl border border-border bg-card/40 p-6 transition-all hover:border-[#5865F2]/40"
            >
              <MessagesSquare className="h-6 w-6 text-[#5865F2]" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Discord Server</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Join our official Discord server to chat with developers and get support.
              </p>
            </a>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="h-full rounded-3xl border border-border bg-card/40 p-6">
              <Scale className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Source-Available License</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Open source for viewing and evaluation. Modification or redistribution is prohibited.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={240}>
            <div className="h-full rounded-3xl border border-border bg-card/40 p-6">
              <Info className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Current Status</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Foundational core engine development (v1.0.0 release).
              </p>
            </div>
          </FadeIn>
        </div>

        {/* License Text */}
        <div id="license" className="mt-16 rounded-3xl border border-border bg-card/40 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">DevMemory AI Source License & Policy</h2>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-5 font-mono text-xs text-zinc-900 dark:text-zinc-300 leading-relaxed shadow-sm">
{`DevMemory AI Source-Available License

Copyright (c) 2026 DevMemory AI.
All Rights Reserved.

The source code of DevMemory AI is made publicly available for
inspection, evaluation, and educational purposes only.

PERMITTED USES:
- Viewing and inspecting the source code.
- Evaluating the architecture and implementation.
- Running officially distributed builds for personal or internal evaluation.

RESTRICTIONS:
- You may not modify or create derivative works of the software.
- You may not redistribute, sublicense, publish, or sell the software or
  derivative works.
- You may not use the software commercially without explicit written
  permission from DevMemory AI.
- You may not remove or alter copyright or proprietary notices.

No rights are granted except those expressly stated above.

For commercial use, licensing, enterprise deployment, or other permissions,
contact DevMemory AI.`}
          </pre>
        </div>
      </Section>
    </>
  );
}
