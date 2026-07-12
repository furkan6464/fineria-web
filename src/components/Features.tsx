import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  LineChart, BrainCircuit, ShieldCheck, Zap, BellRing, Globe2,
  RefreshCw, Smartphone, Headset,
} from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Gerçek Zamanlı Piyasa Verisi',
    description: 'Tüm piyasaları tek ekrandan, gecikmesiz izleyin.',
    tone: 'brand' as const,
  },
  {
    icon: BrainCircuit,
    title: 'Veri Destekli Tahminleme',
    description: 'Karmaşık verileri değil, net sonuçları görün.',
    tone: 'brand' as const,
    badge: 'Yeni',
  },
  {
    icon: ShieldCheck,
    title: 'Kurumsal Düzeyde Güvenlik',
    description: 'BDDK lisanslı, 256-bit şifreli altyapı.',
    tone: 'success' as const,
  },
  {
    icon: Zap,
    title: 'Hızlı İşlem Altyapısı',
    description: 'Fırsatları kaçırmayın, anında işlem yapın.',
    tone: 'brand' as const,
  },
  {
    icon: BellRing,
    title: 'Akıllı Fiyat Bildirimleri',
    description: 'Piyasayı takip etmeyin, size haber versin.',
    tone: 'brand' as const,
  },
  {
    icon: Globe2,
    title: 'Geniş Piyasa Erişimi',
    description: 'BIST, döviz ve kripto — tek hesapta.',
    tone: 'brand' as const,
  },
  {
    icon: RefreshCw,
    title: 'Otomatik Portföy Dengeleme',
    description: 'Portföyünüz kendini otomatik dengeler.',
    tone: 'brand' as const,
  },
  {
    icon: Smartphone,
    title: 'Mobil Öncelikli Deneyim',
    description: 'Portföyünüzü dilediğiniz yerden yönetin.',
    tone: 'brand' as const,
  },
  {
    icon: Headset,
    title: '7/24 Türkçe Destek',
    description: 'Sorularınıza her zaman anında yanıt.',
    tone: 'success' as const,
  },
];

const toneStyles = {
  brand: { bg: 'var(--brand-tint)', fg: 'var(--brand-hover)' },
  success: { bg: 'var(--success-tint)', fg: 'var(--success)' },
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const tone = toneStyles[feature.tone];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card card-hover relative p-6"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: tone.bg }}
      >
        <feature.icon size={20} style={{ color: tone.fg }} />
      </div>

      {feature.badge && (
        <span
          className="absolute top-5 right-5 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
        >
          {feature.badge}
        </span>
      )}

      <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--ink-900)' }}>
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <section id="ozellikler" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">Özellikler</div>
          <h2 className="text-responsive-section font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
            Yatırım kararlarınızı destekleyen araçlar
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--ink-500)' }}>
            Yatırım kararlarınızı kolaylaştıran araçlar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
