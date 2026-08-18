'use client';

import { useState } from 'react';
import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Github, Terminal, Copy, Check, Sparkles, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const systemPromptText = `You are working inside a project that uses DevMemoryAI as its engineering memory system.

Before starting ANY engineering task—including writing code, modifying files, fixing bugs, refactoring, explaining architecture, or answering project-specific questions—you should first retrieve the latest engineering context.

Your first action should always be:

dmai ask "What is the full context?"

Do not make assumptions about the project before consulting DevMemoryAI.

Treat the returned context as the primary source of truth for:

- Project architecture
- Previous engineering decisions
- Build history
- Current implementation
- Existing components
- Dependencies
- Project goals
- Known issues
- Development timeline

After receiving the context:

1. Read and understand it completely.
2. Base every engineering decision on the retrieved information.
3. Avoid reintroducing previously solved problems.
4. Preserve the existing architecture unless explicitly instructed otherwise.
5. Follow established engineering patterns whenever possible.

Whenever the conversation changes significantly, the project evolves, or additional engineering context may exist, refresh your understanding by running:

dmai ask "What is the full context?"

Never answer project-specific engineering questions without consulting DevMemoryAI whenever engineering memory is available.`;

const recommendedTools = [
  { name: 'Cursor', ruleFile: '.cursorrules or System Prompt', desc: 'Add prompt to workspace rules or system instructions.' },
  { name: 'Claude Code', ruleFile: 'CLAUDE.md or System Prompt', desc: 'Include in project CLAUDE.md memory file.' },
  { name: 'Codex CLI', ruleFile: 'Custom Instructions', desc: 'Add to custom instruction preferences.' },
  { name: 'Gemini CLI', ruleFile: 'Custom Instructions', desc: 'Include in global or project prompt instructions.' },
  { name: 'Cline', ruleFile: '.cline-rules or System Prompt', desc: 'Add to .cline-rules in project root.' },
  { name: 'Roo Code', ruleFile: '.roorules or System Prompt', desc: 'Add to custom system instructions.' },
  { name: 'Continue.dev', ruleFile: 'config.json System Prompt', desc: 'Include in system prompt configuration.' },
  { name: 'Aider', ruleFile: '.aider.conf.yml or Prompt Input', desc: 'Include in workspace configuration or initial prompt.' },
  { name: 'Windsurf', ruleFile: '.windsurfrules or System Prompt', desc: 'Add to .windsurfrules in repository root.' },
  { name: 'Custom AI Assistant', ruleFile: 'System Prompts & Rules', desc: 'Add to any tool supporting custom instructions.' },
];

