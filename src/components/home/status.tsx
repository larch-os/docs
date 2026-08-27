import Link from 'next/link';

const stages = [
  {
    n: '01',
    title: 'A finished live ISO',
    body: 'Every tool and setting the distro promises actually present, so booting it is the real experience, not a preview of one.',
    status: 'In progress',
    active: true,
  },
  {
    n: '02',
    title: 'An installer',
    body: "Turns the live session into an installed system. Design exists, no code yet.",
    status: 'Not started',
    active: false,
  },
  {
    n: '03',
    title: 'Docs kept current',
    body: 'Not a stage with an end date, an ongoing commitment as the first two stages change.',
    status: 'Ongoing',
    active: false,
  },
];

export function Status() {
  return (
    <section className="border-b border-fd-border px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-fd-foreground">
          Where things stand
        </h2>
        <p className="mt-2 text-fd-muted-foreground">
          Larch is being built in three stages.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage.n}>
              <span className="font-[family-name:var(--font-display)] text-sm text-fd-muted-foreground/50">
                {stage.n}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-fd-foreground">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                {stage.body}
              </p>
              <span
                className={`mt-4 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                  stage.active
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-fd-muted text-fd-muted-foreground'
                }`}
              >
                {stage.status}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/docs"
          className="mt-10 inline-block text-sm font-medium text-fd-foreground underline underline-offset-4 hover:text-blue-400"
        >
          Read the full docs →
        </Link>
      </div>
    </section>
  );
}
