import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BrainCircuit, LineChart, ShieldCheck, BellRing, Smartphone, Headset, Globe2,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const features = [
  { icon: BrainCircuit, title: 'Veri Destekli Tahminleme', desc: 'Karmaşık verileri değil, net sonuçları görün. Yapay zeka modelleri piyasayı sizin için okur.' },
  { icon: LineChart, title: 'Gerçek Zamanlı Piyasa Verisi', desc: 'Tüm piyasaları tek ekrandan, gecikmesiz izleyin.' },
  { icon: ShieldCheck, title: 'Modern Güvenlik', desc: 'Şifreli iletişim ve iki faktörlü kimlik doğrulama.' },
  { icon: BellRing, title: 'Akıllı Bildirimler', desc: 'Piyasayı takip etmeyin, size haber versin.' },
  { icon: Smartphone, title: 'Mobil Öncelikli Deneyim', desc: 'Portföyünüzü dilediğiniz yerden yönetin.' },
  { icon: Headset, title: '7/24 Türkçe Destek', desc: 'Sorularınıza her zaman anında yanıt.' },
  { icon: Globe2, title: 'Geniş Piyasa Erişimi', desc: 'BIST, döviz ve kripto — tek hesapta.' },
];

const MAX_CARD_WIDTH = 340;
const COUNT = features.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/** Kapsayıcı genişliğini izleyerek kart ölçüsünü dar ekranlara uyarlar. */
function useCarouselMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(MAX_CARD_WIDTH);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      // Oklar için iki yanda ~56px pay bırakılır.
      const available = el.clientWidth - 112;
      setWidth(Math.max(220, Math.min(MAX_CARD_WIDTH, available)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { containerRef, cardWidth: width, step: width + 32 };
}

export function Features() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { containerRef, cardWidth, step } = useCarouselMetrics();

  const [active, setActive] = useState(0);

  const goPrev = useCallback(() => setActive((a) => mod(a - 1, COUNT)), []);
  const goNext = useCallback(() => setActive((a) => mod(a + 1, COUNT)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section id="ozellikler" className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:py-28">
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div
            className="mb-4 mx-auto w-fit text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#A5B4FC' }}
          >
            Özellikler
          </div>
          <h2
            className="font-extrabold mb-4 tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-400 to-gray-200"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.1rem)' }}
          >
            Yatırım kararlarınızı destekleyen araçlar
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light text-gray-400 sm:text-lg">
            Yatırım kararlarınızı kolaylaştıran araçlar.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Önceki özellik"
            className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-xl transition-colors duration-300 sm:h-12 sm:w-12 lg:-left-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            <ChevronLeft size={20} className="text-white/70" />
          </button>

          <div
            ref={containerRef}
            className="relative flex h-[400px] w-full items-center justify-center"
            style={{ perspective: 1200 }}
          >
            {features.map((feature, i) => {
              let offset = i - active;
              if (offset > COUNT / 2) offset -= COUNT;
              if (offset < -COUNT / 2) offset += COUNT;

              const isActive = offset === 0;
              const abs = Math.abs(offset);
              const visible = abs <= 1;

              return (
                <motion.div
                  key={feature.title}
                  className="absolute flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] sm:p-8"
                  style={{
                    width: cardWidth,
                    height: 360,
                    marginLeft: -cardWidth / 2,
                    marginTop: -180,
                    left: '50%',
                    top: '50%',
                    boxShadow: isActive
                      ? 'inset 0 0 20px rgba(255,255,255,0.03), 0 4px 30px rgba(0,0,0,0.1), 0 30px 60px -20px rgba(79,70,229,0.4)'
                      : 'inset 0 0 20px rgba(255,255,255,0.03), 0 4px 30px rgba(0,0,0,0.1)',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                  animate={{
                    x: offset * step,
                    scale: isActive ? 1 : 0.82,
                    opacity: visible ? (isActive ? 1 : 0.45) : 0,
                    zIndex: isActive ? 10 : 5 - abs,
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => !isActive && setActive(i)}
                >
                  <feature.icon size={26} strokeWidth={1.25} className="text-white/40 mb-6" />

                  <h3 className="font-semibold text-xl mb-3 tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400 font-light">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Sonraki özellik"
            className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-xl transition-colors duration-300 sm:h-12 sm:w-12 lg:-right-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            <ChevronRight size={20} className="text-white/70" />
          </button>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {features.map((feature, i) => (
            <button
              key={feature.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${feature.title} göster`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 22 : 6,
                background: i === active ? '#A5B4FC' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
