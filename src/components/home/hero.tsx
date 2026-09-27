import Image from "next/image";
import Link from "next/link";
import { downloadUrl } from "@/lib/shared";

const facts = [
  "Arch-based",
  "Btrfs + full-disk encryption by default",
  "available in variants like niri, Hyprland",
  "minimal & fast by design",
];

export function Hero() {
  return (
    <section
      id="home-hero"
      className="relative overflow-hidden border-b border-fd-border font-(family-name:--font-swiss) w-full h-[calc(100dvh-3.5rem)] flex flex-col"
    >
      <Image
        src="https://storage.googleapis.com/larch-os/assets/wallpapers/larch-1.png"
        alt=""
        aria-hidden
        fill
        priority
        className="absolute inset-0 object-cover opacity-100"
      />
      <div className="absolute inset-0 bg-fd-background/70" />

      <svg
        aria-hidden
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-fd-foreground/10"
      >
        <line
          x1="120"
          y1="0"
          x2="120"
          y2="500"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="420"
          y1="0"
          x2="420"
          y2="500"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="700"
          y1="0"
          x2="700"
          y2="500"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="100"
          x2="800"
          y2="100"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="400"
          x2="800"
          y2="400"
          stroke="currentColor"
          strokeWidth="1"
        />
        <g stroke="currentColor" strokeWidth="1.5">
          <path d="M110 100h20M120 90v20" />
          <path d="M690 400h20M700 390v20" />
          <path d="M410 0h20M420 -10v20" />
        </g>
      </svg>

      {/* Fills the empty right-hand space at wide viewports with real,
          specific facts instead of leaving it bare. */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] flex-col justify-center gap-6 py-24 pr-10 lg:flex z-10">
        {facts.map((fact, i) => (
          <span
            key={fact}
            className="animate-fade-in-up self-start rounded-full border border-fd-border/60 bg-fd-background/40 px-4 py-2 font-(family-name:--font-technical) text-xs text-fd-muted-foreground backdrop-blur-sm"
            style={{
              animationDelay: `${700 + i * 150}ms`,
              marginLeft: `${(i % 2) * 3}rem`,
            }}
          >
            {fact}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center w-full px-6">
        <div className="w-full max-w-5xl flex flex-col justify-center gap-8 py-12 sm:py-16">
          <div
            className="animate-fade-in-up flex items-center gap-2.5"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src="/images/logo.png"
              alt=""
              aria-hidden
              width={26}
              height={26}
              className="size-6.5"
            />
            <span className="font-(family-name:--font-display) text-xl font-semibold tracking-tight text-fd-foreground">
              Larch
            </span>
            <span className="font-(family-name:--font-technical) text-xs tracking-[0.2em] text-fd-muted-foreground uppercase">
              Distro
            </span>
          </div>

          <h1
            className="animate-fade-in-up max-w-3xl leading-tight"
            style={{ animationDelay: "100ms" }}
          >
            <span className="block text-sm font-(family-name:--font-technical) text-fd-muted-foreground/70 uppercase tracking-wider mb-2">
              for
            </span>

            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-fd-foreground">
              developers
            </span>

            <span className="mt-4 block text-sm font-(family-name:--font-technical) text-fd-muted-foreground/70 uppercase tracking-wider mb-2">
              and
            </span>

            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-400">
              engineers.
            </span>
          </h1>

          <div
            className="animate-fade-in-up flex max-w-lg flex-col gap-4 text-sm sm:text-base leading-relaxed text-fd-muted-foreground"
            style={{ animationDelay: "200ms" }}
          >
            <p>
              Boots into a desktop that&apos;s already set up to move fast:
              essential features and tools already setup. A keyboard first
              workflow for people who want fast workflows, with all the best
              practices built in so you&apos;re getting to work, not setting one
              up.
            </p>
          </div>

          <div
            className="animate-fade-in-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "300ms" }}
          >
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
      </div>
    </section>
  );
}
