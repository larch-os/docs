'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { downloadUrl } from '@/lib/shared';
import { HeroRibbon } from './hero-ribbon';
import { NiriStrip } from './niri-strip';

function useHeroAnime() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll<HTMLElement>('.hero-eyebrow, .hero-word, .hero-cta, .hero-note').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      const stripe = root.querySelector<HTMLElement>('.hero-stripe');
      if (stripe) stripe.style.transform = 'scaleX(1)';
      return;
    }
    let cancelled = false;

    // safety fallback - ensure hero visible even if anime fails or is slow (for screenshot/tests)
    const fallbackTimer = window.setTimeout(() => {
      if (cancelled) return;
      root.querySelectorAll<HTMLElement>('.hero-eyebrow, .hero-word, .hero-cta, .hero-note').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      const s = root.querySelector<HTMLElement>('.hero-stripe');
      if (s) s.style.transform = 'scaleX(1)';
    }, 600);

    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as {
        animate?: (t: Element | string, p: Record<string, unknown>) => unknown;
        stagger?: (n: number, opts?: Record<string, unknown>) => unknown;
      };
      const animate = anime.animate;
      const stagger = anime.stagger as unknown as ((v: number, o?: Record<string, unknown>) => unknown) | undefined;
      if (!animate) return;

      const eyebrow = root.querySelector('.hero-eyebrow');
      const words = root.querySelectorAll('.hero-word');
      const ctas = root.querySelectorAll('.hero-cta');
      const note = root.querySelector('.hero-note');
      const stripe = root.querySelector('.hero-stripe');

      if (eyebrow) {
        animate(eyebrow as unknown as any, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 520,
          delay: 120,
          easing: 'outQuad',
        } as unknown as Record<string, unknown>);
      }

      if (words.length) {
        animate(words as unknown as any, {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 720,
          delay: stagger ? stagger(70, { start: 220 }) : 220,
          easing: 'outCubic',
        } as unknown as Record<string, unknown>);
      }

      if (ctas.length) {
        animate(ctas as unknown as any, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 560,
          delay: stagger ? stagger(80, { start: 760 }) : 760,
          easing: 'outQuad',
        } as unknown as Record<string, unknown>);
      }

      if (note) {
        animate(note as unknown as any, {
          opacity: [0, 1],
          duration: 600,
          delay: 980,
          easing: 'linear',
        } as unknown as Record<string, unknown>);
      }

      if (stripe) {
        animate(stripe as unknown as any, {
          scaleX: [0, 1],
          duration: 820,
          delay: 420,
          easing: 'inOutQuad',
        } as unknown as Record<string, unknown>);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, []);
  return rootRef;
}

export function Hero() {
  const rootRef = useHeroAnime();

  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#010120] text-white"
      style={{ padding: '96px 32px 180px', minHeight: 'calc(100vh - 56px)' }}
    >
      {/* niri strip - pinned to bottom edge, outside text flow */}
      <NiriStrip />

      {/* subtle top hairline - elevation lvl 2 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* left - copy */}
        <div className="relative max-w-[640px]">
          {/* eyebrow - simplified, was cluttered: “Larch - Arch for lazy yet power users · niri” */}
          <p
            className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 backdrop-blur opacity-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0060e0] animate-pulse" aria-hidden />
            Niri · scrollable tiling
          </p>

          <h1 className="mt-7 flex flex-col gap-1.5">
            <span className="hero-word text-[13px] font-medium uppercase tracking-[0.22em] text-white/55 opacity-0" style={{ fontFamily: 'var(--font-mono)' }}>
              Distro
            </span>

            <span className="hero-word flex flex-wrap items-baseline gap-x-3 opacity-0">
              <span className="text-lg font-light tracking-tight text-white/55 sm:text-2xl md:text-[30px]">for</span>
              <span
                className="font-display text-[64px] font-medium italic leading-[0.9] tracking-[-1.92px] text-white sm:text-[80px] lg:text-[84px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                lazy
              </span>
            </span>

            <span className="hero-word flex flex-wrap items-baseline gap-x-3 opacity-0">
              <span className="text-lg font-light tracking-tight text-white/55 sm:text-2xl md:text-[30px]">yet</span>
              <span
                className="font-display inline-block bg-gradient-to-r from-[#0060e0] via-[#3b82f6] to-[#bdbbff] bg-clip-text text-[52px] font-medium leading-[0.9] tracking-[-1.2px] text-transparent sm:text-[68px] lg:text-[76px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                power
              </span>
              <span className="text-lg font-light tracking-tight text-white/55 sm:text-2xl md:text-[28px]">users.</span>
            </span>

            {/* hairline stripe - logo blue */}
            <span
              aria-hidden
              className="hero-stripe mt-3 block h-px w-[84px] origin-left bg-gradient-to-r from-[#0060e0] via-[#3b82f6] to-[#bdbbff]"
              style={{ transform: 'scaleX(0)' }}
            />
          </h1>

          <div
            className="hero-word mt-8 max-w-[560px] space-y-3 text-[18px] leading-[23.4px] tracking-[-0.18px] text-white/70 opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <p>
              Boots into a desktop that is already set up to move fast: dark theme, niri scrollable tiling, everything a keystroke away, so you are getting to work, not setting it up.
            </p>
            <p className="text-white/55 text-[16px] leading-[20.8px] tracking-[-0.16px]">
              Real Arch underneath, <span className="font-medium text-white/85">no custom repo, no abstraction</span>. The weekday you save is not installing, it is staying out of the way after.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={downloadUrl}
              className="hero-cta inline-flex items-center justify-center rounded-[4px] bg-[#0060e0] px-6 py-3 text-[16px] font-medium uppercase tracking-[0.08px] text-white opacity-0 shadow-[0_4px_14px_rgba(0,96,224,0.28)] transition hover:bg-[#0052c8] hover:scale-[1.01] active:scale-[0.99]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Download ISO
            </Link>
            <Link
              href="#stack"
              className="hero-cta inline-flex items-center justify-center rounded-[4px] bg-white px-6 py-3 text-[16px] font-medium uppercase tracking-[0.08px] text-black opacity-0 shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition hover:bg-zinc-50 hover:scale-[1.01] active:scale-[0.99]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Explore the desktop
            </Link>
            <Link
              href="/docs"
              className="hero-cta inline-flex items-center justify-center rounded-[4px] border border-white/20 bg-white/[0.06] px-6 py-3 text-[16px] font-medium uppercase tracking-[0.08px] text-white opacity-0 backdrop-blur transition hover:bg-white/10 hover:border-white/30"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Read the docs
            </Link>
          </div>

          <p
            className="hero-note mt-6 max-w-[560px] text-[14px] leading-[19.6px] text-white/45 opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Live ISO only for now, stateless, SDDM autologin to <code className="rounded-[4px] bg-white/10 px-1 py-0.5 font-mono text-[12px] text-white/70">larch</code> (no password). Installer not yet built.
            <Link href="/docs/getting-started" className="ml-1 underline decoration-white/20 underline-offset-4 hover:text-white/70">
              Getting started
            </Link>
          </p>
        </div>

        {/* right - ribbon */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            {/* glow behind ribbon */}
            <div className="pointer-events-none absolute inset-0 -z-10 blur-[42px] opacity-30" aria-hidden>
              <div className="h-full w-full rounded-[32px] gradient-brand" />
            </div>
            <HeroRibbon />
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
}
