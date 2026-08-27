'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Category = 'window' | 'workspace' | 'monitor' | 'launch' | 'screenshot';

const data: Record<Category, { label: string; mono: string; rows: { kbd: string; desc: string }[] }> = {
  launch: {
    label: 'Launching',
    mono: 'MOD + RETURN',
    rows: [
      { kbd: 'Mod+Return', desc: 'kitty' },
      { kbd: 'Mod+E', desc: 'Dolphin' },
      { kbd: 'Alt+Space', desc: 'Launcher' },
      { kbd: 'Mod+V', desc: 'Clipboard' },
    ],
  },
  window: {
    label: 'Window',
    mono: 'H / J / K / L',
    rows: [
      { kbd: 'Mod+H / L', desc: 'Focus column left/right' },
      { kbd: 'Mod+Ctrl+H / L', desc: 'Move column' },
      { kbd: 'Mod+[/ ] / Mod+,/.', desc: 'Consume/expel → column' },
      { kbd: 'Mod+R / Shift+R', desc: 'Cycle widths/heights' },
    ],
  },
  workspace: {
    label: 'Workspace',
    mono: 'SMART MOD+J/K',
    rows: [
      { kbd: 'Mod+J / K', desc: 'Smart: stack ↓↑ or workspace ↓↑' },
      { kbd: 'Mod+U / I', desc: 'Focus workspace ↓↑' },
      { kbd: 'Mod+Ctrl+U / I', desc: 'Move column to workspace' },
      { kbd: 'Mod+1…9', desc: 'Go 1→9 directly' },
    ],
  },
  monitor: {
    label: 'Monitor',
    mono: 'MULTI-DISPLAY',
    rows: [
      { kbd: 'Mod+Shift+H / L', desc: 'Focus monitor L/R' },
      { kbd: 'Mod+Shift+Ctrl+H / L', desc: 'Move column to monitor' },
      { kbd: 'Mod+Shift+J / K', desc: 'Focus monitor ↓↑' },
      { kbd: 'Mod+Shift+P', desc: 'Power off monitors' },
    ],
  },
  screenshot: {
    label: 'Screenshot',
    mono: 'PRINT',
    rows: [
      { kbd: 'Print', desc: 'Interactive picker' },
      { kbd: 'Ctrl+Print', desc: 'Whole screen' },
      { kbd: 'Alt+Print', desc: 'Focused window' },
      { kbd: 'Ctrl+Shift+Print', desc: 'Region → Satty' },
    ],
  },
};

const order: Category[] = ['window', 'workspace', 'monitor', 'launch', 'screenshot'];

