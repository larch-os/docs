# Docs content plan

Working notes on the documentation structure and what's real content versus outline. Not part of the published site, this file lives at the repo root so it doesn't get picked up as a page.

## Structure

One flat sidebar, ordered as a user journey with contributor content at the bottom (decided over a tabbed user/dev split, kept it simple).

```
content/docs/
  index.mdx                          Introduction
  getting-started.mdx                real content, incl. Download (real URL now, see below)
  iso-variants/
    larch-base.mdx                   real content, uses the same homepage screenshot
    larch-dank-shell.mdx             PLACEHOLDER - variant doesn't exist
    larch-hyprland.mdx               PLACEHOLDER - variant doesn't exist
  software-guide/
    niri.mdx                         real content
    noctalia.mdx                     OUTLINE
    shell-and-terminal.mdx           real content
    networking.mdx                   real content
    default-apps.mdx                 real content, chezmoi/pass/Pika Backup --
                                      the installer's own default package list
                                      (packages.conf's static try_install), not
                                      the netinstall extras page
    development-tools.mdx            real content, htop/btop/lazygit/paru/uv/
                                      k3d/kubectl/herdr -- base packages.x86_64
                                      now, live and installed alike (herdr moved
                                      here from default-apps.mdx, no longer
                                      install-time-only)
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

content/blog/                        separate collection, not under content/docs/ --
                                      see "Blog section" below
  first-public-iso.mdx                real content, the first post
```

Ordering is controlled by `meta.json`'s `pages` array in each folder (Fumadocs hides anything not listed there). No `root: true` tabs used, that's what a two-tab layout needs, not applicable here.

## What's still an outline, and why

- **`software-guide/noctalia.mdx`**: needs the same lean treatment niri got (GitHub link + their own official demo video, nothing else). Blocked on the video specifically: noctalia's repo has no demo video or screenshot anywhere (checked the README and searched beyond it), only third-party YouTube content, which isn't the same thing as an official upstream demo. Waiting on a real URL rather than substituting one.
- **`iso-variants/larch-dank-shell.mdx`** and **`iso-variants/larch-hyprland.mdx`**: neither variant exists, no repo, no packages, no screenshot. Pure placeholders, explicitly authorized as such rather than left unwritten, so the section's shape exists before the content does.

Everything else has real, sourced content pulled from `larch-base/README.md`, `larch-base/docs/session-context.md`, `larch-base/docs/arch-niri-distro-context.md`, and direct inspection of the actual config files in `archiso/releng/airootfs/`.

## ISO variants section

One page per variant, named after its future repo (`larch-base`, `larch-dank-shell`, `larch-hyprland`), matching the `larch-os` GitHub org's naming convention decided earlier this project (see [[project-larch-docs-site]] memory on the multi-variant architecture). Same structure on every page: status callout, screenshot, software list, repo link.

