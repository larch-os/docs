import Image from 'next/image';
import Link from 'next/link';
import { downloadUrl } from '@/lib/shared';

export function Hero() {
  return (
    <section className="relative overflow-x-clip border-b border-fd-border font-[family-name:var(--font-swiss)]">
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <span className="font-[family-name:var(--font-technical)] text-xs tracking-[0.2em] text-fd-muted-foreground uppercase">
          Larch · Distro
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-12">
        <div className="flex flex-col justify-center gap-8 px-6 py-14 lg:col-span-5 lg:self-center lg:py-24 lg:pr-10 lg:pl-[max(1.5rem,calc((100vw-64rem)/2))]">
          <h1 className="flex flex-col gap-1">
            <span className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-lg font-light text-fd-muted-foreground/70 sm:text-xl">
                for
              </span>
              <span className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
                developers
              </span>
            </span>
            <span className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-lg font-light text-fd-muted-foreground/70 sm:text-xl">
                and
              </span>
              <span className="text-3xl font-bold tracking-tight text-blue-400 sm:text-4xl">
                engineers.
              </span>
            </span>
          </h1>

          <div className="flex max-w-md flex-col gap-4 text-base leading-relaxed text-fd-muted-foreground">
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

        <div className="px-6 pb-14 lg:col-span-7 lg:self-start lg:px-0 lg:pt-10 lg:pr-0 lg:pb-14">
          <div className="overflow-hidden rounded-xl border border-fd-border shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:rounded-r-none">
            <Image
              src="https://github.com/user-attachments/assets/3327db16-d57b-425b-ae0a-1ae75e4e80c3"
              alt="The Larch live desktop: niri with the noctalia panel running along the top"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />
          </div>
          <p className="mt-3 font-[family-name:var(--font-technical)] text-xs text-fd-muted-foreground">
            niri + noctalia, shipping now
          </p>
        </div>
      </div>
    </section>
  );
}
