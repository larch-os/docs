import Link from "next/link";
import { Boxes, SlidersHorizontal, Users, Zap } from "lucide-react";
import { Reveal } from "./reveal";
import {
  DefaultsGraphic,
  SpeedGraphic,
  TerminalGraphic,
  ToolingGraphic,
} from "./pitch-graphics";

const tags = {
  tooling: [
    "docker",
    "incus",
    "chromium",
    "node",
    "go",
    "bun",
    "k3d",
    "kubectl",
  ],
  defaults: ["chezmoi", "pass", "zsh", "herdr", "neovim"],
};

const points = [
  {
    n: "01",
    icon: Users,
    title: "Purpose-built for developers",
    body: "Who want a system with all necessary tooling and setup.",
    graphic: TerminalGraphic,
    extra: undefined,
  },
  {
    n: "02",
    icon: Boxes,
    title: "Comes preinstalled with the tools you use.",
    body: "Docker by default. Enable Incus for VMs support. Preintegrated programming language toolchain. k3d and kubectl are already there for local Kubernetes. and many more.",
    graphic: ToolingGraphic,
    extra: (
      <>
        <TagRow tags={tags.tooling} />
        <Link
          href="/docs/user-guide/installation-guide"
          className="text-sm font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300"
        >
          See Full install-time checklist in the docs →
        </Link>
      </>
    ),
  },
  {
    n: "03",
    icon: SlidersHorizontal,
    title: "Defaults picked by developers, for developers",
    body: "Every tool and software comes from real trial and error. Kept because it works, not because it shipped first. For example",
    graphic: DefaultsGraphic,
    extra: <TagRow tags={tags.defaults} />,
  },
  {
    n: "04",
    icon: Zap,
    title: "No post install setup required",
    body: "Keybindings, layout, dark theme: all ready before you boot it. You start working, not setting up a system.",
    graphic: SpeedGraphic,
    extra: undefined,
  },
] as const;

export function Pitch() {
  return (
    <>
      {points.map((point, i) => (
        <PitchSection key={point.n} point={point} reversed={i % 2 === 1} />
      ))}
    </>
  );
}

function PitchSection({
  point,
  reversed,
}: {
  point: (typeof points)[number];
  reversed: boolean;
}) {
  const Icon = point.icon;
  const Graphic = point.graphic;

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden border-b border-fd-border px-6 py-20 font-(family-name:--font-swiss) sm:py-28">
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-(family-name:--font-display) text-[28vw] leading-none font-bold text-fd-foreground/3 sm:text-[22vw] ${
          reversed ? "right-0" : "left-0"
        }`}
      >
        {point.n}
      </span>

      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-10 lg:gap-16 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex w-full flex-1 flex-col gap-5 text-center md:text-left">
          <Reveal direction={reversed ? "right" : "left"}>
            <div
              className={`flex items-center gap-3 justify-center md:justify-start`}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-fd-border text-blue-400 sm:size-12">
                <Icon className="size-5" />
              </div>
              <span className="font-(family-name:--font-technical) text-xs tracking-[0.2em] text-fd-muted-foreground/70 uppercase">
                {point.n} · Larch
              </span>
            </div>
          </Reveal>

          <Reveal direction={reversed ? "right" : "left"} delay={80}>
            <h2 className="text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl lg:text-5xl">
              {point.title}
            </h2>
          </Reveal>

          <Reveal direction={reversed ? "right" : "left"} delay={160}>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-fd-muted-foreground sm:text-lg md:mx-0">
              {point.body}
            </p>
          </Reveal>

          {point.extra && (
            <Reveal direction={reversed ? "right" : "left"} delay={240}>
              <div className="flex flex-col items-center gap-4 md:items-start">
                {point.extra}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal
          direction={reversed ? "left" : "right"}
          duration={600}
          className="flex w-full flex-1 items-center justify-center"
        >
          <Graphic />
        </Reveal>
      </div>
    </section>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-fd-border px-3 py-1 font-(family-name:--font-technical) text-xs text-fd-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
