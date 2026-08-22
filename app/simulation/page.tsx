'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Play,
  FolderTree,
  FileText,
  Activity,
  GitBranch,
  Database,
  Cpu,
  Layers,
  Search,
  HelpCircle,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Command as CommandIcon,
  FileCode,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HardDrive,
  BarChart2,
  List,
  Monitor,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Simulation Types ---
type FileItem = {
  name: string;
  type: 'file' | 'dir';
  path: string;
  description?: string;
  content: string;
  children?: FileItem[];
};

type BuildRecord = {
  id: number;
  promptText: string;
  timestamp: string;
  filesModified: number;
  functionsCount: number;
  componentsCount: number;
  summary: string;
  contextOverview: string;
  astSymbols: string[];
  timeline: string[];
  nodesCount: number;
  edgesCount: number;
  gitCommit: string;
  cooldownMs: number;
};

// --- Guided 3-Prompt Workflow Data ---
const promptWorkflow = [
  {
    id: 1,
    title: '1. Create Calculator',
    label: 'Prompt 1',
    promptText: 'Create a simple calculator application.',
    summary: 'Initialized core Calculator class with addition and subtraction AST symbols.',
    code: `// src/calculator.ts\nexport class Calculator {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  subtract(a: number, b: number): number {\n    return a - b;\n  }\n}`,
    contextOverview: 'DevMemory AI initialized SQLite Engineering Index (.devmemory/index.db). Extracted initial AST nodes for Calculator class.',
    astSymbols: [
      'class Calculator (src/calculator.ts)',
      'add(a: number, b: number): number',
      'subtract(a: number, b: number): number',
    ],
    timeline: [
      '10:42:01 — Prompt 1 submitted: "Create calculator"',
      '10:42:03 — Code updated in src/calculator.ts',
      '10:42:04 — Chokidar watcher detected change',
      '10:42:04 — Engineering Compiler parsed AST symbols',
      '10:42:05 — Build #1 committed to SQLite Index (.devmemory/index.db)',
    ],
    graphNodes: [
      { id: '1', label: 'Calculator App', type: 'root', x: 140, y: 30 },
      { id: '2', label: 'src/main.ts', type: 'file', x: 60, y: 110 },
      { id: '3', label: 'src/calculator.ts', type: 'file', x: 220, y: 110 },
    ],
    gitCommit: 'b1f90a2',
    functionsCount: 2,
    componentsCount: 2,
  },
  {
    id: 2,
    title: '2. Add Multiply & Divide',
    label: 'Prompt 2',
    promptText: 'Add multiplication and division support.',
    summary: 'Expanded Calculator engine with multiplication and division methods.',
    code: `// src/calculator.ts\nexport class Calculator {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  subtract(a: number, b: number): number {\n    return a - b;\n  }\n\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n\n  divide(a: number, b: number): number {\n    return a / b;\n  }\n}`,
    contextOverview: 'DevMemory AI updated SQLite Engineering Index (.devmemory/index.db). Re-scanned AST symbol tree and linked multiply/divide methods.',
    astSymbols: [
      'class Calculator (src/calculator.ts)',
      'add(a: number, b: number): number',
      'subtract(a: number, b: number): number',
      'multiply(a: number, b: number): number',
      'divide(a: number, b: number): number',
    ],
    timeline: [
      '10:44:12 — Prompt 2 submitted: "Add multiply & divide"',
      '10:44:14 — Code updated in src/calculator.ts',
      '10:44:15 — Chokidar watcher detected change',
      '10:44:15 — Engineering Compiler re-scanned AST symbols',
      '10:44:16 — Build #2 committed to SQLite Index (.devmemory/index.db)',
    ],
    graphNodes: [
      { id: '1', label: 'Calculator App', type: 'root', x: 140, y: 30 },
      { id: '2', label: 'src/main.ts', type: 'file', x: 60, y: 100 },
      { id: '3', label: 'src/calculator.ts', type: 'file', x: 220, y: 100 },
      { id: '4', label: 'multiply()', type: 'symbol', x: 150, y: 165 },
      { id: '5', label: 'divide()', type: 'symbol', x: 250, y: 165 },
    ],
    gitCommit: 'a7b4f8e',
    functionsCount: 4,
    componentsCount: 3,
  },
  {
    id: 3,
    title: '3. Improve UI & Safety',
    label: 'Prompt 3',
    promptText: 'Fix divide-by-zero handling and improve the UI.',
    summary: 'Added divide-by-zero safety checks & production UI layout handlers.',
    code: `// src/calculator.ts\nexport class Calculator {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  subtract(a: number, b: number): number {\n    return a - b;\n  }\n\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n\n  divide(a: number, b: number): number {\n    if (b === 0) {\n      throw new Error("Cannot divide by zero");\n    }\n    return a / b;\n  }\n}`,
    contextOverview: 'DevMemory AI compiled Build #3 in SQLite (.devmemory/index.db). Registered divide-by-zero exception boundary and styling relationships.',
    astSymbols: [
      'class Calculator (src/calculator.ts)',
      'add(a: number, b: number): number',
      'subtract(a: number, b: number): number',
      'multiply(a: number, b: number): number',
      'divide(a: number, b: number): number (Throws Error on zero)',
    ],
    timeline: [
      '10:45:30 — Prompt 3 submitted: "Fix divide-by-zero & UI"',
      '10:45:32 — Exception guard added to src/calculator.ts',
      '10:45:33 — Chokidar watcher detected change',
      '10:45:34 — DevMemory Engineering Compiler compiled Build #3',
      '10:45:35 — SQLite Engineering Index (.devmemory/index.db) fully synchronized',
    ],
    graphNodes: [
      { id: '1', label: 'Calculator App', type: 'root', x: 140, y: 25 },
      { id: '2', label: 'src/main.ts', type: 'file', x: 50, y: 85 },
      { id: '3', label: 'src/calculator.ts', type: 'file', x: 230, y: 85 },
      { id: '4', label: 'multiply()', type: 'symbol', x: 140, y: 145 },
      { id: '5', label: 'divide()', type: 'symbol', x: 240, y: 145 },
      { id: '6', label: 'SafetyGuard', type: 'guard', x: 180, y: 200 },
    ],
    gitCommit: 'c9d1e4f',
    functionsCount: 5,
    componentsCount: 4,
  },
];

