import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-dvh bg-slate-950 font-sans text-slate-50 antialiased">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
