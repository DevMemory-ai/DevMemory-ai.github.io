'use client';

import { useState } from 'react';
import { useTheme } from '@/components/site/theme-provider';
import { cn } from '@/lib/utils';
import { Sun, Moon, Terminal, Database, Network, Save } from 'lucide-react';

export function SettingsTab() {
  const { theme, setTheme } = useTheme();
  const [mcpPort, setMcpPort] = useState('31414');
  const [autoSync, setAutoSync] = useState(true);
  const [indexDepth, setIndexDepth] = useState(7);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-[13px] text-muted-foreground">Configure DevMemory for your project.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Appearance */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h3 className="text-sm font-semibold">Appearance</h3>
          <div className="mt-4">
            <label className="text-[13px] text-muted-foreground">Theme</label>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] transition-colors',
                  theme === 'dark' ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] transition-colors',
                  theme === 'light' ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
            </div>
          </div>
        </div>

        {/* MCP Server */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">MCP Server</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-[13px] text-muted-foreground">Port</label>
              <input
                value={mcpPort}
                onChange={(e) => setMcpPort(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium">Auto-start on boot</div>
                <div className="text-[11px] text-muted-foreground">Start MCP server when DevMemory launches</div>
              </div>
              <button
                onClick={() => setAutoSync(!autoSync)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  autoSync ? 'bg-primary' : 'bg-muted'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                  autoSync ? 'translate-x-[22px]' : 'translate-x-0.5'
                )} />
              </button>
            </div>
          </div>
        </div>

        {/* Indexing */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Indexing</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[13px] text-muted-foreground">Max Analysis Depth</label>
                <span className="font-mono text-[13px]">{indexDepth}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={indexDepth}
                onChange={(e) => setIndexDepth(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-[13px] text-muted-foreground">Ignore Patterns</label>
              <textarea
                defaultValue="node_modules/\n.git/\ndist/\n.next/\ncoverage/"
                className="mt-1.5 h-24 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-[12px] outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* CLI */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">CLI Configuration</h3>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-3">
            <pre className="font-mono text-[12px] text-muted-foreground">
{`devmemory config set mcp.port ${mcpPort}
devmemory config set index.depth ${indexDepth}
devmemory config set sync.auto ${autoSync}`}
            </pre>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" />
          Save changes
        </button>
      </div>
    </div>
  );
}
