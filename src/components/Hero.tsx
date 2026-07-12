import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroHand from '@/assets/lifestyle/hero-hand.webp';

function AnimatedNumber({ target, prefix = '', suffix = '', decimals = 0, duration = 1600 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress >= 1) {
        setCurrent(target);
        clearInterval(timer);
        
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, decimals]);

  return (
    <span className="font-mono">
      {prefix}{current.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const;

export function Hero() {
  return (
    <section className="relative pt-24 pb-0 lg:pt-28 overflow-hidden bg-white">
      {/* Ambient background — soft, not neon */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full opacity-[0.35] blur-3xl"
          style={{ background: 'radial-gradient(circle, #EEF2FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col gap-5"
          >
            <motion.div variants={itemVariants}>
              <div className="badge badge-brand w-fit">
                <ShieldCheck size={13} />
                BDDK Lisanslı Yatırım Platformu
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              <h1 className="text-responsive-hero font-extrabold" style={{ color: 'var(--ink-900)' }}>
                Portföyünüzü,
                <br />
                net verilerle yönetin.
              </h1>
              <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--ink-500)' }}>
                Hisse, döviz ve kripto varlıklarınızı tek ekrandan yönetin.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a href="/kayit" className="btn-primary flex items-center gap-2">
                Ücretsiz Hesap Aç
                <ArrowRight size={18} />
              </a>
              <a href="#nasil-calisir" className="btn-secondary">
                Nasıl Çalışır?
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>BDDK lisanslı</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} style={{ color: 'var(--ink-500)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>256-bit şifreleme</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: 'var(--amber)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>4.8/5 kullanıcı puanı</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-10 pt-4 border-t border-[var(--border-subtle)]">
              {[
                { label: 'Aktif kullanıcı', value: 125000, suffix: '+' },
                { label: 'Yönetilen varlık', value: 2.4, prefix: '₺', suffix: ' Milyar', decimals: 1 },
                { label: 'Platform çalışma süresi', value: 99.97, suffix: '%', decimals: 2 },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold" style={{ color: 'var(--ink-900)' }}>
                    <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                  </span>
                  <span className="text-xs" style={{ color: 'var(--ink-500)' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — empty cell on lg+, just reserves the column track width.
              The image itself is absolutely pinned below so it can hug the
              section's true bottom edge regardless of text column height. */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* Mobile/tablet — normal flow image, stacked below the text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:hidden"
          >
            <div className="relative">
              <div
                className="absolute -inset-16 rounded-full opacity-70 -z-10"
                style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }}
              />
              <img
                src={heroHand}
                alt="Fineria uygulamasını kullanan bir yatırımcı"
                className="w-[380px] sm:w-[460px] h-auto object-bottom drop-shadow-2xl block"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop — pinned to the section's true bottom-right corner */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute bottom-0 right-0 pointer-events-none"
      >
        <div className="relative origin-bottom-right scale-110 xl:scale-115">
          <div
            className="absolute -inset-20 rounded-full opacity-70 -z-10"
            style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }}
          />
          <img
            src={heroHand}
            alt="Fineria uygulamasını kullanan bir yatırımcı"
            className="w-[540px] xl:w-[620px] 2xl:w-[680px] h-auto object-bottom drop-shadow-2xl block"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
