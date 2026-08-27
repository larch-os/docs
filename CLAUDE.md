# CLAUDE.md — Larch Docs

This file provides guidance to Claude Code and OpenCode (via `opencode-claude-code-plugin`) when working with this repository.

## Project Overview

Larch docs site — public documentation for Larch OS (Arch-based distro with niri). Built with **Fumadocs + Next.js**. Content is MDX under `content/docs/`, rendered via Fumadocs headless source API.

- Org: `larch-os` / Repo for ISO: `larch-base` on GitHub
- Stack: Next.js 16.3.2, React 19, Fumadocs (core 16.15.2 / mdx 15.3.1 / base-ui 16.15.2), Tailwind 4, TypeScript 6, Bun
- Package manager: **bun** (`bun.lock` present) — prefer `bun run` over npm
- Deployment: Next.js app, `next build` must pass

## What Larch Is — Significance (from `content/docs/`)

> Source: `content/docs/index.mdx:6`, `content/docs/development/architecture.mdx:1`, `content/docs/development/roadmap.mdx:1` + all `content/docs/**/*.mdx`

**Tagline & audience `content/docs/index.mdx:10`:** Larch is *"Arch based linux distro for lazy yet power users"* — built for developers and engineers who take their setup seriously. "Lazy" means you don't hand-roll a tiling-WM config over a weekend before it becomes usable; "power user" means the stack isn't generic defaults but the best-suited tools for jobs developers do every day.

**Problem it solves:** Tiling window managers like niri are fast once configured, but normally require writing keybindings, layout rules, and window behavior from scratch. Larch *"skips the weekend"* (`content/docs/index.mdx:8`): niri ships with real keybindings, sane layout defaults, dark theme, and complete vim-flavored bindings already wired in (`content/docs/user-guide/keyboard-shortcuts.mdx:8` — `H/J/K/L`, `Mod+J/K` smarter workspace switch, column/consume/expel, monitor management), so booting the live ISO is the real experience, not a preview.

**What it ships (curated, not generic) `content/docs/iso-variants/larch-base.mdx:6` + `content/docs/software-guide/*.mdx`:**
- **Compositor:** niri — scrollable-tiling Wayland compositor on an infinite horizontal strip (`content/docs/software-guide/niri.mdx:6`, video demo `content/docs/software-guide/niri.mdx:9`), not stacking/fixed-grid.
- **Shell:** noctalia (Quickshell-based panel/launcher/notifications, official `extra` v5 TOML) on top of niri (`content/docs/software-guide/noctalia.mdx:6`); future variants swap it for DankMaterialShell or Hyprland (`content/docs/iso-variants/larch-dank-shell.mdx:7`, `larch-hyprland.mdx:7` — both placeholders, no repo/ISO yet).
- **Terminal/shell:** kitty + zsh + oh-my-zsh (robbyrussell, autosuggestions, syntax-highlighting, fzf-tab) + eza/fzf/zoxide (`content/docs/software-guide/shell-and-terminal.mdx:10`).
- **Networking:** NetworkManager, not systemd-networkd/iwd (`content/docs/software-guide/networking.mdx:6`).
- **Power:** swayidle → dim+lock (5m) → display off (10m) → suspend-then-hibernate (30m) + sleep.conf/logind.conf hibernate policy (`content/docs/user-guide/power-management.mdx:7`) — docs-first IOU: live ISO still disables suspend (`do-not-suspend.conf`, swayidle `-w` with zero config) per `CONTENT_PLAN.md:58`.
- **Package management:** Stock Arch `core`/`extra`, no custom Larch repo — `pacman -S/-Syu` and AUR work as on vanilla Arch (`content/docs/package-management.mdx:6`). Dev tooling claim in `index.mdx`/homepage is also docs-first: `packages.x86_64` still only has vim/nano/tmux (`CONTENT_PLAN.md:62`).

**How it boots `content/docs/getting-started.mdx:16`:** Live ISO → SDDM autologin → `larch` user → niri+noctalia dark theme + kitty + Firefox, display auto-detect, stateless (no persistence), `larch` has no password (`passwd` for SSH). Requires real GPU render node — plain `virtio-vga`/QXL shows black screen forever; needs `virtio-gpu` virgl + SPICE GL + memfd shared memory (`content/docs/development/testing-in-a-vm.mdx:9` + `content/docs/known-issues.mdx:22`). KDE apps like Dolphin don't honor dark theme without full Plasma stack (`content/docs/known-issues.mdx:6` — open tradeoff vs keeping niri).

