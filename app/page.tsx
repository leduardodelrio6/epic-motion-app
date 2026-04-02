import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ValoresCards from '@/components/landing/ValoresCards';
import EstilosGrid from '@/components/landing/EstilosGrid';
import Nosotros from '@/components/landing/Nosotros';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValoresCards />
      <EstilosGrid />
      <Nosotros />
      <CTASection />
      <Footer />
    </main>
  );
}
