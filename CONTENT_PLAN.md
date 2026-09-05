# Docs content plan

Working notes on the documentation structure and what's real content versus outline. Not part of the published site, this file lives at the repo root so it doesn't get picked up as a page.

## Structure

One flat sidebar, ordered as a user journey with contributor content at the bottom (decided over a tabbed user/dev split, kept it simple).

```
content/docs/
  index.mdx                          Introduction
  getting-started.mdx                real content, Download section still OUTLINE (see below)
  iso-variants/
    larch-base.mdx                   real content, uses the same homepage screenshot
    larch-dank-shell.mdx             PLACEHOLDER - variant doesn't exist
    larch-hyprland.mdx               PLACEHOLDER - variant doesn't exist
  software-guide/
    niri.mdx                         real content
    noctalia.mdx                     OUTLINE
    shell-and-terminal.mdx           real content
    networking.mdx                   real content
    default-apps.mdx                 real content, chezmoi/pass/Pika Backup/herdr --
                                      the installer's own default package list
                                      (packages.conf's static try_install), not
                                      the netinstall extras page
  user-guide/
    installation-guide.mdx           real content, one short section per Calamares step
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

- **`getting-started.mdx`'s Download section**: no public release process exists. Larch ISOs are built locally right now. Fill in once there's a real download location (likely GitHub Releases, given the repo lives at `github.com/larch-os/larch-base`) and a decision on whether to GPG-sign builds. The rest of the page, including "Installing Larch", is real content now: the installer exists and has completed real end-to-end installs (encryption, GRUB, first boot all confirmed).
- **`software-guide/noctalia.mdx`**: needs the same lean treatment niri got (GitHub link + their own official demo video, nothing else). Blocked on the video specifically: noctalia's repo has no demo video or screenshot anywhere (checked the README and searched beyond it), only third-party YouTube content, which isn't the same thing as an official upstream demo. Waiting on a real URL rather than substituting one.
- **`iso-variants/larch-dank-shell.mdx`** and **`iso-variants/larch-hyprland.mdx`**: neither variant exists, no repo, no packages, no screenshot. Pure placeholders, explicitly authorized as such rather than left unwritten, so the section's shape exists before the content does.

Everything else has real, sourced content pulled from `larch-base/README.md`, `larch-base/docs/session-context.md`, `larch-base/docs/arch-niri-distro-context.md`, and direct inspection of the actual config files in `archiso/releng/airootfs/`.

## ISO variants section

One page per variant, named after its future repo (`larch-base`, `larch-dank-shell`, `larch-hyprland`), matching the `larch-os` GitHub org's naming convention decided earlier this project (see [[project-larch-docs-site]] memory on the multi-variant architecture). Same structure on every page: status callout, screenshot, software list, repo link.

`larch-base.mdx` and the homepage both point at the same hero image URL (`github.com/user-attachments/assets/...`, from `larch-base`'s own README), one real screenshot, not two to keep in sync. Not a local file anymore, the old `/images/desktop-screenshot.png` was removed once nothing referenced it. That URL is a short-lived signed S3 redirect under the hood, `next.config.mjs`'s `images.remotePatterns` allows both `github.com` and `*.s3.amazonaws.com` so next/image can actually follow it.

`larch-hyprland.mdx` corrects the spelling from how it was requested ("larch-hyperland") to the actual project name, Hyprland. Also worth knowing: noctalia supports Hyprland natively (confirmed via web search, not assumed), so pairing Hyprland with noctalia instead of a different shell is plausible, the page says so rather than assuming a shell swap is required.

Once there's more than one real variant, `getting-started.mdx`'s Download section will need to point here instead of a single download button, it currently assumes one ISO.

## User guide section

`installation-guide.mdx` walks through the Calamares flow one step at a time (welcome, language, keyboard, partitioning, account, extras, summary, installing, finished), one short paragraph per step, sourced from `settings.conf`'s actual `show` sequence in `larch-calamares`, not a general description. Linked from `getting-started.mdx`'s "Installing Larch" section, which stays the high-level summary; this page is the detail.

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

Assets live in `public/images/`: just `logo.png` now (copied from `larch/assets/logo.png`). The screenshot isn't a local asset, see the ISO variants section above.

Known placeholders:

- **Download button** (`src/lib/shared.ts`, `downloadUrl`) points at `https://cdn.larch-os.dev/larch-latest.iso`, which doesn't exist yet. Marked with a `TODO` comment. Replace once ISO hosting is live.
- No `LICENSE` file exists anywhere in the `larch` repo, so the footer doesn't link one. Worth adding regardless of the homepage.

## Next steps

1. Fill in `noctalia.mdx` once there's a real demo video URL for it (see above, blocked on that specifically now, not general detail).
2. Decide on a release process, then fill in `getting-started.mdx`'s Download section and swap `downloadUrl` in `src/lib/shared.ts` for the real one (used by both the homepage and `<DownloadButton />`).
3. Revisit `known-issues.mdx`'s KDE theming section if that investigation resumes.
4. `getting-started.mdx`'s "Installing Larch" section is updated, the installer exists now. `development/roadmap.mdx` still needs the same update, it still describes the installer as unbuilt.
5. Homepage screenshot question resolved: both it and `larch-base.mdx` now use the same `larch-base` README hero image URL. Still open: whether a `LICENSE` file should exist.
6. Ship the swayidle config, sleep.conf, and logind.conf settings `user-guide/power-management.mdx` now describes as fact. Live ISO still disables suspend/hibernate/lid-switch entirely and runs swayidle with zero config.
7. **Priority.** Add real developer/power-user tooling to `packages.x86_64` to back up what `index.mdx` and the homepage now claim as present-tense fact. Then add entries for it in Software guide. This is the one open item most likely to make the docs look dishonest if it sits too long.
8. `index.mdx`'s "Project status" now frames the whole project as three stages: finish the live ISO (current focus) → build the installer → keep docs current as an ongoing commitment, not a stage with an end date. `development/roadmap.mdx` still describes things in the older "built / not started" checklist style and doesn't reflect this three-stage framing. Worth reconciling once the roadmap page gets touched again, so the two pages tell the same story.
9. Fill in `larch-dank-shell.mdx` and `larch-hyprland.mdx` once those variants actually exist (repo, screenshot, real package list). Once either does, `getting-started.mdx`'s single Download button needs to become a choice between variants.
