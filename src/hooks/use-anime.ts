'use client';

import { useEffect, useRef, useCallback } from 'react';

export function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => {
      ref.current = mql.matches;
    };
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return ref;
}

/**
 * Scope helper around anime.js - ensures cleanup on unmount.
 * We use dynamic import so SSR doesn't pull anime.
 */
export function useAnimeScope() {
  const scopeRef = useRef<{ revert: () => void } | null>(null);
  const reducedRef = usePrefersReducedMotion();

  const run = useCallback(
    async (fn: (anime: typeof import('animejs')) => void | Promise<void>) => {
      if (reducedRef.current) return;
      const anime = await import('animejs');
      // anime v4 exposes createScope; fallback if older
      const createScope = (anime as unknown as { createScope?: () => { revert: () => void } }).createScope;
      if (createScope) {
        const scope = (anime as unknown as { createScope: () => { revert: () => void } }).createScope
          ? (anime as unknown as { createScope: () => { revert: () => void } }).createScope()
          : { revert() {} };
        scopeRef.current = scope;
        fn(anime as unknown as typeof import('animejs'));
      } else {
        fn(anime as unknown as typeof import('animejs'));
      }
    },
    [reducedRef],
  );

  useEffect(() => {
    return () => scopeRef.current?.revert();
  }, []);

  return { run, reducedRef };
}
