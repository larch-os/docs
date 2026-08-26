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
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.25), transparent 70%)",
        }}
      />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Image
          src="/images/logo.png"
          alt="Larch logo"
          width={176}
          height={176}
          className="size-96"
          priority
        />
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          <span className="text-fd-foreground">lar</span>
          <span className="bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">
            ch
          </span>
        </h1>
        <p className="text-lg text-fd-muted-foreground">
          Arch based linux distro for lazy yet power users.
        </p>
        <p className="max-w-2xl text-fd-muted-foreground">
          A fully functional distro with every bit tuned for development work:
          niri and noctalia by default, stock Arch repos underneath, and
          software choices built around what a development machine actually
          needs.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
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