export default function DownloadPage() {
  const [copiedMac, setCopiedMac] = useState(false);
  const [copiedWin, setCopiedWin] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const macCmd = 'curl -fsSL https://raw.githubusercontent.com/DevMemory-AI/devmemoryai/main/install.sh | bash';
  const winCmd = 'iwr -useb https://raw.githubusercontent.com/DevMemory-AI/devmemoryai/main/install.ps1 | iex';

  const handleCopyMac = () => {
    navigator.clipboard.writeText(macCmd);
    setCopiedMac(true);
    setTimeout(() => setCopiedMac(false), 2000);
  };

  const handleCopyWin = () => {
    navigator.clipboard.writeText(winCmd);
    setCopiedWin(true);
    setTimeout(() => setCopiedWin(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(systemPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <>
      <PageHero
        label="Release v1.0.0 Installation"
        title={<>Install DevMemory <span className="text-primary font-bold">AI</span> v1.0.0</>}
        description="Run the automated 1-click installer command for your operating system below to set up Git, Bun runtime, Ollama LLM engine, and the global dmai CLI executable."
      />

      <Section className="border-t border-border space-y-16">
        {/* 1-Click Automated Installation Cards */}
        <FadeIn>
          <div className="rounded-3xl border border-primary/40 bg-card/60 p-8 lg:p-10 space-y-8 glow-primary">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div>
                <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-xs font-bold text-primary border border-primary/30 uppercase">
                  AUTOMATED 1-CLICK INSTALLATION
                </span>
                <h2 className="mt-3 text-3xl font-bold text-foreground">Select Operating System</h2>
              </div>
              <a
                href="https://github.com/DevMemory-AI/devmemoryai"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="h-11 px-6 rounded-2xl gap-2 bg-primary text-sm font-semibold text-primary-foreground hover:bg-[#d94e09] shadow-md shadow-primary/20 transition-all hover:scale-[1.02]">
                  <Github className="h-4 w-4" /> View GitHub Repository
                </Button>
              </a>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* macOS & Linux Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <div className="font-bold text-foreground text-base">macOS & Linux</div>
                    <span className="rounded-md bg-primary/20 px-2.5 py-1 font-mono text-xs font-bold text-primary border border-primary/30">
                      install.sh
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Paste this command into your Terminal app. Automatically installs Git, Bun, Ollama, and links `dmai` globally.
                  </p>
                  <div className="relative rounded-xl bg-zinc-200/90 dark:bg-zinc-900 p-4 font-mono text-xs text-foreground overflow-x-auto border border-border/60">
                    <code>{macCmd}</code>
                  </div>
                </div>

                <Button
                  onClick={handleCopyMac}
                  className="w-full h-11 rounded-xl gap-2 bg-primary font-bold text-primary-foreground hover:bg-[#d94e09]"
                >
                  {copiedMac ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedMac ? 'Copied Terminal Command!' : 'Copy macOS / Linux Command'}
                </Button>
              </div>

              {/* Windows Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <div className="font-bold text-foreground text-base">Windows</div>
                    <span className="rounded-md bg-primary/20 px-2.5 py-1 font-mono text-xs font-bold text-primary border border-primary/30">
                      install.ps1
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Paste this command into PowerShell. Automatically installs Git, Bun, Ollama, and links `dmai` globally.
                  </p>
                  <div className="relative rounded-xl bg-zinc-200/90 dark:bg-zinc-900 p-4 font-mono text-xs text-foreground overflow-x-auto border border-border/60">
                    <code>{winCmd}</code>
                  </div>
                </div>

                <Button
                  onClick={handleCopyWin}
                  className="w-full h-11 rounded-xl gap-2 bg-primary font-bold text-primary-foreground hover:bg-[#d94e09]"
                >
                  {copiedWin ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedWin ? 'Copied PowerShell Command!' : 'Copy Windows Command'}
                </Button>
              </div>
            </div>

            {/* What the Installer Script Handles */}
            <div className="space-y-3 pt-4 border-t border-border/60">
              <div className="text-xs font-bold font-mono text-primary uppercase tracking-wider">What the installer script automatically handles:</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs text-muted-foreground">
                <div className="rounded-xl border border-border bg-card/40 p-3.5 space-y-1">
                  <div className="font-bold text-foreground">1. Git VCS Check</div>
                  <p>Detects Git and auto-installs via Homebrew, apt, or winget if missing.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/40 p-3.5 space-y-1">
                  <div className="font-bold text-foreground">2. Bun Runtime</div>
                  <p>Installs Bun high-speed TS/JS runtime engine.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/40 p-3.5 space-y-1">
                  <div className="font-bold text-foreground">3. Ollama LLM Engine</div>
                  <p>Installs Ollama for offline, local-first AI synthesis.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/40 p-3.5 space-y-1">
                  <div className="font-bold text-foreground">4. Global CLI Linking</div>
                  <p>Symlinks `dmai` binary executable globally in your shell PATH.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* AI Assistant System Prompt Integration */}
        <FadeIn>
          <div className="rounded-3xl border border-border bg-card/60 p-8 lg:p-10 space-y-8">
            <div className="space-y-3 border-b border-border pb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary uppercase tracking-wider">
                <Terminal className="h-4 w-4" /> Recommended Onboarding Step
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">AI Assistant Rules Integration</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Add this prompt to your AI coding tool (Cursor, Claude Code, Gemini CLI, Aider, Windsurf) so it automatically queries DevMemoryAI before answering questions or modifying code.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/80 dark:bg-zinc-900 px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <Sparkles className="h-4 w-4 text-primary" /> System Prompt / Project Rules
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground hover:bg-[#d94e09] transition-all shadow-xs"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy System Prompt
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                <code>{systemPromptText}</code>
              </pre>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              {recommendedTools.map((tool) => (
                <div key={tool.name} className="rounded-2xl border border-border bg-card/40 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-foreground text-sm">{tool.name}</h4>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary border border-primary/20">
                      {tool.ruleFile}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
