const features = [
  {
    title: 'niri',
    body: 'A scrollable-tiling Wayland compositor. Windows lay out on an infinite horizontal strip instead of stacking or splitting into fixed grids.',
  },
  {
    title: 'noctalia',
    body: 'A Quickshell-based panel, launcher, and system controls, running on top of niri. Official extra package, not an AUR fork.',
  },
  {
    title: 'Stock Arch repos',
    body: 'No custom package repo. core and extra only, with two AUR-only exceptions built into a local repo at ISO build time.',
  },
  {
    title: 'Live-boot-first',
    body: 'The ISO boots into the real desktop, not a rescue shell. Test your Wi-Fi, GPU, and trackpad before you install anything.',
  },
];

export function Features() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-fd-border p-6 transition-colors hover:border-blue-500/40"
            >
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-semibold text-fd-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
