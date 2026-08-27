# Larch OS Homepage — Fancy anime.js (frozen)

> Status: frozen 2026-08-27, ready to execute. Implements `CLAUDE.md:114` DESIGN.md as canonical, `CLAUDE.md:14` Larch significance, and sells **Larch OS (the distro)** not the docs site. Uses `animejs` for hero-to-footer choreography, Hypr.land tiling proof + Together AI dual-surface discipline.

## Context

- **Larch is Arch for lazy yet power users** `content/docs/index.mdx:10` — niri pre-wired with vim `H/J/K/L` + smart `Mod+J/K` + column consume/expel `content/docs/user-guide/keyboard-shortcuts.mdx:8`, `content/docs/software-guide/niri.mdx:6` infinite horizontal strip (video `niri.mdx:9`), noctalia `extra` v5 TOML `noctalia.mdx:6` (future dank/hyprland placeholders `larch-dank-shell.mdx:7`/`larch-hyprland.mdx:7`), kitty+zsh/oh-my-zsh+eza/fzf/zoxide `shell-and-terminal.mdx:10`, NetworkManager `networking.mdx:6`, swayidle `300s dim+lock →600s off →1800s suspend-then-hibernate` `power-management.mdx:7` (IOU `CONTENT_PLAN.md:58`), stock `core`/`extra` `package-management.mdx:6`.
- **Boot & caveats:** SDDM→`larch`→niri+noctalia dark + kitty/Firefox, stateless, `passwd` for SSH `getting-started.mdx:16`, needs `virtio-gpu`/`virgl`+SPICE GL+memfd `testing-in-a-vm.mdx:9` (black screen otherwise `known-issues.mdx:22`), KDE Dolphin theming tradeoff `known-issues.mdx:6`, placeholder `downloadUrl` `shared.ts:13`.
- **Roadmap 3 stages** `index.mdx:14`: 01 Live ISO (in progress), 02 Installer TUI Go+bubbletea `pkexec` `roadmap.mdx:18`, 03 Docs evergreen. Archiso `releng` fork, `airootfs/etc/skel`+future `profiles/` single source `architecture.mdx:32`, `mkarchiso` + `scripts/build-local-repo.sh` + `rm -rf work/` gotcha `building-the-iso.mdx:32`.
- **Inspirations:** Omarchy.org (opinionated mono hero, ASCII art), Hypr.land (animated columns/tiles behind hero proving compositor), Together AI `https://www.together.ai` (source of `DESIGN.md:1` — `canvas-dark #010120` ↔ `canvas #ffffff`, ribbon `orange #fc4c02→magenta #ef2cc1→periwinkle #bdbbff` fixed order `DESIGN.md:373`, two-face `The Future` + `PP Neue Montreal Mono` `DESIGN.md:21`).
- **Current homepage violation** `src/app/(home)/page.tsx:7` (`Hero→Screenshot→Pitch→Status→Footer`) uses `fd-*`, `blue-600`, `sky-400`, `rounded-xl/rounded-full`, `Instrument_Serif` `layout.tsx:15` — all replaced with DESIGN tokens.

## Goals

- Make `/` the most memorable surface: gradient ribbon morph + niri strip proof + stagger/pinned scroll + key-interaction, all `sm 4px` + hairline-only `DESIGN.md:462`, one black pill per viewport `DESIGN.md:618`.
- Stay honest about IOUs (power, dev tooling `CONTENT_PLAN.md:62` generic, variants placeholders).
- `bun run build` + `types:check` + `lint` pass, `prefers-reduced-motion` safe, performance `will-change: transform` only.

## Design Decisions (frozen)

- **D1 Narrative = distro first:** Primary CTA `DOWNLOAD ISO` `button-primary` black `mono-caps-button` `sm 4px` → `downloadUrl`; secondary `Explore the desktop` `button-secondary-mint/white`, tertiary `Docs →` `button-ghost-on-dark` — docs not hero-primary.
- **D2 Polarity = canvas-dark↔canvas alternation** `DESIGN.md:331` with `section 80px` rhythm `DESIGN.md:112`, container `1280px` gutters `3xl 32px`/`lg 16px` `DESIGN.md:414`.
- **D3 Hero = Hypr strip + Together ribbon combined:** Back layer niri strip (4 cols, 8-12 tiles) `translateX` loop 12s behind `hero-band-dark` `canvas-dark`; front ribbon three-stop blob morph `d`/`scale`/`translate` 9s loop, only at hero scale.
- **D4 Type = two-face strictly:** Display `Inter 400/500` (`The Future` fallback `DESIGN.md:408`) + mono `JetBrains Mono 500 uppercase 0.04em`, sentence-case headlines, mono all-caps only.
- **D5 Motion = anime.js scope/stagger/timeline + IntersectionObserver 0.25 once;** reduced-motion → opacity-only; SVG ribbon only vector morph.

