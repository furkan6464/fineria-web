import { Hero } from '@/components/Hero';
import { TickerBar } from '@/components/TickerBar';
import { Features } from '@/components/Features';
import { PlatformShowcase } from '@/components/PlatformShowcase';
import { Dashboard } from '@/components/Dashboard';
import { MobileShowcase } from '@/components/MobileShowcase';
import { Security } from '@/components/Security';
import { HowItWorks } from '@/components/HowItWorks';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <TickerBar />
      <Features />
      <PlatformShowcase />
      <Dashboard />
      <MobileShowcase />
      <Security />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
