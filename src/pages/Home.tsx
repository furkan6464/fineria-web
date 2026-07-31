import { lazy, Suspense } from 'react';
import { Hero } from '@/components/Hero';

const TickerBar = lazy(() => import('@/components/TickerBar').then((m) => ({ default: m.TickerBar })));
const Features = lazy(() => import('@/components/Features').then((m) => ({ default: m.Features })));
const PlatformShowcase = lazy(() =>
  import('@/components/PlatformShowcase').then((m) => ({ default: m.PlatformShowcase })),
);
const MobileShowcase = lazy(() =>
  import('@/components/MobileShowcase').then((m) => ({ default: m.MobileShowcase })),
);
const Security = lazy(() => import('@/components/Security').then((m) => ({ default: m.Security })));
const HowItWorks = lazy(() => import('@/components/HowItWorks').then((m) => ({ default: m.HowItWorks })));
const CTA = lazy(() => import('@/components/CTA').then((m) => ({ default: m.CTA })));

function SectionFallback({ minHeight = 240 }: { minHeight?: number }) {
  return <div className="w-full" style={{ minHeight }} aria-hidden />;
}

export function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback minHeight={48} />}>
        <TickerBar />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={420} />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={480} />}>
        <PlatformShowcase />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={480} />}>
        <MobileShowcase />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={360} />}>
        <Security />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={360} />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={320} />}>
        <CTA />
      </Suspense>
    </>
  );
}
