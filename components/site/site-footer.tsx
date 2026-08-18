import Link from 'next/link';
import { Logo } from './logo';
import { Github, HelpCircle } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-bold tracking-tight text-foreground">
                DevMemory <span className="text-primary font-bold">AI</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              An Engineering Memory Operating System for software projects. Continuously capturing project knowledge, build history, engineering context, and architecture artifacts into persistent local memory.
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary border border-primary/20 font-semibold">
                Current Version: v1.0.0
              </span>
              <span>100% Local-First Engine</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/product" className="text-muted-foreground hover:text-foreground transition-colors">Product Overview</Link></li>
              <li><Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/simulation" className="text-muted-foreground hover:text-foreground transition-colors">Interactive Simulation</Link></li>
              <li><Link href="/architecture" className="text-muted-foreground hover:text-foreground transition-colors">Architecture</Link></li>
              <li><Link href="/download" className="text-muted-foreground hover:text-foreground transition-colors">Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/docs?tab=faq#faq" className="text-muted-foreground hover:text-primary font-semibold transition-colors flex items-center gap-1.5"><HelpCircle className="h-3.5 w-3.5 text-primary" /> FAQ & Troubleshooting</Link></li>
              <li><Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">Changelog (v1.0.0)</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Technical Blog</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
              <li><a href="https://discord.gg/ycF48ADnx" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#5865F2] transition-colors flex items-center gap-1">Discord Community</a></li>
              <li><a href="https://github.com/DevMemory-AI/devmemoryai" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><Github className="h-3.5 w-3.5" /> GitHub</a></li>
              <li><Link href="/community#license" className="text-muted-foreground hover:text-foreground transition-colors">License Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Release Info</h3>
            <ul className="mt-4 space-y-2.5 text-xs font-mono text-muted-foreground">
              <li>Version: <strong className="text-primary">v1.0.0</strong></li>
              <li>Storage: <strong className="text-foreground">SQLite Index</strong></li>
              <li>Dashboard: <strong className="text-foreground">:31415</strong></li>
              <li>License: <strong className="text-foreground">Source-Available</strong></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DevMemory AI. All rights reserved. Built for engineering teams.</p>
          <div className="flex items-center gap-4">
            <Link href="/docs?tab=faq#faq" className="hover:text-primary font-medium transition-colors">FAQ</Link>
            <span>•</span>
            <span>DevMemory AI v1.0.0</span>
            <span>•</span>
            <a href="https://github.com/DevMemory-AI/devmemoryai" target="_blank" rel="noreferrer" className="hover:text-foreground">Official Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
