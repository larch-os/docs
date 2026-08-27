'use client';

import { useEffect, useRef } from 'react';

export function HeroRibbon() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;

    import('animejs').then((mod) => {
      if (cancelled) return;
      // anime v4 API - `animate` is primary
      const anime = mod as unknown as {
        animate?: (target: Element | string, params: Record<string, unknown>) => unknown;
        stagger?: (v: number) => unknown;
      };
      const animate = anime.animate;
      if (!animate) return;

      // Blob morph via scale/translate/opacity - SVG path d morph needs precise paths; we use transform instead for perf
      const blobs = el.querySelectorAll('.ribbon-blob');
      blobs.forEach((blob, i) => {
        animate(blob as unknown as any, {
          translateX: [0, i % 2 === 0 ? 18 : -14] as unknown as string,
          translateY: [0, i === 1 ? -16 : 10] as unknown as string,
          scale: [1, 1.06] as unknown as string,
          duration: 4200 + i * 900,
          delay: i * 320,
          loop: true,
          alternate: true,
          easing: 'inOutSine',
        } as unknown as Record<string, unknown>);
      });

      // Whole ribbon gentle drift
      animate(el as unknown as any, {
        translateY: [-6, 6] as unknown as string,
        duration: 6500,
        loop: true,
        alternate: true,
        easing: 'inOutSine',
      } as unknown as Record<string, unknown>);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[280px] w-[320px] max-w-[90vw] sm:h-[360px] sm:w-[420px] lg:h-[460px] lg:w-[520px] select-none pointer-events-none"
      aria-hidden
    >
      <defs>
        <linearGradient id="larch-ribbon" x1="0%" y1="0%" x2="100%" y2="30%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#0060e0" />
          <stop offset="52%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#bdbbff" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* soft backdrop shapes - surface-dark-soft tint */}
      <g opacity="0.9">
        <path
          className="ribbon-blob"
          d="M 58 88 C 98 -8, 248 -14, 312 72 C 382 168, 308 268, 222 312 C 132 358, -18 318, 6 202 C 18 138, 22 168, 58 88Z"
          fill="url(#larch-ribbon)"
          style={{ opacity: 0.95 }}
        />
        <path
          className="ribbon-blob"
          d="M 118 128 C 178 62, 332 62, 382 138 C 438 228, 348 312, 248 332 C 142 352, 42 298, 58 208 C 68 152, 78 188, 118 128Z"
          fill="url(#larch-ribbon)"
          style={{ opacity: 0.62 }}
        />
        <path
          className="ribbon-blob"
          d="M 92 188 C 138 118, 298 108, 348 168 C 408 242, 322 338, 198 348 C 92 358, 18 282, 42 198 C 52 152, 62 228, 92 188Z"
          fill="url(#larch-ribbon)"
          style={{ opacity: 0.38 }}
        />
      </g>

      {/* hairline outline echo - DESIGN hairline on dark = surface-dark-soft */}
      <path
        d="M 58 88 C 98 -8, 248 -14, 312 72 C 382 168, 308 268, 222 312 C 132 358, -18 318, 6 202 C 18 138, 22 168, 58 88Z"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