**Why it matters / architectural choices `content/docs/development/architecture.mdx:9`:**
- Fork of archiso `releng` profile — customization via ISO build config + future installer + post-install provisioning, not a custom package repo.
- Live session config (`airootfs/etc/skel/` + future `profiles/shell/{fish,zsh}/wm-shell/{noctalia,dank}/`) is the single source of truth — installer will copy the chosen profile into the new user's home during `arch-chroot` (`content/docs/development/architecture.mdx:32`). oh-my-zsh is a git submodule scoped to live user, not `/etc/skel` (`content/docs/development/architecture.mdx:38`).
- Build via `mkarchiso` with local AUR repo (`scripts/build-local-repo.sh` for `sddm-silent-theme`/`redhat-fonts`), gotcha: stale `work/` markers silently skip airootfs copy — clean rebuild with `rm -rf work/` is the reliable fix (`content/docs/development/building-the-iso.mdx:32`).

**Project status — three stages `content/docs/index.mdx:14`:**
1. **Finished live ISO** — current focus, boots & autologins but tooling/setup still being filled in.
2. **Installer** — not built; design is custom TUI (Go+bubbletea likely), `pkexec` disk ops, flow: welcome → preflight (UEFI/BIOS, internet) → disk (auto erase vs manual) → system basics (hostname/timezone/locale) → custom choice (shell/desktop-shell) → summary/progress/done, tray SNI + niri `spawn-at-startup` (`content/docs/development/roadmap.mdx:18`).
3. **Docs kept current** — ongoing commitment, not an end date.

Until installer exists, Larch is live-boot-only (`content/docs/index.mdx:28`, `content/docs/getting-started.mdx:27`).

**Significance for docs work:** Every page with real content is sourced from `larch-base/README.md`, `session-context.md`, and live `archiso/releng/airootfs/` config (`CONTENT_PLAN.md:42`). The docs intentionally describe target state as shipped (power management, dev tooling) — the TODO is to make it true, not rewrite the docs to sound less complete. See `CONTENT_PLAN.md:58-62` live IOUs.

## Essential Commands

```bash
bun run dev          # dev server at http://localhost:3000
bun run build        # production build — catches MDX syntax + component errors
bun run lint         # eslint (next/core-web-vitals)
bun run types:check  # next typegen && tsc --noEmit
```

Always run `bun run build` after content changes — it validates MDX syntax and component references. It does **not** validate internal `[text](/docs/...)` links (can dangle silently).

## Directory Structure

```
content/docs/                  # all MDX pages — one .mdx per page, needs title+description frontmatter
  index.mdx, getting-started.mdx, etc.
  iso-variants/ larch-base.mdx, larch-dank-shell.mdx, larch-hyprland.mdx
  software-guide/ niri.mdx, noctalia.mdx, etc.
  user-guide/ keyboard-shortcuts.mdx, power-management.mdx
  development/ architecture.mdx, building-the-iso.mdx, etc.
  meta.json                    # per-folder — pages[] controls sidebar order; unlisted files are hidden
src/
  app/(home)/page.tsx         # landing page — composes hero, screenshot, features, footer
  app/docs/                   # docs layout/pages
  app/api/search/route.ts    # search handler
  app/og/  app/llms.*         # OG images / LLM text endpoints
  components/home/           # hero.tsx, screenshot.tsx, features.tsx, footer.tsx
  components/mdx.tsx         # MDX component map (registers <DownloadButton />)
  components/download-button.tsx
  lib/source.ts              # loader() + defineDocs({ dir: 'content/docs' }) — Fumadocs source adapter
  lib/layout.shared.tsx      # shared layout options
  lib/shared.ts              # single source of truth: downloadUrl, docsRoute, gitConfig
  lib/cn.ts
public/images/               # logo.png, desktop-screenshot.png
```

Single flat sidebar — no `root: true` tabs. Ordering via `meta.json:pages` in each folder.

## Fumadocs Conventions

