"use client";

import { useRef, type ReactNode } from 'react';

export function MobileMenu({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details ref={menu} className="mobile-nav group lg:hidden"
    onClick={event => {
      if (event.target instanceof Element && event.target.closest('a') && menu.current) menu.current.open = false;
    }}
    onKeyDown={event => {
      if (event.key !== 'Escape' || !menu.current?.open) return;
      menu.current.open = false;
      menu.current.querySelector('summary')?.focus();
    }}>
    <summary className="flex list-none items-center gap-2 border border-white/30 px-3 py-2 text-sm font-bold">
      Menu <svg viewBox="0 0 20 16" width="17" height="15" aria-hidden="true" stroke="currentColor" strokeWidth="2"><path d="M1 2h18M1 8h18M1 14h18" /></svg>
    </summary>
    <div className="rubber absolute inset-x-0 top-full border-b-4 border-accent px-6 py-5 shadow-xl">
      {children}
    </div>
  </details>;
}
