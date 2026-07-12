import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { BrainCircuit, LayoutDashboard, Radar, ShieldCheck } from 'lucide-react';
import gundemVideo from '@/assets/videos/gundem-showcase.mp4';

const capabilities = [
  { icon: BrainCircuit, title: 'AI Portföy Yöneticisi', desc: 'Portföyünüz için akıllı öneriler.' },
  { icon: LayoutDashboard, title: 'Profesyonel Dashboard', desc: 'Tüm araçlar tek ekranda.' },
  { icon: Radar, title: 'Gerçek Zamanlı Analiz', desc: 'Piyasa verileri, gecikmesiz.' },
  { icon: ShieldCheck, title: 'BDDK Lisanslı Altyapı', desc: 'Denetimli ve güvenli bir platform.' },
];

export function PlatformShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 relative bg-[var(--bg-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative flex justify-center">
              <div
                className="absolute -inset-20 rounded-full opacity-60 -z-10"
                style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }}
              />
              <video
                src={gundemVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-auto block rounded-[2rem] shadow-soft-xl"
                style={{
                  height: 'min(560px, 60vw)',
                  maxWidth: '100%',
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="badge badge-brand mb-5 w-fit">Platform Gücü</div>
            <h2 className="text-responsive-section font-bold mb-5" style={{ color: 'var(--ink-900)' }}>
              Kurumsal araçlar, sade bir deneyimde
            </h2>
            <p className="text-lg mb-9 leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              Piyasa verilerini anlamlı sonuçlara dönüştürür.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {capabilities.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'white' }}>
                    <item.icon size={19} style={{ color: 'var(--brand-hover)' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
