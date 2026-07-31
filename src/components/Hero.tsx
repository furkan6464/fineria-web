import { HeroPhonesDesktop } from '@/components/HeroPhonesDesktop';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
} as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#05060a] pb-10 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-28 lg:min-h-[100svh] lg:pb-24 lg:pt-32"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 hidden opacity-[0.3] sm:block"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full blur-3xl sm:left-[-10%] sm:top-[10%] sm:h-[480px] sm:w-[480px] sm:translate-x-0"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.32), transparent 68%)' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-9 px-5 sm:gap-12 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 xl:gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full max-w-xl flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:pt-4 lg:text-left"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-indigo-300/80 sm:text-[11px] sm:tracking-[0.22em]"
          >
            Fineria Finance
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col gap-3.5 sm:gap-5">
            <h1
              className="font-extrabold tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.05rem, 8.2vw, 4.35rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.045em',
              }}
            >
              Piyasayı
              <br />
              tek ekrandan yönet.
            </h1>
            <p className="mx-auto max-w-[20rem] text-[0.95rem] leading-relaxed text-white/50 sm:max-w-md sm:text-base lg:mx-0 lg:text-lg">
              BIST, Amerikan Borsası ve kripto. Gürültüsüz arayüz, net veri —
              ihtiyacın olan bilgi, doğru anda.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-xs flex-col gap-2.5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <Link
              to="/kayit"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold tracking-tight text-[#05060a] transition-opacity hover:opacity-90 sm:w-auto sm:px-7 sm:text-[14px]"
            >
              Ücretsiz Hesap Aç
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#nasil-calisir"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-[13.5px] font-medium tracking-tight text-white/80 transition-colors hover:border-white/35 hover:text-white sm:w-auto sm:px-7 sm:text-[14px]"
            >
              Nasıl Çalışır?
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[10px] tracking-wide text-white/35 sm:gap-x-3 sm:text-[11px] lg:justify-start"
          >
            <span>BIST</span>
            <span className="text-white/20">/</span>
            <span>Amerikan Borsası</span>
            <span className="text-white/20">/</span>
            <span>Kripto</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[380px] sm:max-w-[480px] lg:max-w-none"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[45%] h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.28), transparent 65%)' }}
            aria-hidden
          />
          <HeroPhonesDesktop />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 sm:h-16"
            style={{ background: 'linear-gradient(to top, #05060a 8%, transparent)' }}
            aria-hidden
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24"
        style={{ background: 'linear-gradient(to top, #07080f, transparent)' }}
        aria-hidden
      />
    </section>
  );
}
