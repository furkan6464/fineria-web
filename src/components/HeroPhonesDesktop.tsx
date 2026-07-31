import { AppMockupImage } from '@/components/AppMockupImage';
import anaSayfa from '@/assets/app-mockups/ana-sayfa.svg';
import piyasalar from '@/assets/app-mockups/piyasalar.svg';
import tahminleme from '@/assets/app-mockups/tahminleme.svg';

/** Üç telefon sahnesi — mobilde yanlar daha küçük, ortada ana ekran. */
export function HeroPhonesDesktop() {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] items-end justify-center gap-2 sm:max-w-none sm:gap-4 lg:gap-5">
      {/* Sol */}
      <div className="relative mb-5 w-[26%] max-w-[92px] opacity-75 sm:mb-8 sm:max-w-[150px] sm:opacity-65 lg:mb-6">
        <div className="overflow-hidden rounded-[1.05rem] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:rounded-[1.35rem]">
          <AppMockupImage src={tahminleme} label="Fineria Finance tahminleme" width={150} />
        </div>
      </div>

      {/* Orta */}
      <div className="relative z-10 w-[44%] max-w-[168px] sm:max-w-[240px]">
        <div className="overflow-hidden rounded-[1.25rem] shadow-[0_28px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:rounded-[1.6rem]">
          <AppMockupImage src={anaSayfa} label="Fineria Finance ana ekran" width={240} />
        </div>
      </div>

      {/* Sağ */}
      <div className="relative mb-5 w-[26%] max-w-[92px] opacity-75 sm:mb-8 sm:max-w-[150px] sm:opacity-65 lg:mb-6">
        <div className="overflow-hidden rounded-[1.05rem] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:rounded-[1.35rem]">
          <AppMockupImage src={piyasalar} label="Fineria Finance piyasalar" width={150} />
        </div>
      </div>
    </div>
  );
}
