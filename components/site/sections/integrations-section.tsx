'use client';

import { Section, SectionHeading, FadeIn } from '../section';
import { Code, Cpu, Plus } from 'lucide-react';

const aiEditors = [
  { name: 'Cursor', category: 'AI Code Editor', badge: 'IDE' },
  { name: 'Claude Code', category: 'Terminal AI Agent', badge: 'CLI' },
  { name: 'VS Code', category: 'Code Editor', badge: 'IDE' },
  { name: 'Windsurf', category: 'Cascade AI IDE', badge: 'IDE' },
  { name: 'JetBrains', category: 'WebStorm / PyCharm', badge: 'IDE' },
  { name: 'Neovim', category: 'Terminal Editor', badge: 'Editor' },
  { name: 'Xcode', category: 'Apple Developer IDE', badge: 'IDE' },
  { name: 'Zed', category: 'High Performance Editor', badge: 'Editor' },
  { name: 'Eclipse', category: 'Java Development IDE', badge: 'IDE' },
  { name: 'Sublime Text', category: 'Text & Code Editor', badge: 'Editor' },
  { name: 'Emacs', category: 'Extensible Editor', badge: 'Editor' },
  { name: 'Fleet', category: 'JetBrains Next-Gen', badge: 'IDE' },
  { name: 'And many more...', category: 'All Editors & Extensions', badge: '+ More', isMore: true },
];

const ollamaModels = [
  { name: 'gpt-oss:120b-cloud', category: 'Tested Model', badge: 'Default' },
  { name: 'llama3.3:70b', category: 'Meta AI', badge: 'Local' },
  { name: 'qwen2.5-coder:32b', category: 'Alibaba AI', badge: 'Local' },
  { name: 'deepseek-r1:70b', category: 'DeepSeek', badge: 'Local' },
  { name: 'mistral:7b', category: 'Mistral AI', badge: 'Local' },
  { name: 'codellama:70b', category: 'Meta AI', badge: 'Local' },
  { name: 'phi4:14b', category: 'Microsoft AI', badge: 'Local' },
  { name: 'gemma2:27b', category: 'Google DeepMind', badge: 'Local' },
  { name: 'command-r7b', category: 'Cohere AI', badge: 'Local' },
  { name: 'starcoder2:15b', category: 'BigCode', badge: 'Local' },
  { name: 'codestral:22b', category: 'Mistral AI', badge: 'Local' },
  { name: 'vicuna:33b', category: 'LMSYS', badge: 'Local' },
  { name: 'And many more...', category: 'All Local & GGUF Models', badge: '+ More', isMore: true },
];

export function IntegrationsSection() {
  return (
    <Section className="border-t border-border overflow-hidden py-20" id="integrations">
      <SectionHeading
        label="Supported Engine Stack"
        align="center"
        title={
          <>
            Works with your local
            <br />
            <span className="text-muted-foreground">engineering stack.</span>
          </>
        }
        description="DevMemoryAI v1.1.0 operates locally. Connects with all major AI code editors and Ollama local LLM models."
      />

      <FadeIn delay={100}>
        <div className="relative mt-14 space-y-6">
          {/* Gradient Side Masks */}
          <div className="absolute left-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          {/* Row 1: AI Code Editors & IDEs (Left Motion) */}
          <div className="overflow-hidden py-2">
            <div className="mb-2 pl-4 text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
              <Code className="h-3.5 w-3.5 text-primary" /> Supported AI Code Editors & IDEs
            </div>
            <div className="animate-marquee flex items-center gap-4">
              {[...aiEditors, ...aiEditors, ...aiEditors].map((item, idx) => (
                <div
                  key={`editor-${item.name}-${idx}`}
                  className={`flex items-center gap-3.5 rounded-2xl border px-5 py-3 shadow-sm transition-all shrink-0 ${
                    item.isMore
                      ? 'border-primary/50 bg-primary/10 text-primary font-bold hover:bg-primary/20'
                      : 'border-border bg-card/60 hover:border-primary/50 hover:bg-card'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-xs font-bold ${
                      item.isMore
                        ? 'border-primary/40 bg-primary/20 text-primary'
                        : 'border-border bg-background text-primary'
                    }`}
                  >
                    {item.isMore ? <Plus className="h-4 w-4" /> : item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{item.name}</div>
                    <div className="text-xs font-mono text-muted-foreground">{item.category}</div>
                  </div>
                  <span className="ml-2 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-primary border border-primary/30">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Ollama Supported Models (Right Motion — Opposite Direction) */}
          <div className="overflow-hidden py-2">
            <div className="mb-2 pl-4 text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-success" /> Supported Ollama Local Models
            </div>
            <div className="animate-marquee-reverse flex items-center gap-4">
              {[...ollamaModels, ...ollamaModels, ...ollamaModels].map((item, idx) => (
                <div
                  key={`model-${item.name}-${idx}`}
                  className={`flex items-center gap-3.5 rounded-2xl border px-5 py-3 shadow-sm transition-all shrink-0 ${
                    item.isMore
                      ? 'border-success/50 bg-success/10 text-success font-bold hover:bg-success/20'
                      : 'border-border bg-card/60 hover:border-success/50 hover:bg-card'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-xs font-bold ${
                      item.isMore
                        ? 'border-success/40 bg-success/20 text-success'
                        : 'border-border bg-background text-success'
                    }`}
                  >
                    {item.isMore ? <Plus className="h-4 w-4" /> : item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground font-mono">{item.name}</div>
                    <div className="text-xs font-mono text-muted-foreground">{item.category}</div>
                  </div>
                  <span className="ml-2 rounded-full bg-success/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-success border border-success/30">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
