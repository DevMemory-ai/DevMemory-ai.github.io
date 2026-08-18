import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { Github, MessagesSquare, Mail, BookOpen, Bug, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Support',
  description: 'Get help with DevMemory AI — documentation, GitHub issues, Discord community, and email support.',
};

const channels = [
  { icon: BookOpen, title: 'Documentation', description: 'Read the docs, guides, and API reference', href: '/docs', cta: 'Browse docs' },
  { icon: Github, title: 'GitHub Issues', description: 'Report bugs and request features', href: 'https://github.com/DevMemory-AI/devmemoryai/issues', cta: 'Open an issue' },
  { icon: MessagesSquare, title: 'Discord Community', description: 'Chat with the community and team', href: 'https://discord.gg/ycF48ADnx', cta: 'Join Discord' },
  { icon: Mail, title: 'Email Support', description: 'Direct support from the team', href: 'mailto:support@devmemory.ai', cta: 'Send an email' },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        label="Support"
        title={<>We're here <span className="text-muted-foreground">to help.</span></>}
        description="Documentation, community, and direct support channels. Pick whatever works best for you."
      />

      <Section className="border-t border-border">
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map((channel, i) => (
            <FadeIn key={channel.title} delay={i * 60}>
              <a href={channel.href} className="block h-full rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/30">
                <channel.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{channel.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{channel.description}</p>
                <div className="mt-4 text-[13px] font-medium text-primary">{channel.cta} →</div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-12 rounded-2xl border border-border bg-card/40 p-6">
            <h2 className="text-base font-semibold">Frequently Asked</h2>
            <div className="mt-4 space-y-4">
              {[
                { q: 'Is DevMemory free?', a: 'Yes. DevMemory is open source and completely free for local execution. There are no usage limits, zero telemetry, and zero paid tiers for individual use.' },
                { q: 'Does my code leave my machine?', a: 'No. DevMemory is local-first. The entire knowledge graph is stored in a local SQLite database. The MCP server binds to localhost only. No data is transmitted.' },
                { q: 'Which AI tools are supported?', a: 'Any tool that supports the Model Context Protocol (MCP). This includes Cursor, Claude Code, VS Code, JetBrains, Windsurf, and more.' },
                { q: 'How is this different from RAG?', a: 'RAG uses vector embeddings for similarity search. DevMemory builds a deterministic graph from AST analysis. The same codebase always produces the same graph. No probabilistic retrieval, no hallucination.' },
                { q: 'Can I use it with a monorepo?', a: 'Yes. DevMemory supports monorepos and can build a unified knowledge graph across multiple packages. Multi-repo graph linking is on the roadmap.' },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border/50 pb-4 last:border-0">
                  <h3 className="text-sm font-semibold">{faq.q}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