`larch-base.mdx` and the homepage both point at the same hero image URL (`github.com/user-attachments/assets/...`, from `larch-base`'s own README), one real screenshot, not two to keep in sync. Not a local file anymore, the old `/images/desktop-screenshot.png` was removed once nothing referenced it. That URL is a short-lived signed S3 redirect under the hood, `next.config.mjs`'s `images.remotePatterns` allows both `github.com` and `*.s3.amazonaws.com` so next/image can actually follow it.

`larch-hyprland.mdx` corrects the spelling from how it was requested ("larch-hyperland") to the actual project name, Hyprland. Also worth knowing: noctalia supports Hyprland natively (confirmed via web search, not assumed), so pairing Hyprland with noctalia instead of a different shell is plausible, the page says so rather than assuming a shell swap is required.

Once there's more than one real variant, `getting-started.mdx`'s Download section will need to point here instead of a single download button, it currently assumes one ISO.

## Blog section

New, separate from `content/docs/`: `content/blog/*.mdx`, a standalone `defineCollections({ type: 'doc', ... })` (not `defineDocs`, which is only for a docs+meta pair with a sidebar tree -- a blog is just a flat, date-sorted list, no tree needed). Schema (`src/lib/blog-source.ts`, zod, added as an explicit dependency since fumadocs-mdx only pulled it in transitively before): `title`, `description`, `date` (ISO string, sorted newest-first).

Routes live at `src/app/blog/` (`layout.tsx`, `page.tsx` for the list, `[slug]/page.tsx` for posts), using `HomeLayout` + `baseOptions()` like the homepage, not `DocsLayout` -- no sidebar tree makes sense for a blog. Post bodies render through `DocsBody` (a standalone prose-styled wrapper, doesn't need the full `DocsPage` context) for consistent typography with the rest of the site. "Blog" added to the shared nav `links` in `layout.shared.tsx`, visible from both the homepage and docs pages.

First post, `first-public-iso.mdx`: announces the first publicly downloadable ISO. Explicitly **not** the first official release -- that's a separate, named milestone ("Steady Kaizen", chosen by the project owner, not yet shipped). Keep this distinction accurate wherever the ISO or release status comes up; conflating "a build exists to download" with "we shipped v1" would overstate where the project actually is.

## User guide section

`installation-guide.mdx` walks through the Calamares flow one step at a time (welcome, language, keyboard, partitioning, account, extras, summary, installing, finished), one short paragraph per step, sourced from `settings.conf`'s actual `show` sequence in `larch-calamares`, not a general description. Linked from `getting-started.mdx`'s "Installing Larch" section, which stays the high-level summary; this page is the detail.

`keyboard-shortcuts.mdx` is sourced directly from `~/.config/niri/config.d/binds.kdl` (the real machine's config, already ported to the ISO verbatim, see [[project-larch-overview]]-adjacent memory on the niri config diff), organized into the categories the bindings actually fall into: launching, window management, workspace management, monitor management, screenshots, media/hardware keys, session.

`power-management.mdx` was rewritten to only describe the installed system's target power management (the real machine's dim → screen-off → suspend-then-hibernate swayidle setup, plus the sleep.conf/logind.conf settings it pairs with). Docs-first sequencing call: none of this is actually shipped in the live ISO yet (which still deliberately disables suspend/hibernate/lid-switch via `/etc/systemd/logind.conf.d/do-not-suspend.conf`, and spawns `swayidle -w` with zero config), the page just no longer says so. Don't let this drift either, it needs to become true, not stay aspirational.

There used to be a `user-guide/development-tools.mdx` (a pure outline page), removed entirely -- see "Software guide section" below for where that content actually landed, and note the filename got reused there for something unrelated to this old page.

## Software guide section

`default-apps.mdx` lost its `herdr` entry: that package moved from Calamares' install-time-only default list to `larch-base`'s `packages.x86_64` (a base package now, live and installed alike), alongside a batch of other dev/power-user tooling added the same day (`btop`, `htop`, `lazygit`, `kubectl`, `uv`, `paru-bin`, `k3d-bin`).

New `development-tools.mdx` documents all of that (plus `herdr`, moved here). This **resolves the long-standing IOU** tracked below in Next steps: `packages.x86_64` now backs up the homepage's and `index.mdx`'s "tuned for development work" pitch with real, present-tense packages, not an aspiration. Same lean per-tool treatment as the rest of Software guide: link + one factual sentence, no puffery.

(History: a `user-guide/development-tools.mdx` outline page existed once, was removed, and the idea moved to Software guide instead, one entry per piece of software rather than a separate "dev tools" page. At that point `packages.x86_64` still only had `vim`/`nano`/`tmux` -- a deliberate docs-first sequencing call, confirmed by the project owner. The gap is closed now, see above.)

## Development section

`architecture.mdx` was substantially rewritten: it used to describe a speculative `profiles/` tree (shell/WM choice at install time, copied into the new user's home) that was never built, and claimed `/etc/skel` held "base configs, always applied" -- flatly wrong once `/etc/skel` was reverted to plain Arch default (see `larch-base`'s own commit history for that reversal). Now describes the actual mechanism: `larch-postinstall` copies `/home/larch`'s dotfiles onto the installer-created user directly, then layers `install-overrides/` on top for the few things that have to differ post-install.

`roadmap.mdx` was substantially rewritten: it described a custom TUI installer (Go/`bubbletea`) as the plan, not yet built. That plan was abandoned in favor of a Calamares fork (`larch-calamares`), which is what actually shipped. The old TUI plan is kept in a collapsed `<details>` for history, not deleted outright, since it explains a real decision (why Calamares instead of building an installer from scratch). "Open decisions" trimmed to just the one still genuinely open (KDE theming); the shell/desktop-shell choice, launch mechanism, and login-flow items all resolved by simply not existing in what shipped (Calamares offers no such choice, launches via niri `spawn-at-startup`, SDDM autologin was decided long before this rewrite).

`index.mdx`'s "Project status" table also needed the same update (installer was listed "not built yet" there too) -- this and `roadmap.mdx` should always agree on installer status, they were drifting apart before this pass.

## Fumadocs conventions (for whoever touches this next)

- Pages live under `content/docs/`, one `.mdx` file per page, frontmatter needs `title` and `description`.
- Folders group pages into sidebar sections. A folder needs a `meta.json` with a `pages` array listing the filenames (no extension) in display order. Anything not listed is hidden from nav, even if the file exists.
- `meta.json` also takes `title` (display name for the group) and `icon`.
- `root: true` in a folder's `meta.json` turns it into a top-level tab instead of a nested sidebar group, not used here, noting it in case the flat sidebar ever needs splitting later.
- Default MDX components available: everything from `fumadocs-ui/mdx` (`Callout`, `Cards`/`Card`, code blocks with syntax highlighting, tables), plus one custom component: `<DownloadButton />` (`src/components/download-button.tsx`, registered in `src/components/mdx.tsx`). It pulls `downloadUrl` from `@/lib/shared`, same single source of truth the homepage uses.
- `defineDocs` (docs+meta pair, sidebar tree) vs `defineCollections({ type: 'doc' })` (a flat, standalone collection, no tree) are two different `fumadocs-mdx/macro` APIs. Use the latter for anything that isn't sidebar-navigated content, like the blog.
- `bun run build` catches MDX syntax errors and broken component references at build time, run it after any content change before calling a page done. It does not validate internal `[text](/docs/...)` links, those can dangle silently.

## Writing style

Every page here should pass the `unslop` skill (`~/.claude/skills/unslop/SKILL.md`, user-level, not registered in this repo): no AI-vocabulary, no puffery, active voice, sentence-case headings, no em dashes, callouts used for genuinely different content (warnings, TODOs) not as decoration.

## Homepage

`src/app/(home)/page.tsx` composes four sections from `src/components/home/`: `hero.tsx`, `screenshot.tsx`, `features.tsx`, `footer.tsx`. Built dark-first (the site's `RootProvider` defaults to dark regardless of OS preference, this isn't something the homepage components control), using `fd-*` semantic color tokens throughout so it still adapts correctly if a visitor toggles to light mode manually.

Assets live in `public/images/`: just `logo.png` now (copied from `larch/assets/logo.png`). The screenshot isn't a local asset, see the ISO variants section above.

Known placeholders:

- **Download button** (`src/lib/shared.ts`, `downloadUrl`) now points at a real, public GCS-hosted ISO. It's a dated filename, not a "latest" alias, no such redirect exists at that bucket yet -- update this constant by hand each time a new build gets published, until one does.
- No `LICENSE` file exists anywhere in the `larch` repo, so the footer doesn't link one. Worth adding regardless of the homepage.

## Next steps

Resolved this pass: installer documented as built (`getting-started.mdx`, `installation-guide.mdx`, `roadmap.mdx`, `index.mdx`'s Project status table all agree now), real dev/power-user tooling landed in `packages.x86_64` with `development-tools.mdx` to document it, homepage screenshot question settled, `architecture.mdx` no longer describes an abandoned design. Also this pass: real public download URL live, a Blog section shipped with its first post.

Still open:

1. Fill in `noctalia.mdx` once there's a real demo video URL for it (see above, blocked on that specifically now, not general detail).
2. The first official release, "Steady Kaizen", hasn't shipped -- when it does, `getting-started.mdx`'s preview-build callout and the blog post's framing both need updating to say so, and `roadmap.mdx`'s "Not built" list loses that line.
3. Revisit `known-issues.mdx`'s KDE theming section if that investigation resumes.
4. Whether a `LICENSE` file should exist.
5. Ship the swayidle config, sleep.conf, and logind.conf settings `user-guide/power-management.mdx` now describes as fact. Live ISO still disables suspend/hibernate/lid-switch entirely and runs swayidle with zero config.
6. Fill in `larch-dank-shell.mdx` and `larch-hyprland.mdx` once those variants actually exist (repo, screenshot, real package list). Once either does, `getting-started.mdx`'s single Download button needs to become a choice between variants.
7. A checksum/verification step and minimum specs (RAM, GPU requirements) for the Download section -- not added yet.
