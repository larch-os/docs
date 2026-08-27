import { Hero } from '@/components/home/hero';
import { Screenshot } from '@/components/home/screenshot';
import { Pitch } from '@/components/home/pitch';
import { Stack } from '@/components/home/stack';
import { Keys } from '@/components/home/keys';
import { Variants } from '@/components/home/variants';
import { Status } from '@/components/home/status';
import { InstallCta } from '@/components/home/install-cta';
import { Footer } from '@/components/home/footer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Screenshot />
      <Pitch />
      <Stack />
      <Keys />
      <Variants />
      <Status />
      <InstallCta />
      <Footer />
    </main>
  );
}
