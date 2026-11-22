"use client";

import { useEffect, useRef, type ReactNode } from 'react';

export function RollingSidewall({ children }: { children: ReactNode }) {
  const art = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const element = art.current;
      if (!element) return;
      const height = element.clientHeight || 1;
      const angle = motion.matches ? 0 : Math.min(8, Math.max(0, scrollY / height) * 8);
      element.style.setProperty('--roll', `${angle}deg`);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motion.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  return <div className="hero-art" ref={art}>{children}</div>;
}
