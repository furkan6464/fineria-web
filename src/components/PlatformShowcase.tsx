import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { BrainCircuit, LayoutDashboard, Radar, ShieldCheck } from 'lucide-react';
import gundemVideo from '@/assets/videos/gundem-showcase.mp4';

const capabilities = [
  { icon: BrainCircuit, title: 'AI Portföy Yöneticisi', desc: 'Portföyünüz için akıllı öneriler.' },
  { icon: LayoutDashboard, title: 'Profesyonel Dashboard', desc: 'Tüm araçlar tek ekranda.' },
  { icon: Radar, title: 'Gerçek Zamanlı Analiz', desc: 'Piyasa verileri, gecikmesiz.' },
  { icon: ShieldCheck, title: 'Güvenli Altyapı', desc: 'Şifreli iletişim ve hesap koruması.' },
];

export function PlatformShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
                className="block w-auto rounded-[1.5rem] shadow-soft-xl sm:rounded-[2rem]"
                style={{
                  height: 'clamp(340px, 62vw, 560px)',
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
            <p className="mb-8 text-base leading-relaxed sm:text-lg lg:mb-9" style={{ color: 'var(--ink-500)' }}>
              Piyasa verilerini anlamlı sonuçlara dönüştürür.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
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
