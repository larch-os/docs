'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const items = [
  {
    kicker: 'Compositor',
    title: 'niri',
    body: 'Scrollable-tiling Wayland on an infinite horizontal strip - not stacking, not fixed grid. One strip per monitor, never overflows.',
    badge: 'niri →',
    href: '/docs/software-guide/niri',
    tint: 'bg-white',
    border: 'border-black/10',
  },
  {
    kicker: 'Shell',
    title: 'noctalia',
    body: 'Quickshell panel + launcher + notifications + controls layered on niri. Official extra v5 TOML. Variants will swap in DankMaterialShell.',
    badge: 'noctalia →',
    href: '/docs/software-guide/noctalia',
    tint: 'bg-white',
    border: 'border-black/10',
  },
  {
    kicker: 'Terminal & Shell',
    title: 'kitty + zsh',
    body: 'kitty terminal, zsh + oh-my-zsh (robbyrussell), autosuggestions, syntax-highlighting, fzf-tab - with eza/fzf/zoxide.',
    badge: 'kitty/zsh →',
    href: '/docs/software-guide/shell-and-terminal',
    tint: 'bg-[#c8f6f9]',
    border: 'border-black/10',
  },
  {
    kicker: 'Networking',
    title: 'NetworkManager',
    body: 'Not systemd-networkd/iwd. Sane out-of-the-box Wi-Fi + wired via NetworkManager - GNOME-style, but without GNOME.',
    badge: 'networking →',
    href: '/docs/software-guide/networking',
    tint: 'bg-white',
    border: 'border-black/10',
  },
  {
    kicker: 'Power',
    title: 'swayidle chain',
    body: 'Dim+lock 5m → display off 10m → suspend-then-hibernate 30m + sleep.conf 2h hibernate. (Docs-first IOU - ISO still disables suspend today.)',
    badge: 'power →',
    href: '/docs/user-guide/power-management',
    tint: 'bg-white',
    border: 'border-black/10',
  },
  {
    kicker: 'Package management',
    title: 'Stock Arch',
    body: 'core/extra only - no custom Larch repo. pacman -S / -Syu and AUR work as on vanilla Arch. Rolling release, no reinstall.',
    badge: 'pacman →',
    href: '/docs/package-management',
    tint: 'bg-white',
    border: 'border-black/10',
  },
];

export function Stack() {
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

      const cards = el.querySelectorAll('.stack-card');
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          animate(cards as unknown as any, {
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 560,
            delay: stagger ? stagger(74, { start: 80 }) : 80,
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
    <section ref={ref} id="stack" className="bg-white px-4 sm:px-8 py-12 sm:py-20 overflow-x-hidden">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="inline-flex rounded-[4px] border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.55px] text-black/50" style={{ fontFamily: 'var(--font-mono)' }}>
            Curated, not generic - best-suited tools for dev work
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-[640px] text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-black" style={{ fontFamily: 'var(--font-display)' }}>
            The stack you&apos;d pick after the research.
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[18px] leading-[23.4px] tracking-[-0.18px] text-black/55" style={{ fontFamily: 'var(--font-display)' }}>
            No defaults for defaults&apos; sake - each piece is the best-suited tool for the job. Same Arch underneath.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.title}
              href={it.href}
              className={`stack-card group relative flex flex-col rounded-[4px] border ${it.border} ${it.tint} p-6 opacity-0 transition hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(1,1,32,0.06)]`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
                {it.kicker}
              </p>
              <h3 className="font-display mt-2 text-[22px] font-medium leading-[25.3px] tracking-[-0.22px] text-black" style={{ fontFamily: 'var(--font-display)' }}>
                {it.title}
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[20.8px] tracking-[-0.16px] text-black/60" style={{ fontFamily: 'var(--font-display)' }}>
                {it.body}
              </p>
              <span className="mt-4 inline-flex text-[11px] font-medium uppercase tracking-[0.55px] text-black group-hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
                {it.badge}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-[14px] leading-[19.6px] text-black/40" style={{ fontFamily: 'var(--font-display)' }}>
          Source: <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[11px]">content/docs/software-guide/*</code> + <code className="font-mono text-[11px]">CONTENT_PLAN.md:42</code> live <code className="font-mono text-[11px]">airootfs/</code> inspection.
        </p>
      </div>
    </section>
  );
}
