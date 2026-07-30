import { motion } from 'framer-motion';
import { AppMockupImage } from './AppMockupImage';
import macbookMockup from '@/assets/app-mockups/macbook-transparent.webp';
import piyasalarMockup from '@/assets/app-mockups/piyasalar.svg';
import tahminlemeMockup from '@/assets/app-mockups/tahminleme.svg';

interface DeviceShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function DeviceShowcase({
  eyebrow = 'Çok yakında',
  title = 'Fineria masaüstünde ve mobilde',
  description = 'Web uygulaması yayına hazırlanıyor, iOS ve Android sürümleri çok yakında.',
  className = '',
}: DeviceShowcaseProps) {
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#050508] px-8 py-16 ${className}`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 38%, rgba(99,102,241,0.20) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, rgba(99,102,241,0.10), transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-[680px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 28, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -9 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 z-0 hidden xl:block"
          style={{ bottom: '-6%' }}
        >
          <div className="overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <AppMockupImage src={piyasalarMockup} label="Fineria piyasalar ekranı" width={148} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -28, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 9 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 z-0 hidden xl:block"
          style={{ bottom: '-6%' }}
        >
          <div className="overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <AppMockupImage src={tahminlemeMockup} label="Fineria tahminleme ekranı" width={148} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[460px]"
        >
          <img
            src={macbookMockup}
            alt="Fineria masaüstü uygulaması"
            className="block h-auto w-full"
            style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.75))' }}
          />
          <div
            className="absolute left-1/2 h-7 w-[70%] -translate-x-1/2 rounded-full blur-2xl"
            style={{ bottom: '-10px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, transparent 75%)' }}
            aria-hidden
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.55 }}
        className="relative z-10 mt-12 max-w-sm text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-300">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
          </span>
          {eyebrow}
        </span>
        <h2 className="mt-5 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-100 bg-clip-text text-2xl font-bold leading-tight tracking-tight text-transparent">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">{description}</p>
      </motion.div>
    </div>
  );
}
