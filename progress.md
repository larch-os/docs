# Progress — Larch Docs

Running log of completed work, decisions, and next steps. Update after each significant change.

## 2026-08-27 — Initial scaffold

- Created `CLAUDE.md` (project guidance for Claude Code / OpenCode plugin) — documents stack (Next.js 16.3.2 + Fumadocs + Tailwind 4 + Bun), commands (`bun run dev/build/lint/types:check`), directory layout, Fumadocs conventions, content guidelines, placeholders/TODOs, code style, and workflow.
- Created `plans/` directory with `plans/README.md` template for per-feature planning.
- Created `progress.md` (this file) to track ongoing work.

### Stack verified
- `package.json:2` name `docs` v0.0.20, Next 16.3.2, React 19, fumadocs-core 16.15.2
- `src/lib/source.ts:7` uses `defineDocs({ dir: 'content/docs' })` / `fumadocs-mdx/macro`
- `src/lib/shared.ts:13` `downloadUrl` placeholder `https://cdn.larch-os.dev/larch-latest.iso`
- `proxy.ts` handles `/docs/*` ↔ `/llms.mdx/docs/*/content.md` negotiation

### Known IOUs (from CONTENT_PLAN.md)
- `getting-started.mdx` Download section — no release process yet
- `software-guide/noctalia.mdx` — blocked on official demo video
- `iso-variants/larch-dank-shell.mdx`, `larch-hyprland.mdx` — variants don't exist
- `user-guide/power-management.mdx` describes swayidle setup not yet shipped
- `packages.x86_64` only has vim/nano/tmux vs docs claiming dev tooling (docs-first sequencing)
- `public/images/desktop-screenshot.png` personal wallpaper decision pending
- No `LICENSE` file

### Next steps
- See `CONTENT_PLAN.md:89` for prioritized next steps (noctalia video, release process, installer, power management, dev tooling, roadmap reconciliation).
- Run `bun run build` after any MDX/content change to validate.

## 2026-08-27 — Add DESIGN.md as canonical design system

- Added `DESIGN.md:1` (`version: alpha`, `name: Together AI-design-analysis`) — inspired interpretation of Together AI: near-black `canvas-dark #010120` hero bands with three-color gradient chrome `accent-orange #fc4c02 → accent-magenta #ef2cc1 → accent-periwinkle #bdbbff` alternating with white `canvas` bands, dual typefaces `The Future` (Inter fallback) + `PP Neue Montreal Mono`.
- Documented in `CLAUDE.md:82` as **Design System — `DESIGN.md` (canonical for all UI)** — mandatory for every UI change: tokens (colors `DESIGN.md:6`, typography `DESIGN.md:21`, spacing `DESIGN.md:112`, radii `DESIGN.md:105`, layout `DESIGN.md:414`, elevation `DESIGN.md:462`), component primitives `DESIGN.md:126` (nav, buttons, hero/research bands, cards, data-table, footer + 10× `ex-*` examples `DESIGN.md:267`), and Do/Don't rules (`DESIGN.md:618` / `DESIGN.md:626`). Workflow: cite tokens per PR; extend `DESIGN.md` first if variant missing — no ad-hoc hardcoding.

## 2026-08-27 — Document Larch significance in CLAUDE.md

- Read all `content/docs/**/*.mdx` (11 pages: `index`, `getting-started`, `iso-variants/*`, `software-guide/*`, `user-guide/*`, `package-management`, `known-issues`, `development/*`) + `CONTENT_PLAN.md`.
- Added `CLAUDE.md:14` **What Larch Is — Significance** section sourced from `content/docs/index.mdx:6`, `architecture.mdx:1`, `roadmap.mdx:1` etc.:
  - Tagline `index.mdx:10` "Arch based linux distro for lazy yet power users" — audience, lazy vs power meaning.
  - Problem/solution: tiling WM weekend config → niri pre-wired vim-flavored bindings `keyboard-shortcuts.mdx:8`.
  - Curated stack: niri scrollable-tiling `niri.mdx:6`, noctalia `extra` v5 TOML (future DankMaterialShell/Hyprland placeholders), kitty+zsh+oh-my-zsh+eza/fzf/zoxide `shell-and-terminal.mdx:10`, NetworkManager `networking.mdx:6`, swayidle power chain `power-management.mdx:7` (docs-first IOU), stock Arch repos `package-management.mdx:6`.
  - Boot flow `getting-started.mdx:16` (SDDM→larch→niri+noctalia, stateless, no password, GPU render node `testing-in-a-vm.mdx:9`), KDE theming tradeoff `known-issues.mdx:6`.
  - Architecture `architecture.mdx:9` (archiso releng fork, skel+profiles as single source, oh-my-zsh submodule, `mkarchiso` `work/` gotcha `building-the-iso.mdx:32`).
  - Three stages `index.mdx:14` (live ISO → installer TUI Go+bubbletea design `roadmap.mdx:18` → docs evergreen), live-boot-only until installer exists.
  - Docs-work significance: real content sourced from live config, target-state docs intentional per `CONTENT_PLAN.md:58-62` IOUs.

## 2026-08-27 — Freeze homepage anime.js plan

