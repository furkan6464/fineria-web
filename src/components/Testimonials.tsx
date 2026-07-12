import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import testimonialPhoto from '@/assets/lifestyle/testimonial-photo.jpg';

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    title: 'Yazılım Mühendisi',
    location: 'İstanbul',
    avatar: 'AY',
    rating: 5,
    text: 'Portföyümü tek ekrandan takip edebilmek işimi çok kolaylaştırdı. Tahminleme araçları piyasayı okumamda gerçekten yardımcı oluyor.',
  },
  {
    name: 'Selin Kaya',
    title: 'Öğretim Üyesi',
    location: 'Ankara',
    avatar: 'SK',
    rating: 5,
    text: 'Yatırım konusunda deneyimim yoktu; rehberli portföy önerileri sayesinde kendimi güvende hissederek başladım. Arayüz sade ve anlaşılır.',
  },
  {
    name: 'Murat Demir',
    title: 'Girişimci',
    location: 'İzmir',
    avatar: 'MD',
    rating: 5,
    text: 'Yoğun tempoda otomatik yeniden dengeleme özelliği işime yarıyor. Müşteri desteği sorularıma her seferinde hızlı dönüş yaptı.',
  },
  {
    name: 'Zeynep Arslan',
    title: 'Doktor',
    location: 'Bursa',
    avatar: 'ZA',
    rating: 5,
    text: 'Güvenlik konusunda çekincelerim vardı; BDDK lisansı ve iki faktörlü doğrulama beni ikna etti. Artık tasarruflarımı Fineria üzerinden takip ediyorum.',
  },
  {
    name: 'Can Öztürk',
    title: 'Fotoğrafçı',
    location: 'Bodrum',
    avatar: 'CÖ',
    rating: 5,
    text: 'Kripto ve hisse senedini aynı anda takip edebilmek işimi kolaylaştırıyor. Fiyat alarmları sayesinde önemli hareketleri kaçırmıyorum.',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current - 1 + testimonials.length) % testimonials.length],
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section className="py-24 relative bg-[var(--bg-subtle)] overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[440px] hidden xl:block pointer-events-none">
        <img
          src={testimonialPhoto}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '40% 50%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, var(--bg-subtle) 0%, rgba(248,250,252,0.55) 22%, rgba(248,250,252,0) 50%)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">Kullanıcı Yorumları</div>
          <h2 className="text-responsive-section font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
            Kullanıcılarımız ne diyor
          </h2>
          <p className="text-lg" style={{ color: 'var(--ink-500)' }}>
            32.000'den fazla değerlendirmenin ortalama puanı 4.8/5
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {visible.map((t, i) => {
              const isCenter = i === 1;
              return (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: isCenter ? 1 : 0.55, scale: isCenter ? 1 : 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl p-6 bg-white relative flex flex-col"
                  style={{
                    border: isCenter ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                    boxShadow: isCenter ? '0 20px 48px rgba(15,23,42,0.08)' : 'none',
                  }}
                >
                  <Quote size={28} className="mb-4 opacity-20" style={{ color: 'var(--brand-hover)' }} />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={14} fill="#D97706" style={{ color: '#D97706' }} />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--ink-700)' }}>
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: 'var(--brand)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-500)' }}>{t.title} · {t.location}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--border-strong)] transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft size={20} style={{ color: 'var(--ink-500)' }} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '22px' : '8px',
                    background: i === current ? 'var(--brand)' : 'var(--border-strong)',
                  }}
                  aria-label={`Yorum ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--border-strong)] transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight size={20} style={{ color: 'var(--ink-500)' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
