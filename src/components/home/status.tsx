'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const stages = [
  {
    n: '01',
    title: 'A finished live ISO',
    body: 'Every tool and setting the distro promises actually present - booting it is the real experience, not a preview of one.',
    status: 'In progress',
    active: true,
  },
  {
    n: '02',
    title: 'An installer',
    body: 'Turns the live session into an installed system. Custom TUI (likely Go+bubbletea), pkexec disk ops, tray SNI + spawn-at-startup - no code yet.',
    status: 'Not started',
    active: false,
  },
  {
    n: '03',
    title: 'Docs kept current',
    body: 'Not a stage with an end date - an ongoing commitment as the first two stages change. No drift.',
    status: 'Ongoing',
    active: false,
  },
];

export function Status() {
  const ref = useRef<HTMLElement>(null);

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

      const line = el.querySelector('.status-line');
      const cards = el.querySelectorAll('.status-card');
      const dots = el.querySelectorAll('.status-dot');

      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;

          if (line) {
            animate(line as unknown as any, {
              scaleX: [0, 1],
              duration: 820,
              easing: 'inOutQuad',
            } as unknown as Record<string, unknown>);
          }

          if (cards.length) {
            animate(cards as unknown as any, {
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 560,
              delay: stagger ? stagger(90, { start: 220 }) : 220,
              easing: 'outCubic',
            } as unknown as Record<string, unknown>);
          }

          // pulsing active dot
          if (dots.length) {
            const active = el.querySelector('.status-dot.active') as Element | null;
            if (active) {
              animate(active as unknown as any, {
                scale: [1, 1.14],
                duration: 1100,
                loop: true,
                alternate: true,
                easing: 'inOutSine',
              } as unknown as Record<string, unknown>);
            }
          }

          obs.disconnect();
        },
        { threshold: 0.24 },
      );
      obs.observe(el);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} className="bg-[#010120] px-4 py-10 sm:px-8" style={{ padding: '80px 32px' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[880px]">
          <p className="inline-flex rounded-[4px] border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.55px] text-white/70" style={{ fontFamily: 'var(--font-mono)' }}>
            Where things stand - three stages
          </p>
          <h2 className="font-display mt-4 text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Built in stages, honestly tracked.
          </h2>
          <div className="status-line mt-4 h-px w-full origin-left bg-white/10" style={{ transform: 'scaleX(0)' }} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[1100px] gap-4 lg:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage.n} className="status-card rounded-[4px] border border-white/10 bg-white/[0.03] p-6 opacity-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-[0.55px] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stage.n}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08px] ${stage.active ? 'bg-white text-black' : 'bg-white/10 text-white/60 border border-white/10'}`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className={`status-dot h-1.5 w-1.5 rounded-full ${stage.active ? 'active bg-[#0060e0]' : 'bg-white/40'}`} aria-hidden />
                  {stage.status}
                </span>
              </div>
              <h3 className="font-display mt-3 text-[22px] font-medium leading-[25.3px] tracking-[-0.22px] text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {stage.title}
              </h3>
              <p className="mt-2 text-[16px] leading-[20.8px] tracking-[-0.16px] text-white/60" style={{ fontFamily: 'var(--font-display)' }}>
                {stage.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/development/roadmap"
            className="inline-flex rounded-[4px] bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.08px] text-black transition hover:bg-white/90"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Read the roadmap →
          </Link>
          <Link
            href="/docs/development/architecture"
            className="inline-flex rounded-[4px] border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.08px] text-white transition hover:bg-white/10"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Architecture
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.08px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
          Installer designed - not built. Live ISO boots & autologins today; provisioning + <code className="rounded bg-white/10 px-1 py-0.5">profiles/</code> awaits tray SNI.
        </p>
      </div>
    </section>
  );
}
