'use client';

import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit max-w-max shrink-0 items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm',
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {label && <SectionLabel className={align === 'center' ? 'self-center' : 'self-start'}>{label}</SectionLabel>}
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28', className)}>
      {children}
    </section>
  );
}
