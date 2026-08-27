# Docs content plan

Working notes on the documentation structure and what's real content versus outline. Not part of the published site, this file lives at the repo root so it doesn't get picked up as a page.

## Structure

One flat sidebar, ordered as a user journey with contributor content at the bottom (decided over a tabbed user/dev split, kept it simple).

```
content/docs/
  index.mdx                          Introduction
  getting-started.mdx                real content, Download section still OUTLINE (see below)
  desktop-guide/
    niri.mdx                         real content
    noctalia.mdx                     OUTLINE
    shell-and-terminal.mdx           real content
    networking.mdx                   real content
  using-larch/
    keyboard-shortcuts.mdx           real content
    power-management.mdx             real content (documents a real gap: swayidle unconfigured)
    development-tools.mdx            OUTLINE - no dev tools in packages.x86_64 yet
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
- **`desktop-guide/noctalia.mdx`**: I don't have enough detail on noctalia's actual panel layout, launcher UX, or settings UI from anything documented so far. Needs someone who's actually used it to fill in, or a session spent exploring the live UI.
- **`using-larch/development-tools.mdx`**: nothing to document yet, see below.

Everything else has real, sourced content pulled from `larch-base/README.md`, `larch-base/docs/session-context.md`, `larch-base/docs/arch-niri-distro-context.md`, and direct inspection of the actual config files in `archiso/releng/airootfs/`.

## Using Larch section

`keyboard-shortcuts.mdx` is sourced directly from `~/.config/niri/config.d/binds.kdl` (the real machine's config, already ported to the ISO verbatim, see [[project-larch-overview]]-adjacent memory on the niri config diff), organized into the categories the bindings actually fall into: launching, window management, workspace management, monitor management, screenshots, media/hardware keys, session.

`power-management.mdx` documents a real, previously-undocumented gap found while writing it: the live ISO deliberately disables suspend/hibernate/lid-switch via `/etc/systemd/logind.conf.d/do-not-suspend.conf` (correct, intentional for a live session), but `swayidle` is spawned at startup with zero config, no dimming, no lock-on-idle, nothing. The real machine's swayidle setup (dim → screen-off → suspend-then-hibernate) is documented on the page as reference for a future installed-system default, explicitly not yet ported or decided.

`development-tools.mdx` is a pure outline. `packages.x86_64` only has `vim`/`nano`/`tmux` (generic archiso `releng` baseline tools), nothing that backs up the homepage's "tuned for development work" pitch yet.

**This is now a deliberate, docs-first sequencing decision, not an oversight.** The introduction (`index.mdx`) was rewritten to explicitly claim Larch "ships the tools best suited for the jobs developers reach for every day" — asserted as present-tense fact, ahead of the packages that would back it up. The plan (confirmed by the project owner after I flagged the gap) is: write the docs first, add the actual packages after. No specific tool names belong in this copy (an early draft named `incus` as a `virt-manager` replacement; explicitly told not to use that example verbatim, keep it generic). Once real packages land in `packages.x86_64`, `development-tools.mdx` needs real content and the intro's claim needs to actually be true, not just asserted. Don't let this drift, it's a live IOU, not a resolved question.

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

1. Fill in `noctalia.mdx` once there's real detail to write.
2. Decide on a release process, then fill in `getting-started.mdx`'s Download section and swap `downloadUrl` in `src/lib/shared.ts` for the real one (used by both the homepage and `<DownloadButton />`).
3. Revisit `known-issues.mdx`'s KDE theming section if that investigation resumes.
4. Once the installer exists, `getting-started.mdx`'s "Installing Larch" section and `development/roadmap.mdx` both need updates, they currently describe it as unbuilt.
5. Decide on the homepage screenshot/wallpaper question above, and whether a `LICENSE` file should exist.
6. Decide whether to give the live session (or the eventual installed system) a real swayidle config, currently it runs configured to do nothing. See `using-larch/power-management.mdx`.
7. **Priority.** Add real developer/power-user tooling to `packages.x86_64` to back up what `index.mdx` and the homepage now claim as present-tense fact. Then fill in `development-tools.mdx` to match. This is the one open item most likely to make the docs look dishonest if it sits too long.
8. `index.mdx`'s "Project status" now frames the whole project as three stages: finish the live ISO (current focus) → build the installer → keep docs current as an ongoing commitment, not a stage with an end date. `development/roadmap.mdx` still describes things in the older "built / not started" checklist style and doesn't reflect this three-stage framing. Worth reconciling once the roadmap page gets touched again, so the two pages tell the same story.
