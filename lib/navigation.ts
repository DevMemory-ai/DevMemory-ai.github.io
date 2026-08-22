export type NavItem = {
  title: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const mainNav: NavItem[] = [
  { title: 'Product', href: '/product' },
  { title: 'Architecture', href: '/architecture' },
  { title: 'Simulation', href: '/simulation', badge: 'v1.1.0' },
  { title: 'Docs', href: '/docs' },
  { title: 'Download', href: '/download' },
  { title: 'Changelog', href: '/changelog' },
  { title: 'Blog', href: '/blog' },
  { title: 'Community', href: '/community' },
];

export const footerNav: NavSection[] = [
  {
    title: 'Product',
    items: [
      { title: 'Product Overview', href: '/product' },
      { title: 'Architecture', href: '/architecture' },
      { title: 'Simulation', href: '/simulation' },
      { title: 'Downloads', href: '/download' },
      { title: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Resources & Community',
    items: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Blog', href: '/blog' },
      { title: 'Community', href: '/community' },
      { title: 'GitHub', href: 'https://github.com/DevMemory-ai/devmemoryai' },
      { title: 'License', href: '/community#license' },
    ],
  },
];

export const commandPaletteNav: NavSection[] = [
  {
    title: 'Navigation',
    items: [
      { title: 'Home', href: '/' },
      { title: 'Product', href: '/product' },
      { title: 'Architecture', href: '/architecture' },
      { title: 'Simulation', href: '/simulation' },
      { title: 'Documentation', href: '/docs' },
      { title: 'Download', href: '/download' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Blog', href: '/blog' },
      { title: 'Community', href: '/community' },
    ],
  },
];

export const integrations = [
  { name: 'Ollama (Official)', category: 'Local LLM Runtime', model: 'gpt-oss:120b-cloud' },
  { name: 'Chokidar Watcher', category: 'Filesystem Engine', model: 'v1.1.0' },
  { name: 'SQLite Index', category: 'Storage Engine', model: '.devmemory/index.db' },
  { name: 'Tree-Sitter Parser', category: 'AST Extraction', model: 'Native' },
  { name: 'dmai CLI', category: 'Command Interface', model: 'v1.1.0' },
  { name: 'Embedded Dashboard', category: 'Local HTTP Server', model: ':31415' },
  { name: 'Git Integration', category: 'Version Control', model: 'Metadata' },
];
