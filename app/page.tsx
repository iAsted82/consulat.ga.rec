import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Services } from '@/components/sections/services';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/layout/header';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}