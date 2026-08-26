import { Hero } from '@/components/home/hero';
import { Screenshot } from '@/components/home/screenshot';
import { Features } from '@/components/home/features';
import { Footer } from '@/components/home/footer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Screenshot />
      <Features />
      <Footer />
    </main>
  );
}
