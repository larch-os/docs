'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { downloadUrl } from '@/lib/shared';

export function InstallCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as { animate?: (t: Element, p: Record<string, unknown>) => unknown };
      const animate = anime.animate;
      if (!animate) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          const headline = el.querySelector('.cta-headline');
          const sub = el.querySelector('.cta-sub');
          const ctas = el.querySelectorAll('.cta-btn');
          if (headline)
            animate(headline as unknown as any, {
              opacity: [0, 1],
              translateY: [14, 0],
              duration: 600,
              easing: 'outCubic',
            } as unknown as Record<string, unknown>);
          if (sub)
            animate(sub as unknown as any, {
              opacity: [0, 1],
              duration: 560,
              delay: 160,
              easing: 'linear',
            } as unknown as Record<string, unknown>);
          if (ctas.length)
            animate(ctas as unknown as any, {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 520,
              delay: 260,
              easing: 'outQuad',
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
    <section ref={ref} className="relative overflow-hidden bg-white px-4 py-10 sm:px-8" style={{ padding: '80px 32px' }}>
      {/* hairline top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/10" />

      <div className="relative mx-auto grid max-w-[1100px] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex rounded-[4px] border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.55px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
            Try it live - stateless & honest
          </p>
          <h2
            className="cta-headline font-display mt-4 max-w-[520px] text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-black opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Boot it. It&apos;s the real desktop.
          </h2>
          <p
            className="cta-sub mt-3 max-w-[520px] text-[18px] leading-[23.4px] tracking-[-0.18px] text-black/60 opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Live ISO only for now - nothing persists past reboot. Needs a real GPU render node (<code className="rounded bg-black/5 px-1 py-0.5 font-mono text-[12px]">virtio-gpu</code> virgl + SPICE GL + memfd); plain <code className="font-mono text-[12px]">virtio-vga</code> black-screens forever. <code className="font-mono text-[12px]">larch</code> has no password - run <code className="font-mono text-[12px]">passwd</code> for SSH.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={downloadUrl}
              className="cta-btn inline-flex rounded-[4px] bg-black px-6 py-3 text-[11px] font-medium uppercase tracking-[0.08px] text-white opacity-0 transition hover:bg-zinc-900 hover:scale-[1.01]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Download ISO
            </Link>
            <Link
              href="/docs/development/testing-in-a-vm"
              className="cta-btn inline-flex rounded-[3.25px] border border-black/10 bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.08px] text-black opacity-0 transition hover:bg-black/[0.02]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              VM guide - virtio-gpu
            </Link>
            <Link href="/docs/getting-started" className="cta-btn text-[11px] font-medium uppercase tracking-[0.08px] text-black/60 underline decoration-black/15 underline-offset-4 hover:text-black opacity-0" style={{ fontFamily: 'var(--font-mono)' }}>
              Getting started →
            </Link>
          </div>

          <p className="mt-3 max-w-[520px] text-[11px] uppercase tracking-[0.08px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
            ISO at <code className="rounded bg-black/5 px-1 py-0.5">cdn.larch-os.dev/larch-latest.iso</code> is placeholder - no public releases yet. GitHub Releases likely.
          </p>
        </div>

        {/* right - terminal mock */}
        <div className="rounded-[4px] border border-black/10 bg-[#010120] p-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span className="ml-3 text-[10px] leading-[14px] tracking-[0.05px] text-white/35" style={{ fontFamily: 'var(--font-mono)' }}>
              zsh - kitty
            </span>
          </div>
          <pre className="mt-4 overflow-x-auto text-[11px] leading-[17px] text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            <code>{`$ virsh start larch-vm
$ # SDDM autologin → niri + noctalia (dark)
$ Mod+Return  # kitty
$ niri msg windows
 Window  • kitty  • col 2/5
$ Mod+H / L  # focus col left/right  → smooth strip
$ pacman -Syu  # stock Arch core/extra`}</code>
          </pre>
          <div className="mt-4 rounded-[4px] border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] leading-[14px] text-white/55" style={{ fontFamily: 'var(--font-mono)' }}>
            archiso <code className="text-white/80">releng</code> fork · <code className="text-white/80">profiles/shell</code> as single source · <code className="text-white/80">mkarchiso</code> + local repo
          </div>
        </div>
      </div>
    </section>
  );
}