function DemoStage({ category, activeRow }: { category: Category; activeRow: number }) {
  const rows = data[category].rows;
  // visual columns for consume/expel, focus ring etc. - simplified niri strip
  return (
    <div className="relative h-[156px] overflow-hidden rounded-[4px] border border-white/10 bg-[#0b0b24] p-3">
      <div className="absolute inset-x-3 top-2 flex items-center gap-2 text-[10px] leading-[14px] tracking-[0.05px] text-white/35" style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="h-2 w-2 rounded-full bg-white/20" /> niri strip preview - {data[category].mono}
      </div>

      <div className="mt-6 flex h-[108px] items-stretch gap-2">
        {/* column A */}
        <div className={`flex w-[34%] flex-col gap-1 rounded-[4px] border bg-white/[0.06] p-2 ${activeRow === 0 && category === 'window' ? 'border-[#bdbbff]/60' : 'border-white/10'}`}>
          <span className="rounded-[4px] bg-white px-2 py-1.5 text-[11px] font-medium text-black" style={{ fontFamily: 'var(--font-mono)' }}>
            kitty
          </span>
          <span className="rounded-[4px] border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[11px] text-white/70" style={{ fontFamily: 'var(--font-mono)' }}>
            Firefox
          </span>
        </div>

        {/* column B - moves with workspace/monitor */}
        <div
          className="flex w-[42%] flex-col rounded-[4px] border bg-white p-2"
          style={{
            borderColor: activeRow === 1 && (category === 'window' || category === 'workspace') ? '#3b82f6' : 'rgba(0,0,0,0.1)',
            transform:
              category === 'workspace' && activeRow === 1
                ? 'translateY(4px)'
                : category === 'monitor' && activeRow === 1
                  ? 'translateX(6px)'
                  : 'none',
            transition: 'transform 260ms cubic-bezier(.22,.61,.36,1), border-color 260ms',
          }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.55px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
            ACTIVE
          </span>
          <span className="mt-1 rounded-[4px] bg-black px-2 py-1.5 text-[11px] font-medium uppercase tracking-[0.08px] text-white" style={{ fontFamily: 'var(--font-mono)' }}>
            Code
          </span>
          <span className="mt-1 text-[11px] leading-[14px] text-black/60" style={{ fontFamily: 'var(--font-mono)' }}>
            {rows[activeRow]?.kbd}
          </span>
        </div>

        {/* column C - appears on consume */}
        {category === 'window' && activeRow === 2 ? (
          <div className="flex w-[24%] flex-col justify-center rounded-[4px] border border-[#0060e0]/50 bg-[#0060e0]/10 p-2">
            <span className="text-center text-[11px] font-medium uppercase tracking-[0.08px] text-[#0060e0]" style={{ fontFamily: 'var(--font-mono)' }}>
              consume →
            </span>
          </div>
        ) : (
          <div className="flex w-[24%] flex-col gap-1 rounded-[4px] border border-white/10 bg-white/[0.04] p-2 opacity-60">
            <span className="rounded bg-white/10 px-2 py-1.5 text-[11px] text-white/60" style={{ fontFamily: 'var(--font-mono)' }}>
              Empty
            </span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-3 bottom-2 flex gap-1">
        {rows.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full ${i === activeRow ? 'bg-[#3b82f6]' : 'bg-white/15'}`} />
        ))}
      </div>
    </div>
  );
}

export function Keys() {
  const [cat, setCat] = useState<Category>('window');
  const [row, setRow] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // auto-cycle active row to demo smart Mod+J/K etc.
  useEffect(() => {
    const id = window.setInterval(() => {
      setRow((r) => (r + 1) % data[cat].rows.length);
    }, 1300);
    return () => window.clearInterval(id);
  }, [cat]);

  // entrance anime
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    import('animejs').then((mod) => {
      if (cancelled) return;
      const anime = mod as unknown as { animate?: (t: Element, p: Record<string, unknown>) => unknown; stagger?: (n: number, o?: Record<string, unknown>) => unknown };
      const animate = anime.animate;
      const stagger = anime.stagger;
      if (!animate) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          const cards = el.querySelectorAll('.keys-card');
          animate(cards as unknown as any, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 520,
            delay: stagger ? stagger(60, { start: 80 }) : 80,
            easing: 'outCubic',
          } as unknown as Record<string, unknown>);
          obs.disconnect();
        },
        { threshold: 0.22 },
      );
      obs.observe(el);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} className="bg-[#010120] px-4 sm:px-8 py-12 sm:py-20 overflow-x-hidden">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[880px]">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60" style={{ fontFamily: 'var(--font-mono)' }}>
            Ergonomics - keyboard you do not write
          </p>
          <h2 className="font-display mt-6 text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Keybindings you do not write.
          </h2>
          <p className="mt-4 max-w-[640px] text-[18px] leading-[27px] tracking-[-0.18px] text-white/60" style={{ fontFamily: 'var(--font-display)' }}>
            Vim flavored <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/80">H/J/K/L</code> everywhere. Same gesture, heavier modifier each scale: window to column to workspace to monitor. <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/80">Mod+J/K</code> smartly switches window vs workspace.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1100px] gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left - stage + kbd */}
          <div className="keys-card rounded-[4px] border border-white/10 bg-white/[0.04] p-6 opacity-0">
            {/* pill group */}
            <div
              className="inline-flex flex-wrap gap-1 rounded-[4px] bg-white/[0.06] p-1"
              role="tablist"
              aria-label="Key categories"
            >
              {order.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => {
                    setCat(c);
                    setRow(0);
                  }}
                  className={`rounded-[4px] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08px] transition ${
                    cat === c ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <DemoStage category={cat} activeRow={row} />
            </div>

            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.55px] text-white/45" style={{ fontFamily: 'var(--font-mono)' }}>
              Preview - {data[cat].mono} · auto cycling · press keys <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-white/70">H</kbd>/<kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-white/70">J</kbd>/<kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-white/70">K</kbd>/<kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-white/70">L</kbd> to interact
            </p>

            {/* keyboard hint row */}
            <div className="mt-6 flex gap-2">
              {(['H', 'J', 'K', 'L'] as const).map((k) => (
                <span
                  key={k}
                  className="grid h-9 w-9 place-items-center rounded-[4px] border border-white/10 bg-white/5 text-[12px] font-medium tracking-[0.08px] text-white/80"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {k}
                </span>
              ))}
              <span className="ml-2 self-center text-[12px] leading-[14px] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                vim-left/down/up/right across every scale
              </span>
            </div>
          </div>

          {/* right - bindings table */}
          <div className="keys-card rounded-[4px] border border-white/10 bg-white p-6 opacity-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
              {data[cat].label} · {data[cat].rows.length} bindings
            </p>
            <div className="mt-3 divide-y divide-black/10 overflow-hidden rounded-[4px] border border-black/10">
              <div className="grid grid-cols-[1.4fr_1fr] bg-[#959494]/[0.12] px-3 py-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
                  Shortcut
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/45" style={{ fontFamily: 'var(--font-mono)' }}>
                  Action
                </span>
              </div>
              {data[cat].rows.map((r, i) => (
                <div
                  key={r.kbd}
                  className={`grid grid-cols-[1.4fr_1fr] px-3 py-2.5 transition ${i === row ? 'bg-[#c8f6f9]/55' : 'bg-white'}`}
                >
                  <span
                    className={`text-[12px] font-medium tracking-[-0.1px] ${i === row ? 'text-black' : 'text-black/80'}`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {r.kbd}
                  </span>
                  <span className="text-[13px] leading-[16px] text-black/60" style={{ fontFamily: 'var(--font-display)' }}>
                    {r.desc}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.08px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
              Full table → <Link href="/docs/user-guide/keyboard-shortcuts" className="underline decoration-black/15 hover:text-black">Keyboard shortcuts</Link>
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[640px] text-center text-[11px] uppercase tracking-[0.08px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
          Source: <code className="rounded bg-white/10 px-1.5 py-0.5">~/.config/niri/config.d/binds.kdl</code> verbatim to <code className="rounded bg-white/10 px-1.5 py-0.5">keyboard-shortcuts.mdx</code>
        </p>
      </div>
    </section>
  );
}
