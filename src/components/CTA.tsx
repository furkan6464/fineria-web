import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ctaHandMockup from '@/assets/app-mockups/cta-hand-mockup.webp';

const trustItems = ['Erken erişim açık', 'Mobil uygulama yakında', 'Türkçe arayüz', 'Ücretsiz hesap'];

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden grid lg:grid-cols-2 items-stretch"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 55%, #2D2A6E 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 10%, rgba(99,102,241,0.35) 0%, transparent 70%)' }}
          />

          <div className="relative hidden lg:flex items-end justify-center min-h-[420px] overflow-hidden">
            <div
              className="absolute -inset-10 rounded-full opacity-40"
              style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, transparent 65%)' }}
            />
            <img
              src={ctaHandMockup}
              alt="Fineria uygulamasını kullanan bir yatırımcı"
              className="relative w-[420px] xl:w-[480px] h-auto -mb-8"
              style={{ filter: 'drop-shadow(0 25px 20px rgba(0,0,0,0.35)) drop-shadow(0 45px 55px rgba(0,0,0,0.3))' }}
            />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 md:px-12">
            <h2 className="mb-4 font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)', lineHeight: 1.15 }}>
              Erken erişime
              <br />
              bugün katılın
            </h2>
            <p className="mb-8 max-w-md text-base sm:text-lg" style={{ color: '#CBD5E1' }}>
              Platformu şimdi keşfedin. Mobil uygulama App Store ve Google Play'de
              çok yakında.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="/kayit" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
                Ücretsiz Hesap Aç
                <ArrowRight size={20} />
              </a>
              <a
                href="/giris"
                className="rounded-xl border border-white/20 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                Giriş Yap
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:mt-10" style={{ color: '#94A3B8' }}>
              {trustItems.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
