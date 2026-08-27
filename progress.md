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

---

## Log

_Add entries newest-first: date, what changed, why, and verification (e.g. `bun run build` pass/fail)._
