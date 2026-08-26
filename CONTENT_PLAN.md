# Docs content plan

Working notes on the documentation structure and what's real content versus outline. Not part of the published site, this file lives at the repo root so it doesn't get picked up as a page.

## Structure

One flat sidebar, ordered as a user journey with contributor content at the bottom (decided over a tabbed user/dev split, kept it simple).

```
content/docs/
  index.mdx                          Introduction
  getting-started/
    downloading.mdx                  OUTLINE - no release process exists yet
    live-session.mdx                 real content
  desktop-guide/
    niri.mdx                         real content
    noctalia.mdx                     OUTLINE
    shell-and-terminal.mdx           real content
    networking.mdx                   real content
  package-management.mdx             real content
  known-issues.mdx                   real content
  development/
    architecture.mdx                 real content
    building-the-iso.mdx             real content
    testing-in-a-vm.mdx              real content
    roadmap.mdx                      real content
```

Ordering is controlled by `meta.json`'s `pages` array in each folder (Fumadocs hides anything not listed there). No `root: true` tabs used, that's what a two-tab layout needs, not applicable here.

## What's still an outline, and why

- **`getting-started/downloading.mdx`**: no public release process exists. Larch ISOs are built locally right now. Fill in once there's a real download location (likely GitHub Releases, given the repo lives at `github.com/larch-os/larch-base`) and a decision on whether to GPG-sign builds.
- **`desktop-guide/noctalia.mdx`**: I don't have enough detail on noctalia's actual panel layout, launcher UX, or settings UI from anything documented so far. Needs someone who's actually used it to fill in, or a session spent exploring the live UI.

Everything else has real, sourced content pulled from `larch/README.md`, `larch/docs/session-context.md`, `larch/docs/arch-niri-distro-context.md`, and direct inspection of the actual config files in `archiso/releng/airootfs/`.

## Fumadocs conventions (for whoever touches this next)

- Pages live under `content/docs/`, one `.mdx` file per page, frontmatter needs `title` and `description`.
- Folders group pages into sidebar sections. A folder needs a `meta.json` with a `pages` array listing the filenames (no extension) in display order. Anything not listed is hidden from nav, even if the file exists.
- `meta.json` also takes `title` (display name for the group) and `icon`.
- `root: true` in a folder's `meta.json` turns it into a top-level tab instead of a nested sidebar group, not used here, noting it in case the flat sidebar ever needs splitting later.
- Default MDX components available: everything from `fumadocs-ui/mdx` (`Callout`, `Cards`/`Card`, code blocks with syntax highlighting, tables). No custom components registered yet, see `src/components/mdx.tsx`.
- `bun run build` catches MDX syntax errors and broken component references at build time, run it after any content change before calling a page done. It does not validate internal `[text](/docs/...)` links, those can dangle silently.

## Writing style

Every page here should pass the `unslop` skill (`/home/anish/Documents/dev/incus-k8s-manager/.claude/skills/unslop/SKILL.md`, not registered in this repo, read it directly): no AI-vocabulary, no puffery, active voice, sentence-case headings, no em dashes, callouts used for genuinely different content (warnings, TODOs) not as decoration.

## Homepage

`src/app/(home)/page.tsx` composes four sections from `src/components/home/`: `hero.tsx`, `screenshot.tsx`, `features.tsx`, `footer.tsx`. Built dark-first (the site's `RootProvider` defaults to dark regardless of OS preference, this isn't something the homepage components control), using `fd-*` semantic color tokens throughout so it still adapts correctly if a visitor toggles to light mode manually.

Assets live in `public/images/`: `logo.png` (copied from `larch/assets/logo.png`) and `desktop-screenshot.png` (a real `grim` capture from the test VM, not a mockup).

Known placeholders:

- **Download button** (`src/lib/shared.ts`, `downloadUrl`) points at `https://cdn.larch-os.dev/larch-latest.iso`, which doesn't exist yet. Marked with a `TODO` comment. Replace once ISO hosting is live.
- **`desktop-screenshot.png`** is the project's actual personal wallpaper (a stylized illustrated figure, replicated verbatim from the real machine per the project's convention). It's genuine, not staged, but it's a personal aesthetic choice on a now-public marketing page. Worth a deliberate call on whether that's the permanent choice.
- No `LICENSE` file exists anywhere in the `larch` repo, so the footer doesn't link one. Worth adding regardless of the homepage.

## Next steps

1. Fill in `noctalia.mdx` once there's real detail to write.
2. Decide on a release process, then fill in `downloading.mdx` and swap in the real `downloadUrl`.
3. Revisit `known-issues.mdx`'s KDE theming section if that investigation resumes.
4. Once the installer exists, `getting-started/live-session.mdx` and `development/roadmap.mdx` both need updates, they currently describe it as unbuilt.
5. Decide on the homepage screenshot/wallpaper question above, and whether a `LICENSE` file should exist.
