'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from './section';

export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 lg:pt-32 lg:pb-14">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="absolute left-1/2 top-0 h-[260px] w-[550px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
