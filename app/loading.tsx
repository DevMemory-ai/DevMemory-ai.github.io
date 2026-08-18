import { Logo } from '@/components/site/logo';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Logo className="animate-pulse" />
        <div className="flex gap-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