- Frozen `plans/2026-08-27-larch-homepage-fancy-animejs.md` — Larch OS (not docs) fancy homepage: 10 bands (nav → hero 50/50 + ribbon + niri strip → screenshot clipPath → pitch → stack 6 cards → keys interactive → variants 3-up → status timeline pulsing → install CTA → footer stencil `LARCH`), using DESIGN.md tokens strictly (`canvas-dark #010120`, gradient `orange→magenta→periwinkle` only at hero scale, mono eyebrows, `sm 4px`) + Hypr.land tiling proof + Together AI dual-surface discipline. Anime.js via `createScope`/`stagger`/`timeline` + IntersectionObserver 0.25 once + `prefers-reduced-motion` guard. Build steps: `animejs` install, hooks, `@theme` + `Inter`/`JetBrains_Mono` font swap, 7 new components + refactors.

## 2026-08-27 — Fix hero clutter + blue palette from logo (DESIGN.md)

- Hero eyebrow was cluttered `Larch — Arch for lazy yet power users · niri` — simplified to `Niri · scrollable tiling` `hero.tsx:129` (`rounded-full`, `tracking 0.12em`, dot `#0060e0`), removed redundant tagline already in headline. Stripe and `power` gradient remapped from warm `orange→magenta` to logo blues `blue #0060e0 → sky #3b82f6 → periwinkle #bdbbff` (`global.css:5` `@theme`, `hero.tsx:154` `from-[#0060e0]`, `hero-ribbon.tsx:10` stops). Analyzed `public/images/logo.png` crop dominant `#0060e0` (0,96,224) 40125 px, #0080e0 34625 px, avg #154287.
- Updated `DESIGN.md:6` colors to logo blues (`accent-blue #0060e0`, `accent-sky #3b82f6`, `periwinkle #bdbbff`, legacy aliases `accent-orange`→`#0060e0` etc.) + `DESIGN.md:352` Brand Blue/Sky + `DESIGN.md:373` gradient `blue→sky→periwinkle` + `DESIGN.md:336` overview remapped. Updated `CLAUDE.md:118` to note Larch blue remapping.
- Fixed palette drift in components: `keys.tsx:87` `#ef2cc1`→`#3b82f6`, `keys.tsx:110` `#fc4c02`→`#0060e0`, `status.tsx:123` `#fc4c02`→`#0060e0`, `variants.tsx:80-86` dots to `0060e0/3b82f6/bdbbff` progression.
- Verified: eyebrow now `NIRI · SCROLLABLE TILING` clean, gradient `linear-gradient(to right, rgb(0,96,224) → rgb(59,130,246))` in screenshot `/tmp/larch-blue.png:315K`, `Viewport 1280x900` hero visible, `bun run build` ✓.

## 2026-08-27 — Execute fancy homepage (anime.js)

- Installed `animejs@4.5.0` (`bun add animejs`), tokens mapped in `src/app/global.css:3` (`@theme` primary/canvas-dark/accent-*/radius/spacing) + `src/app/layout.tsx:3` `Inter`/`JetBrains_Mono` vars (replaced `Space_Grotesk`/`Instrument_Serif`), `gradient-brand` fixed `DESIGN.md:373`.
- Created `src/hooks/use-anime.ts:1` + `use-intersection.ts:1` (reduced-motion guard, scope cleanup).
- Built `src/components/home/hero-ribbon.tsx:1` SVG ribbon 3× blob morph + drift (9s inOutSine loop, hairline outline) + `niri-strip.tsx:1` infinite horizontal tile track (12 tiles doubled, `translateX -50%` 22s linear, vignette `canvas-dark`), wired into `hero.tsx:1` (`hero-band-dark` `canvas-dark #010120` `section 80px` `3xl 32px`, eyebrow `mono-caps-eyebrow 11/0.55`, headline `display-xxl 64/-1.92` stagger 70ms, stripe `scaleX`, CTA stagger 80ms `mono-caps-button` black/mint/ghost `sm 4px`, badge `surface-dark-soft`/`white`).
- Rebuilt `screenshot.tsx:1` (`code-editor-mockup` chrome `canvas-dark` `mono-caption`, `clipPath` + scale reveal 720ms, `hairline` card `sm 4px`), `pitch.tsx:1` dark `research-band-dark` (eyebrow/headline/stagger 90ms paras, stripe, `Lazy/Power` tinted cards), `stack.tsx:1` white 3-up→1-up `research-card`/`stats-card-tinted` 6 distro cards `stagger 74ms` + tilt hover, `keys.tsx:1` dark interactive ( `toggle-pill-group` category pills, `DemoStage` strip preview with `consume→`/`Active`, auto-cycle 1300ms, row `bg-[#c8f6f9]/55` highlight, table `mono-caps-eyebrow` header, Link fix), `variants.tsx:1` white 3-up (featured `ink` dark `ex-pricing-tier-featured` + 2 ghost `hairline` cards), `status.tsx:1` dark timeline (hairline `scaleX` line, pulsing `active` dot `scale 1.14` 1.1s loop, stagger 90ms), `install-cta.tsx:1` white hairline cta (terminal `zsh — kitty` mock `#010120` `mono-caption`), `footer.tsx:1` (`footer` 4-col `mono-caps-eyebrow` + `body-md` + `footer-wordmark-banner` stencil) + `wordmark-banner.tsx:1` (`display-xxl` `hairline` tint `LARCH` stagger 54ms).
- Updated `src/app/(home)/page.tsx:1` to `Hero→Screenshot→Pitch→Stack→Keys→Variants→Status→InstallCta→Footer` (10 bands, Larch OS distro-first, docs tertiary).
- Verified: `bun run build` ✓ (10 pages, 1807ms, 57 static), `bun run types:check` ✓, `bun run lint` ✓ (fixed `a→Link` + any cast).

---

## Log

_Add entries newest-first: date, what changed, why, and verification (e.g. `bun run build` pass/fail)._
