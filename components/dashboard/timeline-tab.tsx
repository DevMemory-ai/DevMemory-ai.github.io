'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Bug, CheckCircle2, FileCode2, MessageSquare, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineEvent = {
  id: string;
  time: string;
  type: 'commit' | 'build' | 'bug' | 'fix' | 'prompt' | 'decision';
  title: string;
  description: string;
  meta?: string;
};

const events: TimelineEvent[] = [
  { id: '1', time: '14:32', type: 'decision', title: 'ADR-023: Migrate to PostgreSQL', description: 'Decided to migrate from MongoDB to PostgreSQL for relational data integrity.', meta: 'by @sarah' },
  { id: '2', time: '14:15', type: 'commit', title: 'feat: Add user authentication flow', description: 'Implemented OAuth2 with GitHub and Google providers in the auth module.', meta: 'a1b2c3d' },
  { id: '3', time: '14:02', type: 'build', title: 'Build #1,204 passed', description: 'All 847 tests passed. 0 failures. Build time: 2m 14s.', meta: 'main' },
  { id: '4', time: '13:48', type: 'bug', title: 'Bug detected: Memory leak in cache layer', description: 'Cache module not properly invalidating entries on TTL expiry.', meta: 'severity: high' },
  { id: '5', time: '13:30', type: 'prompt', title: 'Prompt: "Refactor the auth middleware"', description: 'Asked AI to refactor auth middleware to use dependency injection pattern.', meta: 'cursor' },
  { id: '6', time: '12:15', type: 'fix', title: 'Fix: Resolve memory leak in cache', description: 'Added proper TTL invalidation handler. Cache now releases memory on expiry.', meta: '#247' },
  { id: '7', time: '11:48', type: 'commit', title: 'refactor: Extract database connection pool', description: 'Moved connection pooling to a dedicated module for reuse across services.', meta: 'e4f5g6h' },
  { id: '8', time: '10:30', type: 'build', title: 'Build #1,203 passed', description: 'All 845 tests passed. 2 new tests added. Build time: 2m 09s.', meta: 'main' },
  { id: '9', time: '09:15', type: 'decision', title: 'ADR-022: Adopt monorepo structure', description: 'Consolidated web-frontend and api-gateway into a single monorepo with Turborepo.', meta: 'by @mike' },
  { id: '10', time: '08:42', type: 'commit', title: 'chore: Update dependencies', description: 'Bumped 12 dependencies to latest patch versions. No breaking changes.', meta: 'i7j8k9l' },
];

const typeConfig = {
  commit: { icon: GitBranch, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  build: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  bug: { icon: Bug, color: 'text-red-400', bg: 'bg-red-500/10' },
  fix: { icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
  prompt: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
  decision: { icon: FileCode2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
};

const filters = ['all', 'commits', 'builds', 'bugs', 'prompts', 'decisions'] as const;

export function TimelineTab() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');

  const filtered = events.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'commits') return e.type === 'commit';
    if (filter === 'builds') return e.type === 'build';
    if (filter === 'bugs') return e.type === 'bug' || e.type === 'fix';
    if (filter === 'prompts') return e.type === 'prompt';
    if (filter === 'decisions') return e.type === 'decision';
    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Engineering Timeline</h2>
          <p className="text-[13px] text-muted-foreground">Every event in your project, chronologically.</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-background p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-md px-3 py-1.5 text-[12px] font-medium capitalize transition-colors',
                filter === f ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-1">
          {filtered.map((event, i) => {
            const config = typeConfig[event.type];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group relative flex gap-4 rounded-xl p-3 transition-colors hover:bg-accent/30"
              >
                <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background', config.bg)}>
                  <config.icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{event.time}</span>
                    {event.meta && (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {event.meta}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-[14px] font-medium">{event.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
