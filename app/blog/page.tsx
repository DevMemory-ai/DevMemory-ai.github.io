'use client';

import { useState } from 'react';
import { PageHero } from '@/components/site/page-hero';
import { Section, FadeIn } from '@/components/site/section';
import { ChevronRight, ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: Array<{
    heading?: string;
    body: string;
    code?: string;
    quote?: string;
  }>;
};

const articles: Article[] = [
  {
    id: 'why-ai-coding-agents-need-engineering-memory',
    title: 'Why AI Coding Agents Need Engineering Memory',
    excerpt: 'AI can write code in seconds. But when the session ends, who remembers why the code was written that way?',
    category: 'Thought Leadership',
    date: 'August 22, 2026',
    readTime: '8 min read',
    author: { name: 'Umesh Adabala', role: 'Creator & Founder' },
    content: [
      {
        quote: 'Software shouldn\'t lose its memory every time a developer closes a terminal, changes an AI agent, or starts a new session. Every project has a history. Every decision has a reason. Every codebase deserves to remember.',
        body: 'AI can write code in seconds. But when the chat session ends, what remembers:\n\nWhy was this architecture chosen?\nWhy was this module created?\nWhy was this dependency introduced?\nWhy was this bug fixed this way?\nWhat changed over the last month?\nWhat decisions should the next AI agent know about?\n\nAs AI-assisted software development rapidly becomes the standard way software is created, software projects are generating code faster than ever before. Yet, despite incredible advances in model capability, projects continuously suffer from an underlying structural problem: lost engineering context.',
      },
      {
        heading: '1. AI Can Code, But Context Disappears',
        body: 'Consider the modern AI-assisted development workflow:\n\nDeveloper → AI Agent → Prompt → Code Changes → Tests → Next Session → New AI Agent → Context Reconstruction\n\nWhen a developer starts a new AI session or switches between tools (Cursor, Claude Code, Codex, OpenCode, or custom agents), the AI agent starts with a fresh context window. The agent inspects current repository files, but current files provide only a fraction of the story.\n\nCrucial engineering knowledge is scattered across temporary AI chat logs, developer memory, commit messages, issue trackers, and discarded prompt sessions. As codebases grow larger and development accelerates, reconstructing why past decisions were made becomes increasingly difficult and time-consuming.',
      },
      {
        heading: '2. Software Projects Accumulate Knowledge',
        body: 'A mature software project contains far more than executable source code. It contains an evolving body of engineering knowledge:\n\n- Architecture decisions and design trade-offs\n- Module relationships and component boundaries\n- Engineering intent and feature evolution\n- Bug history and historical regression fixes\n- Technical debt considerations and API constraints\n- Performance, security, and build pipeline decisions\n\nTogether, these elements form the true Engineering Memory of a project. Without a persistent memory layer, every new development session forces the developer or AI agent to re-analyze raw source files and guess the historical intent.',
      },
      {
        heading: '3. Git Remembers Changes, Not Everything About the Reasoning',
        body: 'Git is an essential, irreplaceable tool for version control. It tracks precise line-by-line diffs and commit snapshots over time. However, Git diffs answer what changed, not necessarily why an architecture was chosen, what trade-offs were evaluated, or what an AI agent must keep in mind before modifying a core module.\n\nDevMemory AI is designed as a complementary layer alongside Git. Git manages versioned code states; DevMemory AI structures and preserves the underlying engineering knowledge.',
      },
      {
        heading: '4. What Is Engineering Memory?',
        body: 'Engineering Memory is the persistent representation of a software project\'s evolving engineering knowledge, including its architecture, decisions, changes, relationships, constraints, and development history.\n\nEngineering Memory differs fundamentally from:\n- Chat history or prompt logs (which are ephemeral and tied to single sessions)\n- Documentation files alone (which frequently drift from actual code)\n- Source code alone (which shows static structure, not evolutionary intent)\n- Traditional RAG (which performs ad-hoc text matching without architectural continuity)\n\nThe defining characteristic of Engineering Memory is CONTINUITY. It understands that today\'s codebase is the direct output of yesterday\'s engineering decisions.',
      },
      {
        heading: '5. Introducing DevMemory AI',
        body: 'DevMemory AI is an Engineering Memory Operating System for software projects.\n\nIt sits silently inside software repositories, watching development activity and converting raw code modifications into structured, persistent engineering knowledge:\n\nRepository → Filesystem Watcher → Engineering Transaction → Engineering Compiler → Engineering Memory → (Build History, Knowledge Graph, Timeline, Search, AI Context, Project Regeneration)\n\nDevMemory AI does not attempt to be another AI coding assistant or replace human judgment. It acts as the local-first memory operating system that captures structural intent as software evolves.',
      },
      {
        heading: '6. From File Changes to Engineering Knowledge',
        body: 'To understand the difference, consider how changes are captured:\n\nBasic / File-Level:\n"auth.ts was modified."\n\nBetter:\n"Authentication logic was modified."\n\nEngineering Memory:\n"The authentication architecture was changed to move session handling into the server layer, affecting authentication middleware and session persistence."\n\nThe goal of Engineering Memory is not longer text. The goal is capturing what changed, why, what components were affected, what architectural relationships shifted, and what constraints future development should respect.',
      },
      {
        heading: '7. Memory for the Next AI Agent',
        body: 'In a multi-agent ecosystem where developers use Cursor, Claude Code, Codex, OpenCode, or CLI tools, a project should not lose its history whenever a developer switches tools or opens a new terminal.\n\nDevMemory AI generates a Project Regeneration Prompt—a structured engineering snapshot designed to instantly ground any incoming AI agent in the exact architecture, intent, and decision history of the project.',
      },
      {
        heading: '8. DMAI Is Not Another Coding Agent',
        body: 'It is important to clarify what DevMemory AI is and is not:\n\n- Coding Agents: "Build the software."\n- Documentation Systems: "Explain the software."\n- Workflow Systems: "Guide the development process."\n- DevMemory AI: "Remember the engineering evolution of the software."\n\nDevMemory AI does not write your code or replace your coding tools. It provides the persistent memory foundation that powers them.',
      },
      {
        heading: '9. Why This Matters as AI Development Scales',
        body: 'As AI-assisted development expands, software will be generated at unprecedented velocity. More agents will participate, more code will be created, and context will fragment faster. Without a dedicated memory layer, software projects risk becoming unmaintainable fast-forward codebases where nobody understands past architectural choices. Persistent Engineering Memory turns rapid AI code generation into coherent, long-term software engineering.',
      },
      {
        heading: '10. Where DevMemory AI Is Going',
        body: 'The initial release of DevMemory AI v1.1.0 establishes the core foundation: local-first SQLite indexing, AST symbol extraction, transaction cooldown windowing, CLI search/ask query engine, and interactive dashboard.\n\nFuture research and development will explore deeper structural indexing, richer dependency graphs, explicit decision tracking, and seamless integration across AI agent ecosystems.',
      },
      {
        heading: '11. The Bigger Idea',
        body: 'Software projects have memory. Every architecture has a history. Every major implementation has a reason. Every engineering decision shapes what comes next. AI-assisted development should not force projects to repeatedly reconstruct that history.\n\nSoftware shouldn\'t lose its memory every time a developer closes a terminal, changes an AI agent, or starts a new session.\n\nEvery project has a history.\nEvery decision has a reason.\nEvery codebase deserves to remember.\n\nThat\'s the idea behind DevMemory AI.',
      },
    ],
  },
  {
    id: 'two-months-countless-rewrites-why-devmemoryai-exists',
    title: 'Two Months, Countless Rewrites, and Why DevMemoryAI Exists',
    excerpt: 'How losing engineering context while building software became the reason DevMemoryAI was created.',
    category: 'Founder Notes',
    date: 'August 18, 2026',
    readTime: '12 min read',
    author: { name: 'Umesh Adabala', role: 'Creator & Founder' },
    content: [
      {
        quote: 'Software projects rarely fail because developers cannot write code. More often, they fail because the reasoning behind that code slowly disappears.',
        body: 'A feature is implemented on Monday. A bug is fixed on Wednesday. An architectural decision is made the following week. A refactor happens a few days later. A month passes, and suddenly nobody remembers why any of those decisions were made. The code still exists. The engineering context doesn\'t. That simple observation eventually became DevMemoryAI. Ironically, it also became the biggest lesson while building it.',
      },
      {
        heading: 'The Project That Lost Its Own Context',
        body: 'Over the last two months, DevMemoryAI has gone through architectural pivots, complete rewrites, abandoned implementations, and one particularly painful decision that meant walking away from nearly six weeks of engineering work. Looking back, those setbacks weren\'t interruptions to the project—they became the very reason the project exists in its current form.\n\nThe earliest versions of DevMemoryAI looked very different from what exists today. Long before the current release, there was an internal version that felt remarkably complete. It already featured a much richer dashboard than the one available in v1.0.0: Build Memories, Engineering Timelines, Bug Timelines, Project Summaries, Prompt History, Knowledge Graphs, Architecture Explorer, Development Analytics, and Engineering Context Views. Watching it work genuinely felt like watching a software project remember itself.\n\nOn the surface, it looked ready. Underneath, however, the foundations were becoming increasingly fragile. Small changes created unexpected regressions. Fixing one subsystem often introduced instability somewhere else. Features accumulated faster than the architecture matured, and maintaining the project gradually became more difficult than extending it.\n\nThen something unexpected happened: while attempting to fix those problems, the project itself began suffering from the exact issue it was created to solve. Engineering context started disappearing. Decisions made weeks earlier became difficult to reconstruct. Architectural reasoning was forgotten. Certain implementations could no longer be explained with confidence. For a product designed to preserve engineering memory, that realization was impossible to ignore.',
      },
      {
        heading: 'Before Node.js, Everything Started in Python',
        body: 'The very first versions of DevMemoryAI were written entirely in Python. At the time, the goal wasn\'t to build a polished developer platform. The goal was simply to answer one question: "Can software automatically remember what happened during development?"\n\nThe prototype watched projects. It recorded changes. It generated summaries. It experimented with different storage strategies. It attempted to reconstruct engineering context. For the first time, the idea actually worked. The prototype wasn\'t beautiful, fast, or production-ready. But it proved something important: engineering memory wasn\'t just an interesting concept—it was genuinely useful. That small Python experiment became the foundation for everything that followed.',
      },
      {
        heading: 'One and a Half Months That Had to Be Left Behind',
        body: 'Once the idea was validated, development shifted toward Node.js. The goal was ambitious: a faster runtime, better tooling, a modern CLI, a built-in dashboard, better cross-platform support, and a stronger foundation for future releases.\n\nFor nearly one and a half months, that version became my entire focus. Day after day, new systems were added. The dashboard evolved. Build memories became richer. Knowledge graphs improved. Engineering context became smarter. The project finally felt real.\n\nBy the end of those six weeks, it honestly looked like the version I wanted to release. But software isn\'t judged only by what users can see. It\'s judged by what developers have to maintain. The deeper I worked on the project, the more obvious the underlying problems became. Some architectural decisions no longer made sense. Certain systems had become tightly coupled. Simple fixes required touching multiple unrelated components. Every improvement made future development harder instead of easier.\n\nI spent weeks trying to repair those problems. Eventually, there was only one realistic conclusion: the architecture itself had to change. Walking away from nearly six weeks of engineering effort is not a decision any developer wants to make. Watching thousands of lines of code disappear is frustrating. At the time, it genuinely felt like months of work had vanished overnight.\n\nLooking back now, that work wasn\'t wasted. It became the foundation for everything DevMemoryAI is today. Every bug, every failed experiment, every rewrite, every architectural mistake, and every deleted file directly influenced the architecture that powers DevMemoryAI v1.0.0. Sometimes the most valuable codebase is the one that teaches you what NOT to build.',
      },
      {
        heading: 'The Bugs Nobody Will Ever See',
        body: 'People often imagine software development as adding features. Most of these two months looked nothing like that. They looked like debugging: fixing one issue only to discover three more, watching file system events behave differently across operating systems, SQLite indexes behaving unexpectedly, dashboard state becoming inconsistent, CLI commands failing because of a tiny architectural mistake, knowledge graphs refusing to synchronize correctly, and context generation producing inaccurate results.\n\nSome nights ended with hundreds of new lines. Others ended with thousands deleted. The hardest part wasn\'t writing new functionality—it was making existing functionality trustworthy. Because engineering memory only matters if developers can trust it.',
      },
      {
        heading: 'Realizing What DevMemoryAI Should Actually Become',
        body: 'During those rewrites, something else quietly changed. Originally, DevMemoryAI was moving toward becoming another AI development tool, another coding assistant, another productivity application, or another project that helped generate more code.\n\nBut the more I worked on it, the more obvious something became: developers don\'t only struggle with writing code. They struggle with remembering it. Why was this abstraction introduced? Why was this feature delayed? Why was this dependency removed? Which prompt created this implementation? What changed three builds ago?\n\nThose aren\'t coding problems. They\'re engineering memory problems. That realization completely changed the direction of the project. DevMemoryAI stopped trying to become another AI coding assistant. Instead, it became something much simpler: an Engineering Memory Operating System. Not something that writes your software. Something that remembers it.',
      },
      {
        heading: 'Why SQLite Changed Everything',
        body: 'Another major turning point was abandoning the original storage approach. Earlier versions relied far more heavily on generated Markdown files and intermediate outputs. That no longer reflected the product DevMemoryAI was becoming. Engineering memory isn\'t a collection of documents. It\'s structured knowledge: relationships, build history, architecture, project evolution, metadata, and context.\n\nEverything eventually converged into one place: a local SQLite Engineering Index (.devmemory/index.db). Today, SQLite has become the single source of truth inside DevMemoryAI. The dashboard doesn\'t store engineering knowledge—it visualizes it. The CLI doesn\'t generate isolated reports—it queries structured engineering memory. That architectural decision simplified the system while making it significantly more reliable.',
      },
      {
        heading: 'Why v1.0.0 Looks Smaller Than Earlier Versions',
        body: 'If you\'ve seen screenshots of earlier internal builds, you might notice something: some parts actually looked more advanced. The previous dashboard exposed significantly more information than today\'s release, including Rich Build Memories, Bug Timelines, Engineering Timelines, Prompt History, Expanded Knowledge Graphs, Architecture Explorer, Development Analytics, Detailed Project Summaries, and Engineering Context Explorer.\n\nAt first glance, it looked like a step backwards. It wasn\'t. The previous version simply wasn\'t stable enough to become a long-term foundation. Instead of shipping something visually impressive but architecturally fragile, I made the difficult decision to rebuild around a cleaner, more maintainable core.\n\nDevMemoryAI v1.0.0 intentionally focuses on getting the fundamentals right: reliable builds, a SQLite-first architecture, a cleaner CLI, a simpler dashboard, and a stronger internal foundation. Sometimes moving forward means building less—so that everything built afterwards lasts much longer.',
      },
      {
        heading: 'We\'ll Get Back There',
        body: 'Those earlier ideas haven\'t disappeared. They\'re simply waiting for the right foundation. Future releases will gradually bring back many of the capabilities that existed internally: Rich Build Memory, Engineering Timelines, Bug Timelines, Expanded Engineering Context, Advanced Knowledge Graphs, Architecture Explorer, Component Relationships, Dependency Analysis, Historical Build Comparison, Faster Search, and More Powerful Dashboard Views.\n\nThe difference is that this time they\'ll be built on an architecture designed to support them for years—not just until the next difficult bug.',
      },
      {
        heading: 'Looking Back & Looking Forward',
        quote: '"Building DevMemoryAI became the strongest proof that DevMemoryAI needed to exist."',
        body: 'The biggest irony of this project is impossible to ignore: while building a tool designed to preserve engineering context, I lost engineering context. While building software intended to remember development history, I had to reconstruct my own. DevMemoryAI became its own case study. And maybe that\'s exactly how it was supposed to happen. Because the best validation for an engineering tool isn\'t a benchmark. It\'s experiencing the problem yourself.\n\nDevMemoryAI v1.0.0 isn\'t trying to be perfect. It\'s trying to be dependable. This release lays the foundation for everything that comes next: a reliable CLI, a SQLite-first architecture, an embedded dashboard, and engineering memory built around structured project knowledge.\n\nIf DevMemoryAI can save even one developer from experiencing the same context loss that nearly forced this project to restart from scratch, then every rewrite, every difficult decision, every late-night debugging session, and every deleted line of code was worth it. Thank you for reading. DevMemoryAI v1.0.0 is only the beginning of a much larger journey, and this time, every step forward will be remembered.',
      },
    ],
  },
];

