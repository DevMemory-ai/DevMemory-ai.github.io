'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Zap, Clock, Target } from 'lucide-react';

const stats = [
  { label: 'Total Prompts', value: '5,672', change: '+12%', trend: 'up', icon: Activity },
  { label: 'Avg Tokens / Prompt', value: '847', change: '-23%', trend: 'down', icon: Zap },
  { label: 'Context Hit Rate', value: '94.2%', change: '+5.1%', trend: 'up', icon: Target },
  { label: 'Avg Response Time', value: '1.2s', change: '-0.3s', trend: 'down', icon: Clock },
];

const weeklyData = [
  { day: 'Mon', prompts: 420, tokens: 380 },
  { day: 'Tue', prompts: 510, tokens: 420 },
  { day: 'Wed', prompts: 680, tokens: 510 },
  { day: 'Thu', prompts: 590, tokens: 480 },
  { day: 'Fri', prompts: 720, tokens: 590 },
  { day: 'Sat', prompts: 340, tokens: 280 },
  { day: 'Sun', prompts: 280, tokens: 240 },
];

const toolUsage = [
  { tool: 'Cursor', count: 2340, pct: 41 },
  { tool: 'Claude Code', count: 1680, pct: 30 },
  { tool: 'Copilot', count: 920, pct: 16 },
  { tool: 'Windsurf', count: 520, pct: 9 },
  { tool: 'VS Code', count: 212, pct: 4 },
];

export function AnalyticsTab() {
  const maxPrompts = Math.max(...weeklyData.map((d) => d.prompts));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <p className="text-[13px] text-muted-foreground">Understand how your project and AI tools interact.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-border bg-card/40 p-4"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className={`flex items-center gap-1 text-[11px] ${stat.trend === 'up' ? 'text-success' : 'text-success'}`}>
                {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">{stat.value}</div>
            <div className="text-[12px] text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Weekly activity chart */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h3 className="text-sm font-semibold">Weekly Prompt Activity</h3>
          <div className="mt-6 flex items-end justify-between gap-2" style={{ height: 180 }}>
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.prompts / maxPrompts) * 100}%` }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-t-md bg-primary/60"
                    style={{ minHeight: 4 }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tool usage */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h3 className="text-sm font-semibold">AI Tool Usage</h3>
          <div className="mt-6 space-y-4">
            {toolUsage.map((tool, i) => (
              <div key={tool.tool}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium">{tool.tool}</span>
                  <span className="font-mono text-muted-foreground">{tool.count} ({tool.pct}%)</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tool.pct}%` }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact analysis preview */}
      <div className="mt-6 rounded-xl border border-border bg-card/40 p-5">
        <h3 className="text-sm font-semibold">Impact Analysis</h3>
        <p className="mt-1 text-[13px] text-muted-foreground">What would change if you modified a core module?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Files Affected', value: '12', detail: 'across 4 services' },
            { label: 'Tests to Update', value: '47', detail: 'unit + integration' },
            { label: 'Risk Level', value: 'Medium', detail: 'no breaking changes' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-background p-3">
              <div className="text-[11px] text-muted-foreground">{item.label}</div>
              <div className="mt-1 text-xl font-semibold">{item.value}</div>
              <div className="text-[11px] text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
