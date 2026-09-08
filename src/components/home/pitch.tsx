import Link from 'next/link';
import { Reveal } from './reveal';

export function Pitch() {
  return (
    <section className="border-b border-fd-border px-6 py-20 font-[family-name:var(--font-swiss)] sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-12">
        <Reveal className="sm:col-span-12">
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
            Built for one kind of user.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground">
            Developers and engineers who want a fast, keyboard-driven system
            that gets out of the way, without giving up real Arch
            underneath. Nothing dumbed down, full AUR access, no walled
            garden.
          </p>
        </Reveal>

        <Reveal delay={80} className="sm:col-span-7">
          <h3 className="text-xl font-semibold text-fd-foreground">
            The tooling you already reach for
          </h3>
          <p className="mt-3 leading-relaxed text-fd-muted-foreground">
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              docker
            </span>{' '}
            is checked by default at install.{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              incus
            </span>{' '}
            is there too if you want full VMs instead of containers, and{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              chromium
            </span>{' '}
            for a second browser, both a checkbox away. Pick a language
            toolchain while you&apos;re at it:{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              node
            </span>
            ,{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              go
            </span>
            , or{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              bun
            </span>
            . For local Kubernetes without a VM,{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              k3d
            </span>{' '}
            and{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              kubectl
            </span>{' '}
            ship with every install.
          </p>
          <Link
            href="/docs/user-guide/installation-guide"
            className="mt-4 inline-block text-sm font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300"
          >
            Full install-time checklist in the docs →
          </Link>
        </Reveal>

        <Reveal delay={160} className="sm:col-span-5">
          <h3 className="text-xl font-semibold text-fd-foreground">
            Defaults chosen for being right
          </h3>
          <p className="mt-3 leading-relaxed text-fd-muted-foreground">
            Every default in Larch comes from years of dotfiles and config
            trial and error, kept because it&apos;s convenient and correct,
            not because it shipped first.{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              chezmoi
            </span>{' '}
            manages dotfiles across machines from one source repo.{' '}
            <span className="font-[family-name:var(--font-technical)] text-fd-foreground">
              pass
            </span>{' '}
            keeps secrets as GPG-encrypted files instead of plaintext.
          </p>
        </Reveal>

        <Reveal delay={240} className="sm:col-span-12">
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
            No setup weekend.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground">
            Real keybindings, sane layout defaults, a dark theme, all wired
            in before you ever boot it. Whichever variant you install,
            you&apos;re getting to work, not building a system first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
