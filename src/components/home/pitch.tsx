import Link from 'next/link';
import { Boxes, SlidersHorizontal, Users, Zap } from 'lucide-react';
import { Reveal } from './reveal';

const tags = {
  tooling: ['docker', 'incus', 'chromium', 'node', 'go', 'bun', 'k3d', 'kubectl'],
  defaults: ['chezmoi', 'pass'],
};

export function Pitch() {
  return (
    <section className="border-b border-fd-border px-6 py-20 font-[family-name:var(--font-swiss)] sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Point n="01" icon={Users} title="Not for everyone">
            Larch is built for developers and engineers: people who want
            speed and full control. Nothing dumbed down, no walled garden.
          </Point>
        </Reveal>

        <Reveal delay={100}>
          <Point
            n="02"
            icon={Boxes}
            title="Comes with the tools you use"
            extra={
              <>
                <TagRow tags={tags.tooling} />
                <Link
                  href="/docs/user-guide/installation-guide"
                  className="text-sm font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300"
                >
                  Full install-time checklist in the docs →
                </Link>
              </>
            }
          >
            Docker is on by default. Add Incus for full VMs, or Chromium for
            a second browser. Pick a language toolchain too. k3d and kubectl
            are already there for local Kubernetes.
          </Point>
        </Reveal>

        <Reveal delay={200}>
          <Point
            n="03"
            icon={SlidersHorizontal}
            title="Defaults picked for a reason"
            extra={<TagRow tags={tags.defaults} />}
          >
            Every default comes from real trial and error. Kept because it
            works, not because it shipped first.
          </Point>
        </Reveal>

        <Reveal delay={300}>
          <Point n="04" icon={Zap} title="No setup weekend">
            Keybindings, layout, dark theme: all ready before you boot it.
            You start working, not building a system.
          </Point>
        </Reveal>
      </div>
    </section>
  );
}

function Point({
  n,
  icon: Icon,
  title,
  children,
  extra,
}: {
  n: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 border-t border-fd-border py-10 first:border-t-0 first:pt-0 sm:gap-10">
      <div className="flex w-12 shrink-0 flex-col items-center gap-3 sm:w-16">
        <span className="font-[family-name:var(--font-technical)] text-xs text-fd-muted-foreground/50">
          {n}
        </span>
        <div className="flex size-11 items-center justify-center rounded-full border border-fd-border text-blue-400 sm:size-12">
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-fd-muted-foreground">
          {children}
        </p>
        {extra && <div className="mt-4 flex flex-col gap-4">{extra}</div>}
      </div>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-fd-border px-3 py-1 font-[family-name:var(--font-technical)] text-xs text-fd-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
