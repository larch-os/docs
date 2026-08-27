import { Hero } from '@/components/home/hero';
import { Screenshot } from '@/components/home/screenshot';
import { Pitch } from '@/components/home/pitch';
import { Status } from '@/components/home/status';
import { Footer } from '@/components/home/footer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Screenshot />
      <Pitch />
      <Status />
      <Footer />
    </main>
  );
}
