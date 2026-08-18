'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command as CommandPrimitive } from 'cmdk';
import { Search, ArrowRight, File, Hash } from 'lucide-react';
import { commandPaletteNav } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('devmemory-open-command-palette', onOpen);
    return () => window.removeEventListener('devmemory-open-command-palette', onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-10 w-full max-w-xl animate-scale-in px-4">
        <CommandPrimitive
          className="overflow-hidden rounded-2xl border border-border bg-popover shadow-elevated"
          loop
        >
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <CommandPrimitive.Input
              placeholder="Search DevMemory..."
              className="h-14 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
          </div>
          <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
            <CommandPrimitive.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </CommandPrimitive.Empty>
            {commandPaletteNav.map((section) => (
              <CommandPrimitive.Group
                key={section.title}
                heading={section.title}
                className={cn('text-muted-foreground')}
              >
                {section.items.map((item) => (
                  <CommandPrimitive.Item
                    key={item.href}
                    onSelect={() => handleSelect(item.href)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground aria-selected:bg-accent aria-selected:text-foreground"
                  >
                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="flex-1">{item.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 aria-selected:opacity-100" />
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
            <span>DevMemory AI</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><kbd className="rounded bg-muted px-1 py-0.5 font-mono">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded bg-muted px-1 py-0.5 font-mono">↵</kbd> select</span>
            </span>
          </div>
        </CommandPrimitive>
      </div>
    </div>
  );
}
