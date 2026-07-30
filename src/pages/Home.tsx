import { Hero } from '@/components/Hero';
import { TickerBar } from '@/components/TickerBar';
import { Features } from '@/components/Features';
import { PlatformShowcase } from '@/components/PlatformShowcase';
import { MobileShowcase } from '@/components/MobileShowcase';
import { Security } from '@/components/Security';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <TickerBar />
      <Features />
      <PlatformShowcase />
      <MobileShowcase />
      <Security />
      <HowItWorks />
      <CTA />
    </>
  );
}
