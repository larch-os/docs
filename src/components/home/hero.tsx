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
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 hidden size-[26rem] -translate-y-1/2 opacity-[0.07] sm:block lg:size-[34rem]"
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

        <h1 className="flex flex-col gap-1">
          <span className="text-base text-fd-muted-foreground sm:text-xl">
            Arch based linux distro
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="text-xl text-fd-muted-foreground sm:text-3xl md:text-4xl">
              for
            </span>
            <span className="font-[family-name:var(--font-lazy)] text-6xl italic text-fd-foreground sm:text-8xl md:text-9xl">
              lazy
            </span>
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="text-xl text-fd-muted-foreground sm:text-3xl md:text-4xl">
              yet
            </span>
            <span className="font-[family-name:var(--font-power)] text-4xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-sky-400 to-blue-600 sm:text-6xl md:text-8xl">
              power
            </span>
            <span className="text-xl text-fd-muted-foreground sm:text-3xl md:text-4xl">
              users.
            </span>
          </span>
        </h1>

        <div className="flex max-w-lg flex-col gap-2 text-base leading-relaxed text-fd-muted-foreground">
          <p>
            Boots into a desktop that&apos;s already fast: dark theme,
            keyboard-driven tiling, a shell with the shortcuts built in.
          </p>
          <p>
            Runs on real Arch underneath, so nothing about the distro stands
            between you and whatever your workflow needs.
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
