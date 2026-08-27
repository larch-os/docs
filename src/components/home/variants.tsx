'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function Variants() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as { animate?: (t: Element | string, p: Record<string, unknown>) => unknown; stagger?: (n: number, o?: Record<string, unknown>) => unknown };
      const animate = anime.animate;
      const stagger = anime.stagger;
      if (!animate) return;
      const cards = el.querySelectorAll('.variant-card');
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          animate(cards as unknown as any, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 560,
            delay: stagger ? stagger(80, { start: 80 }) : 80,
            easing: 'outCubic',
          } as unknown as Record<string, unknown>);
          obs.disconnect();
        },
        { threshold: 0.18 },
      );
      obs.observe(el);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} className="bg-white px-4 py-10 sm:px-8" style={{ padding: '80px 32px' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="inline-flex rounded-[4px] border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.55px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
            ISO variants - one today, shape for more
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-[560px] text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-black" style={{ fontFamily: 'var(--font-display)' }}>
            Choose your shell.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[18px] leading-[23.4px] tracking-[-0.18px] text-black/55" style={{ fontFamily: 'var(--font-display)' }}>
            Each variant reuses the same Arch + niri base - only the compositor/shell changes. Today only <strong className="font-medium text-black">larch-base</strong> exists; the rest are placeholders until the profile exists.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1100px] gap-4 md:grid-cols-3">
          {/* larch-base - featured dark ex-pricing-tier-featured */}
          <Link
            href="/docs/iso-variants/larch-base"
            className="variant-card group relative flex flex-col overflow-hidden rounded-[4px] border border-black bg-black p-5 text-white opacity-0 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
              Featured · available
            </p>
            <h3 className="font-display mt-2 text-[22px] font-medium leading-[25.3px] tracking-[-0.22px]" style={{ fontFamily: 'var(--font-display)' }}>
              larch-base
            </h3>
            <p className="mt-2 text-[14px] leading-[19.6px] text-white/65" style={{ fontFamily: 'var(--font-display)' }}>
              niri + noctalia (extra v5 TOML) - the distro these docs describe everywhere.
            </p>

            <div className="mt-4 overflow-hidden rounded-[4px] border border-white/10 bg-white/5">
              <Image src="/images/desktop-screenshot.png" alt="larch-base screenshot" width={560} height={315} className="w-full" />
            </div>

            <ul className="mt-4 space-y-1.5 text-[13px] leading-[18px] text-white/60" style={{ fontFamily: 'var(--font-display)' }}>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#0060e0]" /> niri scrollable tiling
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#3b82f6]" /> noctalia panel/launcher
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#bdbbff]" /> kitty + zsh + Arch core/extra
              </li>
            </ul>

            <span className="mt-6 inline-flex text-[11px] font-medium uppercase tracking-[0.55px] text-white group-hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
              View larch-base →
            </span>

            <span className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-[0.08] gradient-brand blur-[24px] rounded-full" aria-hidden />
          </Link>

          {/* dank shell - ghost */}
          <div className="variant-card flex flex-col rounded-[4px] border border-black/10 bg-white p-5 opacity-0">
            <p className="inline-flex w-fit rounded-[4px] border border-black/10 bg-white px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
              Placeholder - not yet built
            </p>
            <h3 className="font-display mt-3 text-[22px] font-medium leading-[25.3px] tracking-[-0.22px] text-black" style={{ fontFamily: 'var(--font-display)' }}>
              larch-dank-shell
            </h3>
            <p className="mt-2 text-[14px] leading-[19.6px] text-black/55" style={{ fontFamily: 'var(--font-display)' }}>
              Same niri base, noctalia → DankMaterialShell. Repo/ISO/config TODO.
            </p>
            <div className="mt-4 grid place-items-center rounded-[4px] border border-dashed border-black/15 bg-black/[0.02] p-8">
              <span className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/35" style={{ fontFamily: 'var(--font-mono)' }}>
                No screenshot yet
              </span>
            </div>
            <Link href="/docs/iso-variants/larch-dank-shell" className="mt-6 text-[11px] font-medium uppercase tracking-[0.08px] text-black/60 hover:text-black hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
              See placeholder →
            </Link>
          </div>

          {/* hyprland - ghost */}
          <div className="variant-card flex flex-col rounded-[4px] border border-black/10 bg-white p-5 opacity-0">
            <p className="inline-flex w-fit rounded-[4px] border border-black/10 bg-white px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
              Placeholder - not yet built
            </p>
            <h3 className="font-display mt-3 text-[22px] font-medium leading-[25.3px] tracking-[-0.22px] text-black" style={{ fontFamily: 'var(--font-display)' }}>
              larch-hyprland
            </h3>
            <p className="mt-2 text-[14px] leading-[19.6px] text-black/55" style={{ fontFamily: 'var(--font-display)' }}>
              niri → Hyprland compositor swap. noctalia supports Hyprland natively - shell TBD.
            </p>
            <div className="mt-4 grid place-items-center rounded-[4px] border border-dashed border-black/15 bg-black/[0.02] p-8">
              <span className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/35" style={{ fontFamily: 'var(--font-mono)' }}>
                No screenshot yet
              </span>
            </div>
            <Link href="/docs/iso-variants/larch-hyprland" className="mt-6 text-[11px] font-medium uppercase tracking-[0.08px] text-black/60 hover:text-black hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
              See placeholder →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[14px] leading-[19.6px] text-black/40" style={{ fontFamily: 'var(--font-display)' }}>
          When a second variant ships, <code className="rounded bg-black/5 px-1 font-mono text-[11px]">getting-started</code> Download → variant chooser.
        </p>
      </div>
    </section>
  );
}
