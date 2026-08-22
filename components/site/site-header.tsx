'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './logo';
import { mainNav } from '@/lib/navigation';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-85" aria-label="DevMemory AI home">
          <Logo />
          <span className="hidden text-base font-bold tracking-tight sm:inline-block text-foreground">
            DevMemory <span className="text-primary font-bold">AI</span>
          </span>
        </Link>

        {/* Center: Main Navigation (Centered Symmetrically) */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 gap-1.5 font-sans">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold transition-all',
                pathname === item.href
                  ? 'text-foreground bg-accent/80 font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <span>{item.title}</span>
              {item.badge && (
                <span className="inline-flex items-center rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary border border-primary/30 font-mono leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Discord Server Button right next to Download button (hidden on mobile drawer to avoid duplicate buttons) */}
          <a
            href="https://discord.gg/ycF48ADnx"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:text-[#5865F2] hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10"
            aria-label="Join DevMemory AI Discord Server"
            title="Join Discord Server"
          >
            <DiscordIcon className="h-4 w-4 fill-current" />
          </a>

          <Link href="/download" className="hidden sm:block">
            <Button size="sm" className="h-9 px-4 rounded-xl gap-1.5 bg-primary text-xs font-bold text-primary-foreground hover:bg-[#d94e09] shadow-sm shadow-primary/20 transition-all hover:scale-[1.02]">
              Download v1.1.0
            </Button>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-3.5 sm:px-6 text-sm">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
                  pathname === item.href
                    ? 'bg-accent text-foreground font-bold'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {item.title}
              </Link>
            ))}
            <a
              href="https://discord.gg/ycF48ADnx"
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/10 px-3 py-2 text-sm font-bold text-[#5865F2] hover:bg-[#5865F2]/20"
            >
              <DiscordIcon className="h-4 w-4 fill-current" /> Join Discord Server
            </a>
            <Link href="/download" className="mt-2">
              <Button className="w-full h-10 rounded-xl bg-primary text-primary-foreground hover:bg-[#d94e09] font-bold text-sm">
                Download DevMemory AI
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
