'use client';

import { useTheme } from './theme-provider';

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/logos/icon-light-48.svg' : '/logos/icon-dark-48.svg';

  return (
    <img
      src={logoSrc}
      alt="DevMemory AI"
      className={className || "h-7 w-7 object-contain"}
      width={28}
      height={28}
    />
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logos/icon-dark-48.svg"
      alt="DevMemory AI Mark"
      className={className || "h-4 w-4 object-contain"}
      width={16}
      height={16}
    />
  );
}
