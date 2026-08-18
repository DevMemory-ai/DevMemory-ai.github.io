'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ChevronRight, GitBranch, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

type Build = {
  id: string;
  number: number;
  branch: string;
  commit: string;
  status: 'passed' | 'failed' | 'running';
  duration: string;
  time: string;
  tests: { passed: number; failed: number; total: number };
  message: string;
};

const builds: Build[] = [
  { id: '1', number: 1204, branch: 'main', commit: 'a1b2c3d', status: 'passed', duration: '2m 14s', time: '14:02', tests: { passed: 847, failed: 0, total: 847 }, message: 'feat: Add user authentication flow' },
  { id: '2', number: 1203, branch: 'main', commit: 'e4f5g6h', status: 'passed', duration: '2m 09s', time: '10:30', tests: { passed: 845, failed: 0, total: 845 }, message: 'refactor: Extract database connection pool' },
  { id: '3', number: 1202, branch: 'feature/cache-fix', commit: 'i7j8k9l', status: 'passed', duration: '2m 22s', time: '12:15', tests: { passed: 843, failed: 0, total: 843 }, message: 'fix: Resolve memory leak in cache' },
  { id: '4', number: 1201, branch: 'main', commit: 'm0n1o2p', status: 'failed', duration: '1m 48s', time: '09:42', tests: { passed: 840, failed: 3, total: 843 }, message: 'chore: Update dependencies' },
  { id: '5', number: 1200, branch: 'main', commit: 'q3r4s5t', status: 'passed', duration: '2m 11s', time: 'Yesterday', tests: { passed: 843, failed: 0, total: 843 }, message: 'feat: Add analytics dashboard' },
  { id: '6', number: 1199, branch: 'feature/oauth', commit: 'u6v7w8x', status: 'running', duration: '—', time: '13:50', tests: { passed: 412, failed: 0, total: 843 }, message: 'feat: Add OAuth providers' },
];

export function BuildMemoryTab() {
  const [selected, setSelected] = useState<string>('1');
  const selectedBuild = builds.find((b) => b.id === selected);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Build Memory</h2>
        <p className="text-[13px] text-muted-foreground">Every build, every test, every failure — remembered.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Build list */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-12 border-b border-border bg-secondary/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Commit</div>
              <div className="col-span-2">Branch</div>
              <div className="col-span-2">Tests</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Time</div>
            </div>
            {builds.map((build, i) => (
              <button
                key={build.id}
                onClick={() => setSelected(build.id)}
                className={cn(
                  'grid w-full grid-cols-12 items-center border-b border-border/50 px-4 py-3 text-left text-[13px] transition-colors',
                  selected === build.id ? 'bg-accent/40' : 'hover:bg-accent/20'
                )}
              >
                <div className="col-span-1 font-mono text-muted-foreground">{build.number}</div>
                <div className="col-span-5 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-primary">{build.commit}</span>
                  <span className="truncate text-foreground">{build.message}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <GitBranch className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-[11px] text-muted-foreground">{build.branch}</span>
                </div>
                <div className="col-span-2 font-mono text-[12px]">
                  <span className="text-success">{build.tests.passed}</span>
                  {build.tests.failed > 0 && <span className="text-red-400"> / {build.tests.failed}f</span>}
                  <span className="text-muted-foreground"> / {build.tests.total}</span>
                </div>
                <div className="col-span-1">
                  {build.status === 'passed' && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {build.status === 'failed' && <XCircle className="h-4 w-4 text-red-400" />}
                  {build.status === 'running' && <Clock className="h-4 w-4 animate-pulse text-warning" />}
                </div>
                <div className="col-span-1 font-mono text-[11px] text-muted-foreground">{build.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Build detail */}
        <div>
          {selectedBuild && (
            <motion.div
              key={selectedBuild.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold">Build #{selectedBuild.number}</span>
                {selectedBuild.status === 'passed' && <span className="rounded-md bg-success/15 px-2 py-0.5 text-[11px] text-success">Passed</span>}
                {selectedBuild.status === 'failed' && <span className="rounded-md bg-red-500/15 px-2 py-0.5 text-[11px] text-red-400">Failed</span>}
                {selectedBuild.status === 'running' && <span className="rounded-md bg-warning/15 px-2 py-0.5 text-[11px] text-warning">Running</span>}
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-[11px] text-muted-foreground">Commit</div>
                  <div className="mt-0.5 font-mono text-[12px] text-primary">{selectedBuild.commit}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Message</div>
                  <div className="mt-0.5 text-[13px]">{selectedBuild.message}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Branch</div>
                  <div className="mt-0.5 font-mono text-[12px]">{selectedBuild.branch}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Duration</div>
                  <div className="mt-0.5 font-mono text-[12px]">{selectedBuild.duration}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground">Tests</div>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-success">Passed</span>
                      <span className="font-mono">{selectedBuild.tests.passed}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-success" style={{ width: `${(selectedBuild.tests.passed / selectedBuild.tests.total) * 100}%` }} />
                    </div>
                    {selectedBuild.tests.failed > 0 && (
                      <>
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="text-red-400">Failed</span>
                          <span className="font-mono">{selectedBuild.tests.failed}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-red-400" style={{ width: `${(selectedBuild.tests.failed / selectedBuild.tests.total) * 100}%` }} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  Build log available
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
