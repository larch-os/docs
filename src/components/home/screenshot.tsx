import Image from 'next/image';

export function Screenshot() {
  return (
    <section className="border-b border-fd-border bg-fd-muted/30 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-fd-border shadow-2xl shadow-blue-950/20">
          <Image
            src="/images/desktop-screenshot.png"
            alt="The Larch live desktop: niri with the noctalia panel running along the top"
            width={1360}
            height={768}
            className="w-full"
            priority={false}
          />
        </div>
        <p className="mt-4 text-center text-sm text-fd-muted-foreground">
          The live desktop, straight after boot: niri as the compositor, noctalia as the panel.
        </p>
      </div>
    </section>
  );
}
