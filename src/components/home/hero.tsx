import Image from 'next/image';
import Link from 'next/link';
import { downloadUrl } from '@/lib/shared';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-fd-border font-[family-name:var(--font-swiss)]">
      <Image
        src="https://storage.googleapis.com/larch-os/assets/wallpapers/larch-1.png"
        alt=""
        aria-hidden
        fill
        priority
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-fd-background/80" />

      <svg
        aria-hidden
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-fd-foreground/10"
      >
        <line x1="120" y1="0" x2="120" y2="500" stroke="currentColor" strokeWidth="1" />
        <line x1="420" y1="0" x2="420" y2="500" stroke="currentColor" strokeWidth="1" />
        <line x1="700" y1="0" x2="700" y2="500" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="1" />
        <g stroke="currentColor" strokeWidth="1.5">
          <path d="M110 100h20M120 90v20" />
          <path d="M690 400h20M700 390v20" />
          <path d="M410 0h20M420 -10v20" />
        </g>
      </svg>

      <div className="relative mx-auto flex min-h-[34rem] max-w-5xl flex-col justify-center gap-8 px-6 py-24 sm:min-h-[38rem] sm:py-32">
        <span className="font-[family-name:var(--font-technical)] text-xs tracking-[0.2em] text-fd-muted-foreground uppercase">
          Larch · Distro
        </span>

        <h1 className="flex flex-col gap-1">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-lg font-light text-fd-muted-foreground/70 sm:text-xl">
              for
            </span>
            <span className="text-5xl font-bold tracking-tight text-fd-foreground sm:text-6xl md:text-7xl">
              developers
            </span>
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-lg font-light text-fd-muted-foreground/70 sm:text-xl">
              and
            </span>
            <span className="text-4xl font-bold tracking-tight text-blue-400 sm:text-5xl md:text-6xl">
              engineers.
            </span>
          </span>
        </h1>

        <div className="flex max-w-lg flex-col gap-4 text-base leading-relaxed text-fd-muted-foreground">
          <p>
            Boots into a desktop that&apos;s already set up to move fast:
            dark theme, everything a keystroke away, so you&apos;re getting
            to work, not setting one up.
          </p>
          <p>
            Built on real Arch. Nothing dumbed down, nothing standing
            between you and whatever you need.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={downloadUrl}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-500"
          >
            Download ISO
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-fd-border px-5 py-2.5 font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