export default function SimulationPage() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [completedBuilds, setCompletedBuilds] = useState<BuildRecord[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [activeFile, setActiveFile] = useState<string>('src/calculator.ts');
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'context' | 'builds' | 'graph' | 'timeline' | 'logs'>('context');

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'DevMemory AI v1.1.0 Interactive Simulator',
    'Select a guided prompt below or press Cmd+K for command palette.',
  ]);

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');

  // Scoped Terminal Auto-Scroll Control
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScrollTerminal, setShouldAutoScrollTerminal] = useState(true);

  const handleTerminalScroll = () => {
    if (!terminalContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = terminalContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 15;
    setShouldAutoScrollTerminal(isAtBottom);
  };

  useEffect(() => {
    if (shouldAutoScrollTerminal && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs, shouldAutoScrollTerminal]);

  // Keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const currentPrompt = promptWorkflow[activePromptIndex];

  // Guided Prompt Execution (No manual dmai build command — automatic Watcher & Compiler pipeline)
  const runPromptSimulation = async (index: number) => {
    if (isAnimating) return;
    setActivePromptIndex(index);
    setIsAnimating(true);
    const p = promptWorkflow[index];

    // Pipeline Step 1: Prompt Submitted
    setPipelineStep(1);
    setTerminalLogs((prev) => [...prev, `$ dmai prompt "${p.promptText}"`]);
    await new Promise((res) => setTimeout(res, 500));

    // Pipeline Step 2: AI Code Edit
    setPipelineStep(2);
    setActiveFile('src/calculator.ts');
    setTerminalLogs((prev) => [...prev, 'AI updating code in src/calculator.ts...', '✔ File saved']);
    await new Promise((res) => setTimeout(res, 600));

    // Pipeline Step 3: Watcher & Compiler AST Execution (Automatic, no CLI build command)
    setPipelineStep(3);
    setTerminalLogs((prev) => [
      ...prev,
      '[Watcher] Chokidar detected modification in src/calculator.ts',
      '[TransactionManager] Grouped save event into active transaction',
      '[Compiler] Parsing AST symbol tree & component edges...',
    ]);
    await new Promise((res) => setTimeout(res, 600));

    // Pipeline Step 4: SQLite Synchronization
    setPipelineStep(4);
    setTerminalLogs((prev) => [
      ...prev,
      'Updating SQLite Engineering Index (.devmemory/index.db)...',
      'Writing Build Metadata to SQLite...',
      'Updating Node Relationships & Edges...',
      'Recording Timeline Event...',
      'Flushing Write-Ahead Log (.devmemory/index.db-wal)...',
    ]);
    await new Promise((res) => setTimeout(res, 600));

    // Pipeline Step 5: Dashboard Refresh & Build Complete
    setPipelineStep(5);
    setTerminalLogs((prev) => [
      ...prev,
      'Refreshing Dashboard (:31415)...',
      '✔ SQLite synchronized successfully.',
      `✔ Build #${index + 1} compiled into Engineering Index.`,
    ]);

    // Record Build in State
    const newBuild: BuildRecord = {
      id: index + 1,
      promptText: p.promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      filesModified: 2 + index,
      functionsCount: p.functionsCount,
      componentsCount: p.componentsCount,
      summary: p.summary,
      contextOverview: p.contextOverview,
      astSymbols: p.astSymbols,
      timeline: p.timeline,
      nodesCount: p.graphNodes.length,
      edgesCount: p.graphNodes.length - 1,
      gitCommit: p.gitCommit,
      cooldownMs: 20000,
    };

    setCompletedBuilds((prev) => {
      const filtered = prev.filter((b) => b.id !== newBuild.id);
      return [...filtered, newBuild].sort((a, b) => a.id - b.id);
    });

    // Auto switch Dashboard to Engineering Context view
    setDashboardTab('context');

    await new Promise((res) => setTimeout(res, 300));
    setPipelineStep(0);
    setIsAnimating(false);
  };

  // Run Prompt 1 on page load
  useEffect(() => {
    runPromptSimulation(0);
  }, []);

  // Simulated DMAI CLI Commands (Valid DMAI CLI Commands Only — no dmai build)
  const runSimulatedCommand = (cmd: string) => {
    setCommandPaletteOpen(false);
    setCommandSearch('');
    setTerminalLogs((prev) => [...prev, `$ ${cmd}`]);

    if (cmd === 'dmai status') {
      setTerminalLogs((prev) => [
        ...prev,
        'Project:              calculator-demo',
        'Watcher:              ACTIVE (PID 28401)',
        'Engineering Index:    .devmemory/index.db (SQLite WAL)',
        `Last Build:           Build #${activePromptIndex + 1} (${currentPrompt.gitCommit})`,
        'Health Status:        100% Operational',
      ]);
    } else if (cmd === 'dmai summary') {
      setDashboardTab('overview');
      setTerminalLogs((prev) => [...prev, '✔ Displaying Executive Summary in Dashboard']);
    } else if (cmd === 'dmai graph') {
      setDashboardTab('graph');
      setTerminalLogs((prev) => [...prev, '✔ Displaying Knowledge Graph in Dashboard']);
    } else if (cmd === 'dmai timeline') {
      setDashboardTab('timeline');
      setTerminalLogs((prev) => [...prev, '✔ Displaying Timeline in Dashboard']);
    } else if (cmd === 'dmai doctor') {
      setTerminalLogs((prev) => [
        ...prev,
        '✔ Git repo: OK',
        '✔ Watcher process lock (watcher.pid): OK',
        '✔ SQLite DB integrity (.devmemory/index.db): PASSED',
        '✔ Dashboard server (:31415): ACTIVE',
      ]);
    } else {
      setTerminalLogs((prev) => [...prev, `✔ Executed ${cmd} (SQLite index ok)`]);
    }
  };

  // File Content Provider
  const getFileContent = (filePath: string) => {
    if (filePath === 'src/calculator.ts') return currentPrompt.code;
    if (filePath === 'src/main.ts') return `import { Calculator } from './calculator';\n\nconst calc = new Calculator();\nconsole.log("DevMemory AI Demo Calculator Ready");`;
    if (filePath === 'styles.css') return `/* Calculator Styles */\nbody { background: #09090B; color: #FAFAFA; font-family: sans-serif; }`;
    if (filePath === 'package.json') return `{\n  "name": "calculator-demo",\n  "version": "1.1.0"\n}`;
    if (filePath === 'README.md') return `# Calculator Demo App\n\nDemonstrating DevMemory AI v1.1.0 local SQLite Engineering Index.`;
    if (filePath === '.devmemory/project.json') return `{\n  "version": "1.1.0",\n  "projectId": "proj_demo",\n  "repository": { "name": "calculator-demo" },\n  "ai": { "provider": "ollama", "model": "gpt-oss:120b-cloud" },\n  "dashboard": { "port": 31415 }\n}`;
    if (filePath === '.devmemory/index.db') return `[SQLite Engineering Index Database — .devmemory/index.db]\n\nSchema Tables:\n- nodes (AST symbols, components, files)\n- edges (imports, calls, inheritance)\n- builds (build_id, commit_hash, prompt, timestamp)\n- transactions (tx_id, status, cooldown)\n- prompts (prompt_id, text, timestamp)`;
    if (filePath === '.devmemory/index.db-wal') return `[SQLite Write-Ahead Log Journal — .devmemory/index.db-wal]\n\nUncommitted WAL transactions for zero-latency local writes.`;
    if (filePath === '.devmemory/runtime.log') return `[10:42:01] [Runtime] Initialized in /workspace/calculator-demo\n[10:42:04] [Compiler] Build #${activePromptIndex + 1} written to .devmemory/index.db`;
    return '// Code content';
  };

  const commandsList = [
    { cmd: 'dmai status', desc: 'Show Runtime, Watcher, and SQLite Index status' },
    { cmd: 'dmai summary', desc: 'Switch dashboard preview to Executive Overview' },
    { cmd: 'dmai graph', desc: 'Switch dashboard preview to Knowledge Graph' },
    { cmd: 'dmai timeline', desc: 'Switch dashboard preview to Build Timeline' },
    { cmd: 'dmai doctor', desc: 'Run diagnostics on repository & SQLite DB integrity' },
    { cmd: 'dmai ask "How does the compiler work?"', desc: 'Query SQLite index directly' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-background font-sans text-foreground pb-12">
      {/* Visual Representation Disclaimer Bar */}
      <div className="hidden md:flex items-center justify-center gap-2 bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-xs text-primary font-mono font-medium">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Note: The simulation shown here is a visual representation and does not need to be identical after local installation.</span>
      </div>

      {/* Mobile Notice (Simulation is desktop-only) */}
      <div className="block md:hidden p-6 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
          <Monitor className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Desktop Display Required</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          The DevMemory AI Interactive IDE Simulation requires a desktop display (&ge;1024px) to present the multi-panel Code Editor, SQLite Index Explorer, and Live Dashboard Preview.
        </p>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs text-left text-zinc-900 dark:text-zinc-100 space-y-1.5 shadow-sm max-w-sm mx-auto">
          <div className="text-primary font-bold"># Access via Desktop Browser</div>
          <div className="text-zinc-700 dark:text-zinc-300">URL: https://devmemory.ai/simulation</div>
          <div className="text-zinc-600 dark:text-zinc-400">Recommended Resolution: 1280 x 800 or larger</div>
        </div>
      </div>

      {/* Top Bar: Guided Pipeline Indicator (Desktop Only) */}
      <div className="hidden md:flex flex-wrap h-auto min-h-11 items-center justify-between border-b border-border bg-card px-4 py-2 sm:px-6 gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs font-bold text-foreground">
            calculator-demo
          </span>
          <span className="hidden sm:inline-block text-xs text-muted-foreground">
            &mdash; DevMemory AI v1.1.0 Interactive Simulation
          </span>
        </div>

        {/* Guided Step Progress Indicator */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {[
            { step: 1, label: '1. Prompt' },
            { step: 2, label: '2. Code' },
            { step: 3, label: '3. Watcher' },
            { step: 4, label: '4. SQLite Sync' },
            { step: 5, label: '5. Build' },
          ].map((s) => (
            <div
              key={s.step}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-0.5 transition-all',
                pipelineStep === s.step
                  ? 'bg-primary/20 text-primary font-bold border border-primary/40'
                  : pipelineStep > s.step || completedBuilds.length > 0
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground/40'
              )}
            >
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Command Palette Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all font-mono shadow-xs"
          >
            <CommandIcon className="h-3 w-3 text-primary" />
            <span>Cmd + K</span>
          </button>
        </div>
      </div>

      {/* Main Workspace (4 Columns: Explorer, Editor + Terminal, Dashboard Preview) - Desktop Only */}
      <div className="hidden md:grid flex-1 grid-cols-12 border-b border-border">
        {/* Column 1: SQLite-First Project Explorer */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col border-r border-border bg-card/50 text-xs">
          <div className="flex h-9 items-center justify-between border-b border-border px-3 font-mono text-[11px] font-bold text-muted-foreground uppercase shrink-0">
            <span>Explorer</span>
            <FolderTree className="h-3.5 w-3.5 text-primary" />
          </div>

          <div className="flex-1 overflow-y-auto p-3 font-mono space-y-3 max-h-[500px]">
            {/* .devmemory/ Directory (SQLite First) */}
            <div>
              <div className="flex items-center gap-1 text-[11px] text-primary font-bold mb-1">
                <ChevronDown className="h-3 w-3" />
                <span>.devmemory/</span>
              </div>
              <div className="ml-3 space-y-0.5">
                {[
                  { name: 'index.db', desc: 'SQLite Engineering Index' },
                  { name: 'index.db-shm', desc: 'SQLite Shared Memory' },
                  { name: 'index.db-wal', desc: 'SQLite Write-Ahead Log' },
                  { name: 'project.json', desc: 'Manifest Configuration' },
                  { name: 'runtime.log', desc: 'Runtime Event Log' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveFile(`.devmemory/${item.name}`)}
                    className={cn(
                      'flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left transition-colors',
                      activeFile === `.devmemory/${item.name}`
                        ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Database className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Source files */}
            <div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-bold mb-1 pt-2 border-t border-border/60">
                <ChevronDown className="h-3 w-3" />
                <span>src/</span>
              </div>
              <div className="ml-3 space-y-0.5">
                {['src/calculator.ts', 'src/main.ts', 'styles.css'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFile(f)}
                    className={cn(
                      'flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left transition-colors',
                      activeFile === f ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <FileCode className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{f.replace('src/', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Root Files */}
            <div className="pt-2 border-t border-border/60 space-y-0.5">
              {['package.json', 'README.md'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFile(f)}
                  className={cn(
                    'flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left transition-colors',
                    activeFile === f ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{f}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 & 3: Code Editor & Terminal Stream */}
        <div className="col-span-12 md:col-span-9 lg:col-span-6 flex flex-col border-r border-border bg-card/20">
          {/* Editor Header */}
          <div className="flex h-9 items-center justify-between border-b border-border bg-card px-4 font-mono text-xs shrink-0">
            <div className="flex items-center gap-2">
              <FileCode className="h-3.5 w-3.5 text-primary" />
              <span className="font-bold text-foreground">{activeFile}</span>
            </div>
            {pipelineStep === 2 && (
              <span className="text-[11px] font-bold text-primary animate-pulse flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> AI writing code...
              </span>
            )}
          </div>

          {/* Code Editor Body */}
          <div className="min-h-[250px] max-h-[380px] overflow-y-auto p-4 font-mono text-xs leading-relaxed text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-[#09090B]">
            <pre className="whitespace-pre-wrap">
              <code>{getFileContent(activeFile)}</code>
            </pre>
          </div>

          {/* Terminal Stream */}
          <div className="h-40 border-t border-border bg-zinc-100 dark:bg-[#070709] flex flex-col font-mono text-xs shrink-0">
            <div className="flex h-7 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/80 dark:bg-[#111217] px-4 text-[11px]">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-bold">
                <TerminalIcon className="h-3.5 w-3.5 text-primary" />
                <span>dmai terminal stream</span>
              </div>
              <span className="text-[10px] text-success font-bold">SQLite WAL: ACTIVE</span>
            </div>
            <div
              ref={terminalContainerRef}
              onScroll={handleTerminalScroll}
              className="flex-1 overflow-y-auto p-3 text-[11px] leading-relaxed space-y-1"
            >
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={cn(
                    log.startsWith('$')
                      ? 'text-primary font-bold mt-1'
                      : log.startsWith('✔')
                      ? 'text-success font-semibold'
                      : log.startsWith('[')
                      ? 'text-zinc-400 font-mono'
                      : 'text-zinc-300'
                  )}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom AI Prompt Selector Bar */}
          <div className="border-t border-border bg-card p-3 shrink-0">
            <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground font-bold">
              <span className="flex items-center gap-1.5 text-primary">
                <Sparkles className="h-3.5 w-3.5" /> SELECT A GUIDED PROMPT TO ANIMATE SIMULATION:
              </span>
              <span>Prompt {activePromptIndex + 1} of 3</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {promptWorkflow.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => runPromptSimulation(idx)}
                  disabled={isAnimating}
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition-all font-mono',
                    activePromptIndex === idx
                      ? 'border-primary bg-primary/15 text-foreground font-bold shadow-sm'
                      : 'border-border bg-accent/50 text-foreground hover:border-primary/50 hover:bg-accent'
                  )}
                >
                  <div className="truncate">
                    <div className="text-[10px] text-primary uppercase font-bold">{p.label}</div>
                    <div className="truncate text-xs font-semibold">{p.promptText}</div>
                  </div>
                  <Play className="h-3.5 w-3.5 text-primary shrink-0 ml-1 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 4: Live Dashboard Preview */}
        <div className="col-span-12 lg:col-span-4 flex flex-col bg-card/30">
          {/* Dashboard Preview Titlebar */}
          <div className="flex h-9 items-center justify-between border-b border-border bg-card px-4 font-mono text-[11px] font-bold shrink-0">
            <div className="flex items-center gap-2 text-foreground">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>DASHBOARD PREVIEW (:31415)</span>
            </div>
            <span className="text-success text-[10px] uppercase font-bold">Live SQLite Sync</span>
          </div>

          {/* Dashboard Tab Navigation Bar */}
          <div className="flex overflow-x-auto border-b border-border bg-card/60 p-1 font-mono text-[11px] shrink-0">
            {[
              { id: 'context', label: 'Context' },
              { id: 'overview', label: 'Overview' },
              { id: 'builds', label: 'Build Memory' },
              { id: 'graph', label: 'Knowledge Graph' },
              { id: 'timeline', label: 'Timeline' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id as any)}
                className={cn(
                  'rounded-lg px-2.5 py-1 transition-all whitespace-nowrap',
                  dashboardTab === tab.id
                    ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Body Viewports */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans max-h-[680px]">
            {/* View 1: Engineering Context View */}
            {dashboardTab === 'context' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-primary uppercase">Engineering Context (SQLite)</span>
                    <span className="text-muted-foreground text-[10px]">Build #{activePromptIndex + 1}</span>
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {currentPrompt.contextOverview}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-muted-foreground uppercase">
                    Extracted AST Symbols & Boundaries
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    {currentPrompt.astSymbols.map((sym, idx) => (
                      <div key={idx} className="rounded-xl border border-border bg-card p-2.5 text-foreground font-semibold">
                        • {sym}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 space-y-2 font-mono text-xs">
                  <div className="text-muted-foreground font-bold">SQLite Index Metadata</div>
                  <div className="text-foreground">Database: <span className="text-primary font-bold">.devmemory/index.db</span></div>
                  <div className="text-foreground">Ollama Model: <span className="text-success font-bold">gpt-oss:120b-cloud</span></div>
                </div>
              </div>
            )}

            {/* View 2: Project Overview */}
            {dashboardTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-muted-foreground text-[10px]">Repository</div>
                    <div className="font-bold text-foreground mt-0.5">calculator-demo</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-muted-foreground text-[10px]">SQLite Storage</div>
                    <div className="font-bold text-primary mt-0.5">14.8 KB</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-muted-foreground text-[10px]">AST Functions</div>
                    <div className="font-bold text-success mt-0.5">{currentPrompt.functionsCount} Functions</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-muted-foreground text-[10px]">Components</div>
                    <div className="font-bold text-foreground mt-0.5">{currentPrompt.componentsCount} Components</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                  <div className="font-bold text-foreground text-xs">Executive Engineering Summary</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentPrompt.summary}</p>
                </div>
              </div>
            )}

            {/* View 3: Build Memory */}
            {dashboardTab === 'builds' && (
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-muted-foreground uppercase">
                  Build History in SQLite ({completedBuilds.length})
                </div>
                {promptWorkflow.map((p, idx) => {
                  const isRecorded = completedBuilds.some((b) => b.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        'rounded-2xl border p-4 transition-all space-y-2 font-mono text-xs',
                        activePromptIndex === idx
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : isRecorded
                          ? 'border-border bg-card'
                          : 'border-border/40 opacity-50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">Build #{p.id}</span>
                        <span className="text-[10px] text-muted-foreground">{p.gitCommit}</span>
                      </div>
                      <div className="text-foreground font-sans font-bold">{p.promptText}</div>
                      <div className="text-[11px] text-muted-foreground leading-relaxed">{p.summary}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View 4: Growing Knowledge Graph */}
            {dashboardTab === 'graph' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-foreground uppercase">
                  <span>SQLite Knowledge Graph</span>
                  <span className="text-success text-[11px]">{currentPrompt.graphNodes.length} Nodes</span>
                </div>
                <div className="relative h-56 w-full rounded-2xl border border-border bg-zinc-100 dark:bg-[#070709] p-3 overflow-hidden shadow-inner">
                  <svg className="h-full w-full">
                    {currentPrompt.graphNodes.map((node, idx) => {
                      if (idx === 0) return null;
                      const rootNode = currentPrompt.graphNodes[0];
                      return (
                        <line
                          key={idx}
                          x1={rootNode.x}
                          y1={rootNode.y}
                          x2={node.x}
                          y2={node.y}
                          stroke="#EA580C"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      );
                    })}
                    {currentPrompt.graphNodes.map((node) => (
                      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <circle
                          r="14"
                          fill={node.type === 'root' ? '#EA580C' : node.type === 'guard' ? '#22C55E' : '#18181B'}
                          stroke="#EA580C"
                          strokeWidth="1.5"
                        />
                        <text
                          y="24"
                          textAnchor="middle"
                          fill="#A1A1AA"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* View 5: Recorded Build Timeline */}
            {dashboardTab === 'timeline' && (
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-muted-foreground uppercase">
                  Recorded Engineering Timeline
                </div>
                <div className="relative border-l border-primary/40 pl-4 space-y-4 text-xs font-mono">
                  {currentPrompt.timeline.map((event, idx) => (
                    <div key={idx} className="relative space-y-0.5">
                      <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="text-foreground font-medium">{event}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command Palette Modal (Cmd + K) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl font-mono text-xs"
            >
              <div className="flex items-center border-b border-border px-4 py-3">
                <Search className="h-4 w-4 text-primary mr-3" />
                <input
                  type="text"
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  placeholder="Type a dmai command (e.g., dmai status, dmai ask)..."
                  className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                {commandsList
                  .filter((c) => c.cmd.toLowerCase().includes(commandSearch.toLowerCase()))
                  .map((item) => (
                    <button
                      key={item.cmd}
                      onClick={() => runSimulatedCommand(item.cmd)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-primary/20 hover:text-primary transition-colors group"
                    >
                      <span className="font-bold text-foreground group-hover:text-primary">{item.cmd}</span>
                      <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                    </button>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
