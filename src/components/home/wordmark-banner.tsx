'use client';

import { useEffect, useRef } from 'react';

export function WordmarkBanner({ word = 'LARCH' }: { word?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as {
        animate?: (t: Element | string, p: Record<string, unknown>) => unknown;
        stagger?: (n: number, o?: Record<string, unknown>) => unknown;
      };
      const animate = anime.animate;
      const stagger = anime.stagger;
      if (!animate) return;

      const letters = el.querySelectorAll('.wordmark-letter');
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          animate(letters as unknown as any, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 520,
            delay: stagger ? stagger(54, { start: 80 }) : 80,
            easing: 'outCubic',
          } as unknown as Record<string, unknown>);
          obs.disconnect();
        },
        { threshold: 0.2 },
      );
      obs.observe(el);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="select-none overflow-hidden border-y border-black/10 bg-white py-6 sm:py-8"
    >
      <div className="flex justify-center gap-[0.08em] px-2 text-[12vw] font-medium leading-none tracking-[-0.06em] text-black/[0.06] sm:text-[10vw] lg:text-[11vw] xl:text-[9rem]">
        {word.split('').map((ch, i) => (
          <span key={`${ch}-${i}`} className="wordmark-letter inline-block opacity-0" style={{ fontFamily: 'var(--font-display)' }}>
            {ch}
          </span>
        ))}
      </div>
      <p
        className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.08px] text-black/25"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Arch based · niri · noctalia · kitty+zsh · No custom repo · We are here.
      </p>
    </div>
  );
}
