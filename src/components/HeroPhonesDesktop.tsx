import { motion, useReducedMotion } from 'framer-motion';
import { AppMockupImage } from '@/components/AppMockupImage';
import anaSayfa from '@/assets/app-mockups/ana-sayfa.svg';
import piyasalar from '@/assets/app-mockups/piyasalar.svg';
import tahminleme from '@/assets/app-mockups/tahminleme.svg';

function floatAnim(reduceMotion: boolean | null, amount: number, duration: number, delay = 0) {
  if (reduceMotion) return undefined;
  return {
    y: [0, -amount, 0],
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
  };
}

/** Desktop/tablet phone stage — lazy-loaded so mobile first paint skips extra SVGs. */
export function HeroPhonesDesktop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-end justify-center gap-3 sm:gap-4 lg:gap-5">
      <motion.div
        className="relative mb-8 w-[26%] max-w-[150px] opacity-65 lg:mb-6"
        animate={floatAnim(reduceMotion, 7, 5.5)}
      >
        <div className="light-sweep light-sweep-dark overflow-hidden rounded-[1.35rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
          <AppMockupImage src={tahminleme} label="Fineria Finance tahminleme" width={150} />
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 w-[42%] max-w-[240px]"
        animate={floatAnim(reduceMotion, 10, 6.2, 0.35)}
      >
        <div className="light-sweep light-sweep-dark overflow-hidden rounded-[1.6rem] shadow-[0_40px_80px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
          <AppMockupImage src={anaSayfa} label="Fineria Finance ana ekran" width={240} />
        </div>
      </motion.div>

      <motion.div
        className="relative mb-8 w-[26%] max-w-[150px] opacity-65 lg:mb-6"
        animate={floatAnim(reduceMotion, 8, 5.8, 0.7)}
      >
        <div className="light-sweep light-sweep-dark overflow-hidden rounded-[1.35rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
          <AppMockupImage src={piyasalar} label="Fineria Finance piyasalar" width={150} />
        </div>
      </motion.div>
    </div>
  );
}
