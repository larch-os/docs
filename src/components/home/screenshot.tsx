'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function Screenshot() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = el.querySelector('.shot-card');
    if (!target) return;

    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as {
        animate?: (t: Element, p: Record<string, unknown>) => unknown;
      };
      const animate = anime.animate;
      if (!animate) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          animate(target, {
            opacity: [0, 1],
            translateY: [22, 0],
            duration: 720,
            easing: 'outCubic',
          } as unknown as Record<string, unknown>);

          const img = target.querySelector('img');
          if (img) {
            animate(img, {
              scale: [1.04, 1],
              duration: 980,
              delay: 140,
              easing: 'outQuad',
            } as unknown as Record<string, unknown>);
          }
          obs.disconnect();
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={ref}
      id="desktop"
      className="bg-white px-4 py-10 sm:px-8 sm:py-12"
      style={{ padding: '80px 32px' }}
    >
      <div className="mx-auto max-w-[1280px]">
        <p
          className="text-center text-[11px] font-medium uppercase tracking-[0.55px] text-black/45"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          The live desktop - seconds after boot · SDDM autologin to niri + noctalia
        </p>

        <div className="shot-card mx-auto mt-6 max-w-[1100px] overflow-hidden rounded-[4px] border border-black/10 bg-[#010120] p-[8px] opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
          {/* code-editor-mockup chrome - DESIGN.md:234 */}
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/10" />
            <span
              className="ml-3 text-[10px] font-medium tracking-[0.05px] text-white/45"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              niri - scrollable tiling · strip → right
            </span>
            <span className="ml-auto hidden sm:inline text-[10px] leading-[14px] tracking-[0.05px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
              1360×768 · grim capture · noctalia panel on top
            </span>
          </div>
          <div className="overflow-hidden rounded-[4px] bg-black">
            <Image
              src="/images/desktop-screenshot.png"
              alt="The Larch live desktop: niri with the noctalia panel running along the top"
              width={1360}
              height={768}
              className="w-full"
              priority={false}
            />
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-[720px] flex-wrap items-center justify-center gap-2 text-center">
          <span
            className="rounded-[4px] border border-black/10 bg-white px-3 py-1 text-[12px] font-medium tracking-wide text-black/70"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            KITTY · ZSH + OH-MY-ZSH
          </span>
          <span className="text-black/15">·</span>
          <span
            className="rounded-[4px] border border-black/10 bg-white px-3 py-1 text-[12px] font-medium tracking-wide text-black/70"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            NETWORKMANAGER
          </span>
          <span className="text-black/15">·</span>
          <span
            className="rounded-[4px] bg-[#c8f6f9] px-3 py-1 text-[12px] font-medium tracking-wide text-black"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            STOCK ARCH CORE/EXTRA
          </span>
        </div>

        <p
          className="mx-auto mt-4 max-w-[640px] text-center text-[14px] leading-[19.6px] text-black/50"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Nothing staged - one <code className="rounded-[4px] bg-black/5 px-1.5 py-0.5 text-[12px]">grim</code> capture from the test VM. The panel is noctalia&apos;s `extra` v5 TOML. Wallpaper is the live session&apos;s real one (<code className="text-[11px]">CONTENT_PLAN.md</code> deliberate pending decision).
        </p>
      </div>
    </section>
  );
}
