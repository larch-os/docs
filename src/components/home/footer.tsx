import Link from 'next/link';
import { gitConfig } from '@/lib/shared';
import { WordmarkBanner } from './wordmark-banner';

export function Footer() {
  return (
    <footer className="bg-white">
      {/* DESIGN.md footer - 4-col, eyebrow mono, body-md, section 80px */}
      <div className="mx-auto max-w-[1280px] px-8 py-10" style={{ padding: '48px 32px' }}>
        <div className="grid gap-8 text-[14px] leading-[19.6px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
              Larch OS
            </p>
            <p className="mt-3 max-w-[260px] text-[14px] leading-[19.6px] text-black/60" style={{ fontFamily: 'var(--font-display)' }}>
              Arch based linux distro for lazy yet power users. niri + noctalia, kitty + zsh, real Arch underneath.
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.08px] text-black/30" style={{ fontFamily: 'var(--font-mono)' }}>
              No custom repo · pacman -Syu just works
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
              Docs
            </p>
            <ul className="mt-3 space-y-2 text-[16px] leading-[20.8px] tracking-[-0.16px] text-black/70" style={{ fontFamily: 'var(--font-display)' }}>
              <li><Link href="/docs" className="hover:text-black hover:underline">Introduction</Link></li>
              <li><Link href="/docs/getting-started" className="hover:text-black hover:underline">Getting started · VM</Link></li>
              <li><Link href="/docs/software-guide" className="hover:text-black hover:underline">Software guide</Link></li>
              <li><Link href="/docs/user-guide/keyboard-shortcuts" className="hover:text-black hover:underline">Keybindings</Link></li>
              <li><Link href="/docs/development/architecture" className="hover:text-black hover:underline">Architecture</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
              ISO variants
            </p>
            <ul className="mt-3 space-y-2 text-[16px] leading-[20.8px] tracking-[-0.16px] text-black/70" style={{ fontFamily: 'var(--font-display)' }}>
              <li><Link href="/docs/iso-variants/larch-base" className="hover:text-black hover:underline">larch-base · niri+noctalia</Link></li>
              <li><Link href="/docs/iso-variants/larch-dank-shell" className="hover:text-black hover:underline">larch-dank-shell · placeholder</Link></li>
              <li><Link href="/docs/iso-variants/larch-hyprland" className="hover:text-black hover:underline">larch-hyprland · placeholder</Link></li>
              <li><Link href="/docs/development/building-the-iso" className="hover:text-black hover:underline">Building the ISO</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.55px] text-black/40" style={{ fontFamily: 'var(--font-mono)' }}>
              Links
            </p>
            <ul className="mt-3 space-y-2 text-[16px] leading-[20.8px] tracking-[-0.16px] text-black/70" style={{ fontFamily: 'var(--font-display)' }}>
              <li><Link href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} className="hover:text-black hover:underline">GitHub · {gitConfig.user}/{gitConfig.repo}</Link></li>
              <li><Link href="/docs/known-issues" className="hover:text-black hover:underline">Known issues</Link></li>
              <li><Link href="/docs/development/roadmap" className="hover:text-black hover:underline">Roadmap</Link></li>
              <li><span className="text-black/35">No LICENSE yet - footer won&apos;t link one</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 text-[12px] leading-[19.6px] text-black/35 sm:flex-row" style={{ fontFamily: 'var(--font-display)' }}>
          <span>© {new Date().getFullYear()} Larch · Arch based. Boots live today, installs later.</span>
          <span className="text-[11px] uppercase tracking-[0.08px] text-black/30" style={{ fontFamily: 'var(--font-mono)' }}>
            archiso releng · profiles/ as single source · rm -rf work/
          </span>
        </div>
      </div>

      {/* footer-wordmark-banner - display-xxl stencil tinted hairline DESIGN.md:262 */}
      <WordmarkBanner word="LARCH" />
    </footer>
  );
}