## Sections (10, in order)

1. `nav-bar` `DESIGN.md:127` sticky `canvas-dark→canvas` on scroll, stagger `60ms`.
2. `hero-band-dark` `DESIGN.md:187` 50/50 — eyebrow `LARCH — ARCH FOR LAZY YET POWER USERS` `mono-caps-eyebrow 11/0.55`, headline *for lazy yet power users.* `display-xxl 64/-1.92` (italic *lazy* `The Future`), `body-lg` lead `index.mdx:8`, CTAs; strip + ribbon anime (`stagger 28ms`, `delay 180ms`).
3. `Screenshot` white `hairline` — `code-editor-mockup` `canvas-dark` chrome around `desktop-screenshot.png` `larch-base.mdx:10`, `clipPath` reveal + parallax.
4. `Pitch` dark `research-band-dark` `DESIGN.md:192` — `Skips the weekend.` `display-xl`, `body-lg` paras `index.mdx:6-10`, keyword glow.
5. `Stack` white 3-up→1-up `research-card/article-card/stats-card-tinted` `DESIGN.md:215` (`3xl 32px` mint tint) — 6 curated distro cards, `stagger 90ms` scroll + tilt.
6. `Keys` dark — `Keybindings you don't write.` `display-xl`, `toggle-pill-group` `DESIGN.md:251` categories, demo `Mod+J/K` smart switch + consume/expel with `scale 0.96→1` key pulse, keyboard-controllable `H/J/K/L`.
7. `Variants` white 3-up `ex-pricing-tier`/`ex-pricing-tier-featured` `DESIGN.md:267` — base featured `ink`/`on-primary`, two ghosts muted + `badge-neutral`.
8. `Status` dark timeline `research-band-dark` — 01/02/03 `mono-caps-eyebrow`, `display-md` titles, pulsing dot `scale [1,1.6] opacity loop`, hairline connector `strokeDashoffset` draw.
9. `Install CTA` dark mini hero — *Try it live.* + stateless/GPU note `getting-started.mdx:22`/`testing-in-a-vm.mdx:9`, `Download ISO` + `View VM guide` ghost.
10. `footer` `DESIGN.md:257` + `footer-wordmark-banner` `DESIGN.md:262` stencil `LARCH` `display-xxl` hairline tint, `stagger 40ms` draw.

## Build Steps

- [x] Add `animejs` (`bun add animejs`), hooks `useAnime`/`useIntersection` (reduced-motion guard, `createScope` cleanup).
- [ ] Map DESIGN tokens to `@theme` in `global.css` + `layout.tsx` fonts (`Inter` `var(--font-display)` + `JetBrains_Mono` `var(--font-mono)`), remove `Space_Grotesk`/`Instrument_Serif`.
- [ ] New components: `hero-ribbon.tsx`, `niri-strip.tsx`, `stack.tsx`, `keys.tsx`, `variants.tsx`, `install-cta.tsx`, `wordmark-banner.tsx`; refactor `hero/screenshot/pitch/status/footer.tsx`, `page.tsx`, `lib/cn`.
- [ ] Verify each band with `bun run build`/`lint`/`types:check`; manual checks: gradient fixed order, one black pill, mono eyebrows, `sm 4px`, reduced-motion, no fifth accent.

## Validation

- `bun run build` passes (MDX + components), `bun run types:check`, `bun run lint`.
- Visual audit: `DESIGN.md:373` ribbon, `618` one CTA, `623` `sm 4px` canonical, wordmark stencil `hairline`.
- A11y: `prefers-reduced-motion` snapshot, `tabIndex`/ARIA for keys demo.

## Open Picks (ask before final deploy if not chosen)

1. Wordmark `LARCH` vs `larch-os.dev` — decision at `footer-wordmark-banner`.
2. Hero secondary `Explore desktop` scroll vs `Watch niri demo` video — motion budget.
3. Keys controllable `H/J/K/L` input vs autoplay — complexity.
4. Strip loop uses real screenshot vs neutral mocks — wallpaper `CONTENT_PLAN.md:84` commitment.