export default function BlogPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <>
      <PageHero
        label="Founder Notes"
        title={<>DevMemory <span className="text-primary font-bold">AI</span> Engineering Blog</>}
        description="Lessons learned, architectural pivots, and the journey of building DevMemory AI v1.0.0."
      />

      <Section className="border-t border-border">
        {selectedArticle ? (
          /* Article Full Reading View (Shown when clicked) */
          <FadeIn>
            <div className="mx-auto max-w-4xl space-y-8 font-sans">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </button>

              <div className="space-y-4 border-b border-border pb-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="rounded-full bg-primary/20 px-3 py-1 font-bold text-primary border border-primary/30">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {selectedArticle.readTime}
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
                  {selectedArticle.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  {selectedArticle.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2 font-mono text-xs text-muted-foreground">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">
                    U
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{selectedArticle.author.name}</div>
                    <div className="text-[11px] text-muted-foreground">{selectedArticle.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div className="space-y-8 text-base leading-relaxed text-foreground">
                {selectedArticle.content.map((sec, i) => (
                  <div key={i} className="space-y-4">
                    {sec.heading && (
                      <h2 className="text-2xl font-bold tracking-tight text-foreground pt-4 border-t border-border/40">
                        {sec.heading}
                      </h2>
                    )}
                    {sec.quote && (
                      <blockquote className="rounded-2xl border-l-4 border-primary bg-primary/10 p-5 italic text-foreground font-medium text-lg leading-relaxed shadow-sm">
                        {sec.quote}
                      </blockquote>
                    )}
                    <div className="whitespace-pre-line text-foreground/90 font-normal leading-relaxed">
                      {sec.body}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-border">
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to all articles
                </button>
              </div>
            </div>
          </FadeIn>
        ) : (
          /* Article Index Card View (Initial View - Click to Read) */
          <FadeIn>
            <div className="mx-auto max-w-4xl space-y-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="group cursor-pointer overflow-hidden rounded-3xl border border-primary/50 bg-card/60 p-8 sm:p-10 space-y-6 glow-primary transition-all hover:border-primary hover:scale-[1.005] shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <span className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 font-bold text-primary border border-primary/30">
                      <Sparkles className="h-3.5 w-3.5 fill-current" /> {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {article.date}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/80 text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">
                        U
                      </div>
                      <span className="font-bold text-foreground">{article.author.name}</span>
                      <span className="text-muted-foreground text-[11px]">&mdash; {article.author.role}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:translate-x-1 transition-transform">
                      Read Essay <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </Section>
    </>
  );
}
