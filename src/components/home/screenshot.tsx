import Image from 'next/image';

export function Screenshot() {
  return (
    <section className="border-b border-fd-border bg-fd-muted/30 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-fd-border shadow-2xl shadow-blue-950/20">
          <Image
            src="https://github.com/user-attachments/assets/3327db16-d57b-425b-ae0a-1ae75e4e80c3"
            alt="The Larch live desktop: niri with the noctalia panel running along the top"
            width={1920}
            height={1080}
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
