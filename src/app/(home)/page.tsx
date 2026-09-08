import { Hero } from '@/components/home/hero';
import { Pitch } from '@/components/home/pitch';
import { Footer } from '@/components/home/footer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Pitch />
      <Footer />
    </main>
  );
}