- `lib/source.ts:7` uses `defineDocs({ dir: 'content/docs' })` with `fumadocs-mdx/macro` — see https://fumadocs.dev/docs/mdx/macro
- Available MDX components: `fumadocs-ui/mdx` (`Callout`, `Cards`/`Card`, code blocks, tables) + custom `<DownloadButton />` (pulls `downloadUrl` from `src/lib/shared.ts:13`)
- Every page must have `title` + `description` frontmatter
- `proxy.ts` handles markdown negotiation (`/docs/*` ↔ `/llms.mdx/docs/*/content.md`)

## Content Guidelines

Extracted from `CONTENT_PLAN.md` — read that file for full detail on what's real vs outline.

- **Writing style**: active voice, sentence-case headings, no em dashes, no AI puffery. Callouts only for warnings/TODOs, not decoration. Reference: `unslop` skill
- **Real content** (sourced from `larch-base/README.md`, `session-context.md`, live config): `getting-started.mdx` (except Download section), `larch-base.mdx`, `niri.mdx`, `shell-and-terminal.mdx`, `networking.mdx`, `keyboard-shortcuts.mdx`, `package-management.mdx`, `known-issues.mdx`, `architecture.mdx`, `building-the-iso.mdx`, `testing-in-a-vm.mdx`, `roadmap.mdx`
- **Outlines/placeholders**: `software-guide/noctalia.mdx` (blocked on official demo video), `iso-variants/larch-dank-shell.mdx`, `iso-variants/larch-hyprland.mdx` (variants don't exist yet), `getting-started.mdx` Download section
- **Docs-first IOUs** (described as shipped but not yet true — don't let drift): `user-guide/power-management.mdx` (swayidle/sleep.conf), dev tooling claim in `index.mdx`/homepage vs `packages.x86_64` only having vim/nano/tmux

## Known Placeholders / TODOs

- `src/lib/shared.ts:13` — `downloadUrl = 'https://cdn.larch-os.dev/larch-latest.iso'` — placeholder, replace when ISO hosting (likely GitHub Releases) is live. Single source for homepage + `<DownloadButton />`
- `public/images/desktop-screenshot.png` — real `grim` capture but personal wallpaper; deliberate decision needed on permanent choice
- No `LICENSE` file in larch repo — footer doesn't link one
- `src/app/(home)` defaults to dark via `RootProvider` — not homepage-controlled, uses `fd-*` semantic tokens for light-mode toggle

## Code Style

- TypeScript strict, `reactStrictMode: true` (`next.config.mjs:7`)
- Path alias `@/*` → `./src/*` (`tsconfig.json:20`)
- Tailwind semantic tokens `fd-*` for theming (legacy) — new UI must use `DESIGN.md` tokens below
- ESLint: `eslint-config-next/core-web-vitals`, ignores `.next/`, `.source/` (`eslint.config.mjs:8`)

## Design System — `DESIGN.md` (canonical for all UI)

> **Single source of truth for every design:** `DESIGN.md:1` (`version: alpha`, `name: Together AI-design-analysis`). Read it before any UI work — do not invent colors, radii, spacing, or typography outside it.

**What it is:** Inspired interpretation of Together AI's design language — near-black hero bands (`#010120`) with a single three-color gradient chrome (orange → magenta → periwinkle) alternating with bright white research/pricing/docs bands, knit by a custom display sans + uppercase mono eyebrow.

**Tokens (use verbatim, no substitutions):**

- **Colors `DESIGN.md:6`** — `primary #000000` / `on-primary #ffffff`, `canvas #ffffff` / `canvas-dark #010120` / `surface-dark-soft #313641`, `ink #000000` / `body #959494` / `hairline #959494`, `accent-orange #fc4c02` / `accent-magenta #ef2cc1` / `accent-periwinkle #bdbbff` / `accent-mint #c8f6f9`. Gradient is fixed order `accent-orange → accent-magenta → accent-periwinkle` — never cropped to one color, never reordered, never 4th stop (`DESIGN.md:373`).
- **Typography `DESIGN.md:21`** — Two faces only: `The Future` (Inter fallback) for all headlines/body at weights 400/500 with negative tracking (`display-xxl 64px/70.4px/-1.92px` down to `body-md 16px/20.8px/-0.16px`), and `PP Neue Montreal Mono` for every eyebrow/button/table-header (`mono-caps-eyebrow 11px/500/0.55px`, `mono-caps-button 16px/500/0.08px`, `mono-caption 10px/400`). Headlines sentence-case; all-caps belongs ONLY to mono (`DESIGN.md:403`).
- **Spacing `DESIGN.md:112`** — 4px base: `xxs 2px` `xs 4px` `sm 8px` `md 12px` `lg 16px` `xl 20px` `2xl 24px` `3xl 32px` `4xl 44px` `5xl 48px` `6xl 55.2px` `section 80px`. Sections use `section 80px`; cards use `2xl 24px` (research/testimonial) or `3xl 32px` (stats).
- **Radii `DESIGN.md:105`** — `none 0px` (hero bands), `xs 3.25px` (pricing sub-tabs), `sm 4px` (canonical — every button/card/badge), `md 8px` (feature pills), `full 9999px` (only `button-icon-circular` chat orb).
- **Layout `DESIGN.md:414`** — max container 1280px, gutters `3xl 32px` desktop / `lg 16px` mobile, breakpoints `<479 / 479-767 / 768-991 / 992-1279 / >=1280`. Grids: research/testimonial 3-up→1-up, article 2-up→1-up, hero 50/50→stacked.
- **Elevation `DESIGN.md:462`** — hairline borders only (`hairline` on light, `surface-dark-soft` on dark); no soft shadows except chat orb (`rgba(1,1,32,0.1) 0 4px 10px`). Depth comes from `canvas-dark ↔ canvas` alternation.

**Component primitives `DESIGN.md:126`** — use as specified, no ad-hoc variants:

| Primitive | Key props |
|-----------|-----------|
| `nav-bar` / `nav-link` | `canvas-dark`/`on-dark`, `body-md`, `lg/3xl` padding |
| `button-primary` / `button-secondary-mint` / `button-secondary-white` / `button-ghost-on-dark` / `button-outline` / `button-icon-circular` | black/mint/white fills, `mono-caps-button`, `sm` or `xs` radius |
| `hero-band-dark` / `research-band-dark` | `canvas-dark`/`on-dark`, `display-xxl`/`display-xl`, `section/3xl` padding |
| `research-card` / `testimonial-card` / `article-card` / `code-editor-mockup` / `stats-card-tinted` | dark/light/mint surfaces, `surface-dark-soft` or `hairline` borders, `sm` radius |
| `data-table-header` / `data-table-row` / `toggle-pill-group` / `badge-neutral` | mono eyebrows, hairline dividers, `xs`/`sm` |
| `footer` / `footer-wordmark-banner` | `display-xxl` stencil wordmark tinted `hairline` |
| `ex-*` (10 examples) `DESIGN.md:267` | `ex-pricing-tier`, `ex-pricing-tier-featured`, `ex-product-selector`, `ex-cart-drawer`, `ex-app-shell-row`, `ex-data-table-cell`, `ex-auth-form-card`, `ex-modal-card`, `ex-empty-state-card`, `ex-toast` — mirror brand primitives |

**Rules — enforce on every PR:**

- Do: one black `primary` CTA per viewport, every eyebrow/button in mono-caps uppercase, gradient at hero-scale only, alternate `canvas-dark → canvas` bands, canonical `sm 4px` radius, stencil `together.ai` wordmark in `display-xxl`/`hairline` at page bottom (`DESIGN.md:618`).
- Don't: add 5th accent, set paragraphs in mono, center body under left headlines, add drop shadows to light cards, pill-shape primary buttons (`full`), headline in mono all-caps, or mutate gradient (`DESIGN.md:626`).
- Font substitutes if `The Future`/`PP Neue Montreal Mono` unavailable: `Inter 400/500` (tighten tracking ~0.6%) and `JetBrains Mono`/`Geist Mono 500` uppercase `0.04em` (`DESIGN.md:408`).

**Workflow:** Any new page/component/layout must cite the `DESIGN.md` token(s) used. If a required variant doesn't exist, extend `DESIGN.md` first rather than hardcoding values.

## Plans and Progress

- `plans/` — per-feature plan files (one markdown per task/feature)
- `progress.md` — running log of completed work, decisions, and next steps — update after each significant change
- `CONTENT_PLAN.md` — canonical notes on docs structure and outline status (not published, repo-root only)

## Workflow

1. For new features/fixes: check `progress.md` and `plans/` for context, create a plan in `plans/` if non-trivial
2. Edit MDX under `content/docs/` or components under `src/`
3. Run `bun run build` to validate — fix MDX/component errors before considering done
4. Update `progress.md` with what changed and why
5. Keep `CONTENT_PLAN.md` in sync if structure/outline status changes
