import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroHand from '@/assets/lifestyle/hero-hand.webp';

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
    <section className="relative overflow-hidden bg-white pb-16 pt-28 sm:pb-20 lg:pb-0 lg:pt-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 h-[360px] w-[360px] rounded-full opacity-[0.35] blur-3xl sm:h-[560px] sm:w-[560px]"
          style={{ background: 'radial-gradient(circle, #EEF2FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 w-full relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col gap-5"
          >
            <motion.div variants={itemVariants}>
              <div className="badge badge-brand w-fit">
                <Sparkles size={13} />
                Erken erişim
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              <h1 className="text-responsive-hero font-extrabold" style={{ color: 'var(--ink-900)' }}>
                Portföyünüzü,
                <br />
                net verilerle yönetin.
              </h1>
              <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--ink-500)' }}>
                Hisse, döviz ve kripto varlıklarınızı tek ekrandan takip edin.
                Mobil uygulama çok yakında.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="/kayit" className="btn-primary flex w-full items-center gap-2 sm:w-auto">
                Ücretsiz Hesap Aç
                <ArrowRight size={18} />
              </a>
              <a href="#nasil-calisir" className="btn-secondary w-full sm:w-auto">
                Nasıl Çalışır?
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm" style={{ color: 'var(--ink-500)' }}>
              <span>Web uygulaması aktif</span>
              <span className="text-[var(--ink-400)]">·</span>
              <span>App Store ve Google Play yakında</span>
            </motion.div>
          </motion.div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

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
