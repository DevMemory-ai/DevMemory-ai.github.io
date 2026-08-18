'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, History, GitBranch, Network, Package, Brain, Terminal,
  MessageSquare, Bookmark, Zap, Sparkles, Bug, Gauge, Cpu, Settings,
  Link as LinkIcon, Info, Search, Sun, Moon, Bell, Folder, CheckCircle2, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/site/theme-provider';
import { KnowledgeGraphTab } from '@/components/dashboard/knowledge-graph-tab';
import { TimelineTab } from '@/components/dashboard/timeline-tab';
import { BuildMemoryTab } from '@/components/dashboard/build-memory-tab';
import { ArchitectureTab } from '@/components/dashboard/architecture-tab';
import { PromptHistoryTab } from '@/components/dashboard/prompt-history-tab';
import { AnalyticsTab } from '@/components/dashboard/analytics-tab';
import { SettingsTab } from '@/components/dashboard/settings-tab';

const navSections = [
  {
    title: 'MEMORY',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'timeline', label: 'Timeline', icon: History },
      { id: 'graph', label: 'Knowledge Graph', icon: GitBranch },
      { id: 'architecture', label: 'Architecture Explorer', icon: Network },
      { id: 'builds', label: 'Build Memories', icon: Package },
      { id: 'full-context', label: 'Full Context', icon: Brain },
      { id: 'prompts', label: 'Prompt History', icon: Terminal },
      { id: 'chat-history', label: 'Chat History', icon: MessageSquare },
      { id: 'decisions', label: 'Decision Explorer', icon: Bookmark },
      { id: 'impact', label: 'Impact Analysis', icon: Zap },
    ]
  },
  {
    title: 'STATE',
    items: [
      { id: 'feature-timeline', label: 'Feature Timeline', icon: Sparkles },
      { id: 'bug-timeline', label: 'Bug Timeline', icon: Bug },
      { id: 'performance', label: 'Performance Timeline', icon: Gauge },
      { id: 'ai-sessions', label: 'AI Sessions', icon: Cpu },
    ]
  },
  {
    title: 'CONFIGURATION',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'integrations', label: 'Integrations', icon: LinkIcon },
      { id: 'about', label: 'About', icon: Info },
    ]
  }
];

export function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<string>('graph');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Bar */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary border border-primary/20">
              DM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight">devmemoryai</span>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400 border border-emerald-500/20">Healthy</span>
              </div>
              <p className="text-[12px] text-muted-foreground font-mono">
                Workspace / {activeTab} &bull; Visual Dashboard (localhost:31415)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-1.5">
              <span>BRANCH <strong className="text-foreground">main</strong></span>
              <span className="text-border">|</span>
              <span>BUILD <strong className="text-foreground">387</strong></span>
              <span className="text-border">|</span>
              <span>MODEL <strong className="text-primary">gpt-oss:120b</strong></span>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('devmemory-open-command-palette'))}
              className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search...</span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              RUNNING
            </span>
          </div>
        </div>

        {/* Dashboard Shell */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40 shadow-elevated">
          <div className="grid grid-cols-12">
            
            {/* Sidebar */}
            <aside className="col-span-12 border-b border-border bg-secondary/30 md:col-span-3 md:border-b-0 md:border-r lg:col-span-2">
              <div className="p-3">
                <nav className="space-y-4">
                  {navSections.map((sec) => (
                    <div key={sec.title}>
                      <div className="px-3 pb-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
                        {sec.title}
                      </div>
                      <div className="space-y-0.5">
                        {sec.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={cn(
                                'flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors',
                                isActive
                                  ? 'bg-primary/15 text-primary border border-primary/25 font-semibold'
                                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
                              )}
                            >
                              <Icon className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
                              <span className="truncate">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Sidebar Footer Live Status */}
                <div className="mt-6 border-t border-border pt-3 font-mono text-[10px] text-muted-foreground space-y-1 px-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Connected CLI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>SQLite DB Active</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>MCP SSE (:31414)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Dashboard UI (:31415)</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'graph' && <KnowledgeGraphTab />}
                  {activeTab === 'timeline' && <TimelineTab />}
                  {activeTab === 'builds' && <BuildMemoryTab />}
                  {activeTab === 'architecture' && <ArchitectureTab />}
                  {activeTab === 'prompts' && <PromptHistoryTab />}
                  {activeTab === 'settings' && <SettingsTab />}
                  {activeTab !== 'graph' && activeTab !== 'timeline' && activeTab !== 'builds' && activeTab !== 'architecture' && activeTab !== 'prompts' && activeTab !== 'settings' && (
                    <div className="p-8 text-center font-mono">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary mb-3">
                        <Brain className="h-6 w-6" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground capitalize">{activeTab.replace('-', ' ')} View</h3>
                      <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                        Connected to DevMemory AI Memory Engine. Live project state synchronized via SQLite database.
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-[11px] text-primary">
                        <span>Local Endpoint: http://localhost:31415</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Live Dashboard Footer Status */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-card/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              RUNNING
            </span>
            <span className="text-border">|</span>
            <span className="text-primary">MCP Server: CONNECTED (:31414)</span>
            <span className="text-border">|</span>
            <span>Graph DB: HEALTHY</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Visual Dashboard: http://localhost:31415</span>
          </div>
        </div>

      </div>
    </div>
  );
}
