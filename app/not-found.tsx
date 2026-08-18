'use client';

import Link from 'next/link';
import { Logo } from '@/components/site/logo';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-bold tracking-tight">DevMemory<span className="text-primary font-bold">AI</span></span>
        </Link>

        <h1 className="mt-12 font-mono text-8xl font-semibold tracking-tight text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">Page not found</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          This page doesn't exist in the engineering index. It may have been moved or renamed.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
