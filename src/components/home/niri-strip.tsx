'use client';

import { useEffect, useRef } from 'react';

const tiles = [
  { w: 'w-[220px] sm:w-[260px]', h: 'h-[84px]', label: 'kitty + zsh', sub: 'HINT: Mod+Return', color: 'bg-[#0ea5e9]/85' },
  { w: 'w-[200px] sm:w-[220px]', h: 'h-[84px]', label: 'Firefox', sub: 'Mod+E Dolphin · Alt+Space', color: 'bg-[#3b82f6]/85' },
  { w: 'w-[240px] sm:w-[280px]', h: 'h-[84px]', label: 'Code · niri config', sub: 'Mod+R widths · Mod+W tabs', color: 'bg-[#22d3ee]/75' },
  { w: 'w-[180px] sm:w-[200px]', h: 'h-[84px]', label: 'noctalia', sub: 'qs -c noctalia-shell ipc', color: 'bg-[#6366f1]/80' },
  { w: 'w-[220px] sm:w-[250px]', h: 'h-[84px]', label: 'htop · swayidle', sub: '5m dim to 30m hibernate', color: 'bg-[#06b6d4]/85' },
];

export function NiriStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as {
        animate?: (t: Element, p: Record<string, unknown>) => { pause?: () => void };
      };
      const animate = anime.animate;
      if (!animate) return;

      animate(el as unknown as any, {
        translateX: ['0%', '-50%'],
        duration: 22000,
        loop: true,
        easing: 'linear',
      } as unknown as Record<string, unknown>);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const doubled = [...tiles, ...tiles];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] overflow-hidden opacity-[0.12] sm:opacity-[0.15] lg:opacity-[0.18]"
      aria-hidden
    >
      {/* top fade so strip never bleeds into text */}
      <div className="absolute inset-x-0 top-0 h-[36px] bg-gradient-to-b from-[#010120] to-transparent" />
      <div className="absolute inset-x-0 bottom-[14px]">
        <div ref={trackRef} className="flex items-stretch gap-3 will-change-transform" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <div
              key={i}
              className={`shrink-0 ${t.w} ${t.h} rounded-[4px] border border-white/10 ${t.color} backdrop-blur-[6px] p-3 flex flex-col justify-between shadow-[0_4px_24px_rgba(1,1,32,0.16)]`}
            >
              <span className="text-[10px] font-medium tracking-[0.06em] uppercase text-white/85" style={{ fontFamily: 'var(--font-mono)' }}>
                {t.label}
              </span>
              <span className="text-[11px] leading-none text-white/70" style={{ fontFamily: 'var(--font-mono)' }}>
                {t.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* side vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010120] via-transparent to-[#010120]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010120]/60 via-transparent to-transparent" />
    </div>
  );
}
