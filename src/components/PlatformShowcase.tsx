import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LayoutDashboard, LineChart, Radar, ShieldCheck } from 'lucide-react';
import gundemVideo from '@/assets/videos/gundem-showcase.mp4';

const capabilities = [
  { icon: LayoutDashboard, title: 'Tek panel', desc: 'Piyasa ve portföy aynı yerde.' },
  { icon: Radar, title: 'Canlı takip', desc: 'Hareketi gecikmeden gör.' },
  { icon: LineChart, title: 'Net analiz', desc: 'Karmaşık veriyi anlaşılır sonuçlara çevir.' },
  { icon: ShieldCheck, title: 'Güvenli temel', desc: 'Şifreli iletişim ve hesap koruması.' },
];

export function PlatformShowcase() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const videoInView = useInView(videoRef, { amount: 0.35 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoInView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoInView]);

  return (
    <section className="relative overflow-hidden bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24 content-visibility-auto">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 flex justify-center lg:order-1"
          >
            <div className="relative flex justify-center">
              <div
                className="absolute -inset-16 -z-10 rounded-full opacity-70 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, transparent 65%)' }}
                aria-hidden
              />
              <div className="light-sweep light-sweep-soft rounded-[1.5rem] sm:rounded-[2rem]">
                <video
                  ref={videoRef}
                  src={gundemVideo}
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster=""
                  className="block w-auto rounded-[1.5rem] shadow-[0_30px_60px_-28px_rgba(15,23,42,0.35)] sm:rounded-[2rem]"
                  style={{
                    height: 'clamp(340px, 62vw, 560px)',
                    maxWidth: '100%',
                    background: '#0B1220',
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="order-1 lg:order-2"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
              Platform
            </p>
            <h2 className="text-responsive-section mb-5 font-bold" style={{ color: 'var(--ink-900)' }}>
              Piyasayı izlemek değil,
              <span className="block" style={{ color: 'var(--brand-hover)' }}>
                anlamak için.
              </span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed sm:text-lg lg:mb-9" style={{ color: 'var(--ink-500)' }}>
              Veriyi ekrana yığmak yerine, karar vermene yardımcı olacak
              görünümler sunuyoruz.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                  className="shine-hover rounded-2xl border border-[var(--border-subtle)] bg-white p-4"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-tint)]">
                    <item.icon size={17} style={{ color: 'var(--brand-hover)' }} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
                  <div className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
