'use client';

import { useEffect, useRef } from 'react';

export function Pitch() {
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

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const eyebrow = el.querySelector('.pitch-eyebrow');
          const headline = el.querySelector('.pitch-headline');
          const paras = el.querySelectorAll('.pitch-p');
          const meta = el.querySelector('.pitch-meta');
          const stripe = el.querySelector('.pitch-stripe');

          if (eyebrow)
            animate(eyebrow as unknown as any, {
              opacity: [0, 1],
              translateY: [8, 0],
              duration: 520,
              easing: 'outQuad',
            } as unknown as Record<string, unknown>);

          if (headline)
            animate(headline as unknown as any, {
              opacity: [0, 1],
              translateY: [14, 0],
              duration: 640,
              delay: 120,
              easing: 'outCubic',
            } as unknown as Record<string, unknown>);

          if (paras.length)
            animate(paras as unknown as any, {
              opacity: [0, 1],
              translateY: [12, 0],
              duration: 560,
              delay: stagger ? stagger(90, { start: 220 }) : 220,
              easing: 'outQuad',
            } as unknown as Record<string, unknown>);

          if (stripe)
            animate(stripe as unknown as any, {
              scaleX: [0, 1],
              duration: 740,
              delay: 180,
              easing: 'inOutQuad',
            } as unknown as Record<string, unknown>);

          if (meta)
            animate(meta as unknown as any, {
              opacity: [0, 1],
              duration: 560,
              delay: 520,
              easing: 'linear',
            } as unknown as Record<string, unknown>);

          obs.disconnect();
        },
        { threshold: 0.28 },
      );
      obs.observe(el);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} id="pitch" className="bg-[#010120] px-4 py-20 text-white sm:px-8" style={{ padding: '80px 32px' }}>
      <div className="mx-auto max-w-[880px]">
        <p
          className="pitch-eyebrow inline-flex rounded-[4px] border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.55px] text-white/70 opacity-0"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          The thesis - why this exists
        </p>

        <h2
          className="pitch-headline font-display mt-4 max-w-[640px] text-[40px] font-medium leading-[48px] tracking-[-0.8px] opacity-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Skips the weekend.
        </h2>

        <span aria-hidden className="pitch-stripe mt-3 block h-px w-[64px] origin-left bg-white/20" style={{ transform: 'scaleX(0)' }} />

        <div className="mt-6 space-y-6">
          <p
            className="pitch-p max-w-[720px] text-[18px] leading-[23.4px] tracking-[-0.18px] text-white/75 opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            niri lays windows out on a scrollable strip you move through with the keyboard - the kind of setup power users reach for because it gets out of your way once it&apos;s configured. That <em className="font-medium text-white">&quot;once it&apos;s configured&quot;</em> part is usually the catch: tiling WMs normally cost you a weekend writing keybindings and layout rules before any speed pays off.
          </p>
          <p
            className="pitch-p max-w-[720px] text-[18px] font-medium leading-[23.4px] tracking-[-0.18px] text-white opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Larch ships it wired in. Real vim-flavored bindings, sane layout defaults, dark theme - booting the ISO <em className="not-italic underline decoration-white/20 underline-offset-4">is</em> the experience, not a preview of one.
          </p>

          <div className="pitch-p grid gap-6 pt-4 opacity-0 sm:grid-cols-2">
            <div className="rounded-[4px] border border-white/10 bg-white/[0.04] p-4">
              <p
                className="text-[14px] font-medium leading-[19.6px] text-white/50"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Lazy
              </p>
              <p className="mt-2 text-[14px] leading-[19.6px] text-white/65" style={{ fontFamily: 'var(--font-display)' }}>
                Not hand-rolling a WM config from scratch. One boot and you&apos;re moving - columns, workspaces, monitors already mapped.
              </p>
            </div>
            <div className="rounded-[4px] border border-white/10 bg-white p-4 text-black">
              <p className="text-[14px] font-medium leading-[19.6px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
                Power user
              </p>
              <p className="mt-2 text-[14px] leading-[19.6px] text-black/75" style={{ fontFamily: 'var(--font-display)' }}>
                Underneath: real Arch. <code className="rounded bg-black/5 px-1 py-0.5 text-[12px]">core/extra</code> + AUR, <code className="rounded bg-black/5 px-1 py-0.5 text-[12px]">pacman -Syu</code> works as on vanilla - nothing dumbed down.
              </p>
            </div>
          </div>

          <p
            className="pitch-meta max-w-[640px] pt-2 text-[14px] leading-[19.6px] text-white/45 opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sourced from <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-white/60">content/docs/index.mdx:6</code> + live <code className="font-mono text-[11px] text-white/60">airootfs/</code> - docs describe target state as shipped; IOUs tracked in <code className="font-mono text-[11px] text-white/60">CONTENT_PLAN.md:58</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
