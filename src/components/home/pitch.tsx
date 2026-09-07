export function Pitch() {
  return (
    <section className="border-b border-fd-border px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-lg leading-relaxed text-fd-foreground">
          niri lays windows out on a scrollable strip you move through with
          the keyboard, the kind of setup power users reach for because it
          gets out of the way once it&apos;s configured. That &quot;once
          it&apos;s configured&quot; part is usually the catch: tiling window
          managers normally cost you a weekend of writing your own
          keybindings and layout rules before any of that speed pays off.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-fd-foreground">
          Larch skips the weekend. Real keybindings, sane layout defaults, a
          dark theme, all wired in before you ever boot it.
        </p>
        <p className="mt-10 text-base leading-relaxed text-fd-muted-foreground">
          <span className="font-[family-name:var(--font-lazy)] italic text-fd-foreground">
            Developer
          </span>
          , because the tools you reach for every day are already there:
          chezmoi for dotfiles, pass for secrets, lazygit, htop and btop, uv,
          k3d and kubectl, paru for anything else on the AUR.{' '}
          <span className="font-[family-name:var(--font-display)] font-semibold text-fd-foreground">
            Engineer
          </span>
          , because underneath it&apos;s real Arch. Nothing dumbed down,
          nothing standing between you and whatever you need.
        </p>
      </div>
    </section>
  );
}
