import Image from "next/image";
import Link from "next/link";
import { downloadUrl } from "@/lib/shared";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-fd-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 0%, rgba(56,189,248,0.2), transparent 70%)",
        }}
      />
      <Image
        src="/images/logo.png"
        alt=""
        width={900}
        height={900}
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 hidden size-[24rem] -translate-y-1/2 opacity-[0.04] sm:block lg:size-[30rem]"
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 sm:py-28">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt=""
            width={200}
            height={200}
            className="size-8 sm:size-9"
            priority
          />
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">
            <span className="text-fd-foreground">lar</span>
            <span className="bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">
              ch
            </span>
          </span>
        </div>

        <h1 className="flex flex-col gap-2">
          <span className="text-sm font-medium tracking-[0.2em] text-fd-muted-foreground/70 uppercase sm:text-base">
            Distro
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="font-light text-lg text-fd-muted-foreground/70 sm:text-2xl md:text-3xl">
              for
            </span>
            <span className="font-[family-name:var(--font-lazy)] text-6xl italic text-fd-foreground sm:text-8xl md:text-9xl">
              lazy
            </span>
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="font-light text-lg text-fd-muted-foreground/70 sm:text-2xl md:text-3xl">
              yet
            </span>
            <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 sm:text-7xl md:text-8xl">
              power
            </span>
            <span className="font-light text-lg text-fd-muted-foreground/70 sm:text-2xl md:text-3xl">
              users.
            </span>
          </span>
        </h1>

        <div className="flex max-w-lg flex-col gap-2 text-base leading-relaxed text-fd-muted-foreground">
          <p>
            Boots into a desktop that&apos;s already set up to move fast:
            dark theme, everything a keystroke away, so you&apos;re getting
            to work, not setting one up.
          </p>
          <p>
            Built on real Arch for developers and engineers who want a fast,
            no-nonsense system that stays out of the way.
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3">
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
