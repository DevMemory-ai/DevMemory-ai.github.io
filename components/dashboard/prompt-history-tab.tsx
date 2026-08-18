'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, MessageSquare, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

type Prompt = {
  id: string;
  tool: 'cursor' | 'claude-code' | 'copilot' | 'windsurf';
  time: string;
  title: string;
  preview: string;
  tokens: number;
  contextUsed: string;
};

const prompts: Prompt[] = [
  { id: '1', tool: 'cursor', time: '14:32', title: 'Refactor the auth middleware to use dependency injection', preview: 'I need to refactor src/middleware/auth.ts to use a dependency injection pattern instead of direct imports. The current implementation tightly couples...', tokens: 1247, contextUsed: 'auth.ts, types.ts, routes/' },
  { id: '2', tool: 'claude-code', time: '13:48', title: 'Why does the cache layer leak memory?', preview: 'The cache module in src/lib/cache.ts appears to have a memory leak. When I run the test suite, memory usage grows continuously. I suspect the TTL invalidation...', tokens: 892, contextUsed: 'cache.ts, config.ts, tests/' },
  { id: '3', tool: 'cursor', time: '12:15', title: 'Add a new endpoint for user preferences', preview: 'I need to add a GET /api/users/:id/preferences endpoint. It should return the user\'s notification settings, theme preference, and language. The response should...', tokens: 634, contextUsed: 'users/, routes/, types.ts' },
  { id: '4', tool: 'copilot', time: '11:30', title: 'Explain the database connection pool architecture', preview: 'Can you explain how the database connection pool works in this project? I see we use pg Pool but I don\'t understand the lifecycle management...', tokens: 445, contextUsed: 'db.ts, pool.ts, config.ts' },
  { id: '5', tool: 'windsurf', time: '10:02', title: 'Generate tests for the billing service', preview: 'Generate comprehensive unit tests for src/services/billing.ts. Cover the subscription creation, payment processing, and invoice generation flows...', tokens: 1823, contextUsed: 'billing.ts, stripe.ts, tests/' },
  { id: '6', tool: 'claude-code', time: '09:15', title: 'What depends on the User model?', preview: 'I want to understand all the modules and services that depend on the User model before I make changes to the schema. Can you trace all dependencies?', tokens: 567, contextUsed: 'user.ts, schema.sql, services/' },
];

const toolColors: Record<Prompt['tool'], string> = {
  cursor: 'text-blue-400 bg-blue-500/10',
  'claude-code': 'text-primary bg-primary/10',
  copilot: 'text-success bg-success/10',
  windsurf: 'text-purple-400 bg-purple-500/10',
};

export function PromptHistoryTab() {
  const [selected, setSelected] = useState<string>('1');
  const selectedPrompt = prompts.find((p) => p.id === selected);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Prompt History</h2>
          <p className="text-[13px] text-muted-foreground">Every AI interaction, indexed and searchable.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input placeholder="Search prompts..." className="w-32 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Prompt list */}
        <div className="lg:col-span-2 space-y-2">
          {prompts.map((prompt, i) => (
            <motion.button
              key={prompt.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(prompt.id)}
              className={cn(
                'w-full rounded-xl border p-3 text-left transition-colors',
                selected === prompt.id ? 'border-primary/40 bg-accent/40' : 'border-border bg-card/30 hover:bg-card/50'
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium', toolColors[prompt.tool])}>
                  {prompt.tool}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{prompt.time}</span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">{prompt.tokens} tok</span>
              </div>
              <h3 className="mt-2 truncate text-[13px] font-medium">{prompt.title}</h3>
              <p className="mt-1 truncate text-[12px] text-muted-foreground">{prompt.preview}</p>
            </motion.button>
          ))}
        </div>

        {/* Prompt detail */}
        <div className="lg:col-span-3">
          {selectedPrompt && (
            <motion.div
              key={selectedPrompt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="flex items-center gap-2">
                <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-medium', toolColors[selectedPrompt.tool])}>
                  {selectedPrompt.tool}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{selectedPrompt.time}</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">{selectedPrompt.title}</h3>

              <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Bot className="h-3.5 w-3.5" />
                  Prompt
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground">{selectedPrompt.preview}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card/30 p-3">
                  <div className="text-[11px] text-muted-foreground">Tokens Used</div>
                  <div className="mt-1 font-mono text-lg font-semibold">{selectedPrompt.tokens}</div>
                </div>
                <div className="rounded-lg border border-border bg-card/30 p-3">
                  <div className="text-[11px] text-muted-foreground">Context Retrieved</div>
                  <div className="mt-1 font-mono text-[13px]">{selectedPrompt.contextUsed}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Graph Context Used</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedPrompt.contextUsed.split(', ').map((ctx) => (
                    <span key={ctx} className="flex items-center gap-1 rounded-md border border-border bg-card/40 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      <ChevronRight className="h-3 w-3" />
                      {ctx}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
