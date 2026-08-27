# Docs content plan

Working notes on the documentation structure and what's real content versus outline. Not part of the published site, this file lives at the repo root so it doesn't get picked up as a page.

## Structure

One flat sidebar, ordered as a user journey with contributor content at the bottom (decided over a tabbed user/dev split, kept it simple).

```
content/docs/
  index.mdx                          Introduction
  getting-started.mdx                real content, Download section still OUTLINE (see below)
  software-guide/
    niri.mdx                         real content
    noctalia.mdx                     OUTLINE
    shell-and-terminal.mdx           real content
    networking.mdx                   real content
  user-guide/
    keyboard-shortcuts.mdx           real content
    power-management.mdx             describes the installed system's swayidle setup, not yet actually shipped, see below
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

- **`getting-started.mdx`'s Download section**: no public release process exists. Larch ISOs are built locally right now. Fill in once there's a real download location (likely GitHub Releases, given the repo lives at `github.com/larch-os/larch-base`) and a decision on whether to GPG-sign builds. The rest of the page (booting in a VM, the installer placeholder) is real content.
- **`software-guide/noctalia.mdx`**: needs the same lean treatment niri got (GitHub link + their own official demo video, nothing else). Blocked on the video specifically: noctalia's repo has no demo video or screenshot anywhere (checked the README and searched beyond it), only third-party YouTube content, which isn't the same thing as an official upstream demo. Waiting on a real URL rather than substituting one.
Everything else has real, sourced content pulled from `larch-base/README.md`, `larch-base/docs/session-context.md`, `larch-base/docs/arch-niri-distro-context.md`, and direct inspection of the actual config files in `archiso/releng/airootfs/`.

## User guide section

`keyboard-shortcuts.mdx` is sourced directly from `~/.config/niri/config.d/binds.kdl` (the real machine's config, already ported to the ISO verbatim, see [[project-larch-overview]]-adjacent memory on the niri config diff), organized into the categories the bindings actually fall into: launching, window management, workspace management, monitor management, screenshots, media/hardware keys, session.

`power-management.mdx` was rewritten to only describe the installed system's target power management (the real machine's dim → screen-off → suspend-then-hibernate swayidle setup, plus the sleep.conf/logind.conf settings it pairs with). Same docs-first sequencing call as `development-tools.mdx`: none of this is actually shipped in the live ISO yet (which still deliberately disables suspend/hibernate/lid-switch via `/etc/systemd/logind.conf.d/do-not-suspend.conf`, and spawns `swayidle -w` with zero config), the page just no longer says so. Don't let this drift either, it needs to become true, not stay aspirational.

**`development-tools.mdx` was removed entirely** (was a pure outline page under User guide). The idea it was trying to cover, what software Larch ships for development work, now lives under Software guide instead, one entry per piece of software, same pattern as niri/noctalia/kitty/zsh. No separate "dev tools" page needed once that's the model.

That doesn't resolve the underlying gap, it just relocates where it'll show up. `packages.x86_64` still only has `vim`/`nano`/`tmux`, nothing that backs up the homepage's or the introduction's "tuned for development work" pitch. **This is a deliberate, docs-first sequencing decision, not an oversight**, confirmed by the project owner after I flagged it: write the docs first, add the actual packages after. No specific tool names belong in this copy (an early draft named `incus` as a `virt-manager` replacement; explicitly told not to use that example verbatim, keep it generic). Once real dev tooling lands in `packages.x86_64`, Software guide needs new entries for it, and the intro's claim needs to actually be true, not just asserted. Don't let this drift, it's a live IOU, not a resolved question.

## Fumadocs conventions (for whoever touches this next)

- Pages live under `content/docs/`, one `.mdx` file per page, frontmatter needs `title` and `description`.
- Folders group pages into sidebar sections. A folder needs a `meta.json` with a `pages` array listing the filenames (no extension) in display order. Anything not listed is hidden from nav, even if the file exists.
- `meta.json` also takes `title` (display name for the group) and `icon`.
- `root: true` in a folder's `meta.json` turns it into a top-level tab instead of a nested sidebar group, not used here, noting it in case the flat sidebar ever needs splitting later.
- Default MDX components available: everything from `fumadocs-ui/mdx` (`Callout`, `Cards`/`Card`, code blocks with syntax highlighting, tables), plus one custom component: `<DownloadButton />` (`src/components/download-button.tsx`, registered in `src/components/mdx.tsx`). It pulls `downloadUrl` from `@/lib/shared`, same single source of truth the homepage uses, so the placeholder URL only needs updating in one place when real ISO hosting exists.
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

1. Fill in `noctalia.mdx` once there's a real demo video URL for it (see above, blocked on that specifically now, not general detail).
2. Decide on a release process, then fill in `getting-started.mdx`'s Download section and swap `downloadUrl` in `src/lib/shared.ts` for the real one (used by both the homepage and `<DownloadButton />`).
3. Revisit `known-issues.mdx`'s KDE theming section if that investigation resumes.
4. Once the installer exists, `getting-started.mdx`'s "Installing Larch" section and `development/roadmap.mdx` both need updates, they currently describe it as unbuilt.
5. Decide on the homepage screenshot/wallpaper question above, and whether a `LICENSE` file should exist.
6. Ship the swayidle config, sleep.conf, and logind.conf settings `user-guide/power-management.mdx` now describes as fact. Live ISO still disables suspend/hibernate/lid-switch entirely and runs swayidle with zero config.
7. **Priority.** Add real developer/power-user tooling to `packages.x86_64` to back up what `index.mdx` and the homepage now claim as present-tense fact. Then add entries for it in Software guide. This is the one open item most likely to make the docs look dishonest if it sits too long.
8. `index.mdx`'s "Project status" now frames the whole project as three stages: finish the live ISO (current focus) → build the installer → keep docs current as an ongoing commitment, not a stage with an end date. `development/roadmap.mdx` still describes things in the older "built / not started" checklist style and doesn't reflect this three-stage framing. Worth reconciling once the roadmap page gets touched again, so the two pages tell the same story.
