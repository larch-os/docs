import Link from 'next/link';
import { gitConfig } from '@/lib/shared';

export function Footer() {
  return (
    <footer className="border-t border-fd-border px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-fd-muted-foreground sm:flex-row">
        <p>Larch. Arch based Linux distro for developers and engineers.</p>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-fd-foreground">
            Docs
          </Link>
          <Link href="/blog" className="hover:text-fd-foreground">
            Blog
          </Link>
          <Link
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            className="hover:text-fd-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
