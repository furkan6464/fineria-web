import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  BrainCircuit, LineChart, Target, SlidersHorizontal,
  Users, Globe2,
} from 'lucide-react';
import { CTA } from '@/components/CTA';

const tones = {
  brand: { fg: 'var(--brand-hover)', bg: 'var(--brand-tint)' },
  success: { fg: 'var(--success)', bg: 'var(--success-tint)' },
  amber: { fg: 'var(--amber)', bg: '#FFFBEB' },
};

const mainFeatures = [
  {
    icon: BrainCircuit,
    title: 'Akıllı Tahminleme',
    description: 'Karmaşık verileri değil, net sonuçları görün.',
    tone: 'brand' as const,
  },
  {
    icon: LineChart,
    title: 'Piyasa Nabzı',
    description: 'Haberleri ve gündemi tek bakışta takip edin.',
    tone: 'brand' as const,
  },
  {
    icon: Target,
    title: 'Size Özel Öneriler',
    description: 'Risk tercihinize göre kişiselleştirilmiş portföy önerileri.',
    tone: 'success' as const,
  },
  {
    icon: SlidersHorizontal,
    title: 'Profesyonel Analiz',
    description: 'Uzmanların kullandığı araçlar, sade bir arayüzde.',
    tone: 'amber' as const,
  },
  {
    icon: Users,
    title: 'Güvenilir Topluluk',
    description: 'Doğrulanmış yatırımcılardan gerçek deneyimler.',
    tone: 'brand' as const,
  },
  {
    icon: Globe2,
    title: 'Tüm Piyasalar Tek Yerde',
    description: 'Hisse, döviz ve kripto — tek hesapta.',
    tone: 'success' as const,
  },
];

function FeatureCard({ feat, i }: { feat: typeof mainFeatures[0]; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const tone = tones[feat.tone];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
      className="card card-hover p-7"
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: tone.bg }}>
        <feat.icon size={22} style={{ color: tone.fg }} />
      </div>
      <h3 className="font-bold text-lg mb-1.5" style={{ color: 'var(--ink-900)' }}>{feat.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{feat.description}</p>
    </motion.div>
  );
}

export function FeaturesPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="pt-24">
      <section className="py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="badge badge-brand mb-5 mx-auto w-fit">Özellikler</div>
            <h1 className="text-responsive-hero font-extrabold mb-5" style={{ color: 'var(--ink-900)' }}>
              Tüm varlıklarınız, tek ekranda
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--ink-500)' }}>
              Yatırım kararlarınızı kolaylaştıran araçlar, sade bir deneyimde.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mainFeatures.map((feat, i) => (
              <FeatureCard key={feat.title} feat={feat} i={i} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
