'use client';

import { Layers, ChevronRight, Folder, FileCode2, Database, Wrench, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

type ArchNode = {
  id: string;
  name: string;
  type: 'layer' | 'service' | 'module' | 'database';
  children?: ArchNode[];
  icon: typeof Folder;
};

const architecture: ArchNode[] = [
  {
    id: 'presentation',
    name: 'Presentation Layer',
    type: 'layer',
    icon: Monitor,
    children: [
      { id: 'web', name: 'Web Frontend', type: 'service', icon: FileCode2 },
      { id: 'mobile', name: 'Mobile App', type: 'service', icon: FileCode2 },
      { id: 'admin', name: 'Admin Panel', type: 'service', icon: FileCode2 },
    ],
  },
  {
    id: 'api',
    name: 'API Gateway',
    type: 'layer',
    icon: Wrench,
    children: [
      { id: 'rest', name: 'REST API', type: 'service', icon: FileCode2 },
      { id: 'graphql', name: 'GraphQL API', type: 'service', icon: FileCode2 },
      { id: 'ws', name: 'WebSocket Server', type: 'service', icon: FileCode2 },
    ],
  },
  {
    id: 'services',
    name: 'Business Logic',
    type: 'layer',
    icon: Layers,
    children: [
      { id: 'auth', name: 'Auth Service', type: 'service', icon: FileCode2 },
      { id: 'users', name: 'User Service', type: 'service', icon: FileCode2 },
      { id: 'billing', name: 'Billing Service', type: 'service', icon: FileCode2 },
      { id: 'notifications', name: 'Notification Service', type: 'service', icon: FileCode2 },
    ],
  },
  {
    id: 'data',
    name: 'Data Layer',
    type: 'layer',
    icon: Database,
    children: [
      { id: 'postgres', name: 'PostgreSQL', type: 'database', icon: Database },
      { id: 'redis', name: 'Redis Cache', type: 'database', icon: Database },
      { id: 's3', name: 'S3 Storage', type: 'database', icon: Database },
    ],
  },
];

const typeColors = {
  layer: 'text-primary bg-primary/10 border-primary/20',
  service: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  module: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  database: 'text-success bg-success/10 border-success/20',
};

export function ArchitectureTab() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Architecture</h2>
        <p className="text-[13px] text-muted-foreground">A live map of your system&apos;s structure and dependencies.</p>
      </div>

      <div className="space-y-3">
        {architecture.map((layer, i) => (
          <div key={layer.id}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-muted-foreground">L{i + 1}</span>
              <div className={cn('flex items-center gap-2 rounded-lg border px-3 py-2', typeColors[layer.type])}>
                <layer.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{layer.name}</span>
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="ml-8 mt-2 flex flex-wrap gap-2">
              {layer.children?.map((child) => (
                <div
                  key={child.id}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border bg-card/40 px-3 py-2 text-[13px] transition-colors hover:bg-card/60',
                    typeColors[child.type]
                  )}
                >
                  <child.icon className="h-3.5 w-3.5" />
                  {child.name}
                  <ChevronRight className="h-3 w-3 opacity-40" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dependency matrix */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold">Cross-Layer Dependencies</h3>
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-4 border-b border-border bg-secondary/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <div>Source</div>
            <div>Target</div>
            <div>Type</div>
            <div>Strength</div>
          </div>
          {[
            { source: 'Web Frontend', target: 'REST API', type: 'HTTP', strength: 'strong' },
            { source: 'REST API', target: 'Auth Service', type: 'gRPC', strength: 'strong' },
            { source: 'Auth Service', target: 'PostgreSQL', type: 'TCP', strength: 'strong' },
            { source: 'GraphQL API', target: 'User Service', type: 'gRPC', strength: 'medium' },
            { source: 'User Service', target: 'Redis Cache', type: 'TCP', strength: 'medium' },
            { source: 'Billing Service', target: 'PostgreSQL', type: 'TCP', strength: 'strong' },
            { source: 'Notification Service', target: 'Redis Cache', type: 'Pub/Sub', strength: 'weak' },
          ].map((dep, i) => (
            <div key={i} className="grid grid-cols-4 border-b border-border/50 px-4 py-2.5 text-[12px]">
              <div className="font-medium">{dep.source}</div>
              <div className="text-muted-foreground">{dep.target}</div>
              <div className="font-mono text-[11px] text-muted-foreground">{dep.type}</div>
              <div>
                <span className={cn(
                  'rounded-md px-2 py-0.5 text-[10px]',
                  dep.strength === 'strong' && 'bg-success/15 text-success',
                  dep.strength === 'medium' && 'bg-warning/15 text-warning',
                  dep.strength === 'weak' && 'bg-muted text-muted-foreground',
                )}>
                  {dep.strength}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
