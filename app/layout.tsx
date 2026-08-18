import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { ThemeProvider } from '@/components/site/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://devmemory.ai'),
  title: {
    default: 'DevMemory AI v1.0.0 — Engineering Memory System',
    template: '%s — DevMemory AI',
  },
  description:
    'Official website and documentation for DevMemory AI v1.0.0 — Persistent local engineering memory engine for software projects.',
  keywords: [
    'DevMemory AI',
    'Engineering Memory',
    'Developer Memory',
    'SQLite Index',
    'Local AI',
    'Codebase Intelligence',
    'Engineering Context',
  ],
  openGraph: {
    type: 'website',
    title: 'DevMemory AI v1.0.0 — Engineering Memory System',
    description:
      'Official website and documentation for DevMemory AI v1.0.0 — Persistent local engineering memory engine for software projects.',
    siteName: 'DevMemory AI',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <SiteHeader />
          <main className="min-h-screen pt-16">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
