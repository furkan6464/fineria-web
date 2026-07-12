import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Target, TrendingUp, Users, Lightbulb, Globe2, Heart, CheckCircle2, XCircle } from 'lucide-react';
import { CTA } from '@/components/CTA';
import cozyPhoto from '@/assets/lifestyle/about-gundem-photo.webp';

const values = [
  { icon: Target, title: 'Şeffaflık', desc: 'Gizli ücret, gizli koşul yok.' },
  { icon: Lightbulb, title: 'İnovasyon', desc: 'Modern araçları herkese açıyoruz.' },
  { icon: Heart, title: 'Kullanıcı Odaklılık', desc: 'Her özellik, gerçek ihtiyaçtan doğar.' },
  { icon: Globe2, title: 'Erişilebilirlik', desc: 'Kurumsal araçlar, herkes için.' },
];

const timeline = [
  { phase: 'Faz 1', title: 'Temel Platform', desc: 'Portföy takibi ve yönetimi.', done: true },
  { phase: 'Faz 2', title: 'Tahminleme', desc: 'Veriye dayalı tahmin araçları.', done: true },
  { phase: 'Faz 3', title: 'Sosyal Ağ', desc: 'Doğrulanmış yatırımcı topluluğu.', done: false },
  { phase: 'Faz 4', title: 'B2B API', desc: 'Kurumsal ortaklıklar ve entegrasyon.', done: false },
];

const marketStats = [
  { label: 'Aktif Kullanıcı', value: '125.000+', sub: 'Türkiye genelinde' },
  { label: 'Yönetilen Varlık', value: '₺2,4 Milyar', sub: 'Toplam platform hacmi' },
  { label: 'Platform Çalışma Süresi', value: '%99,97', sub: 'Son 12 ayda' },
  { label: 'Kullanıcı Puanı', value: '4,8/5', sub: '32.000+ değerlendirme' },
];

export function AboutPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-brand mb-5 w-fit">
                <Heart size={13} />
                Hakkımızda
              </div>
              <h1 className="text-responsive-hero font-extrabold mb-6" style={{ color: 'var(--ink-900)' }}>
                Finansal okuryazarlığı erişilebilir kılıyoruz
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                Herkesin güvenle yatırım yapabileceği bir platform kuruyoruz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div
                className="absolute -inset-10 rounded-full opacity-60 -z-10"
                style={{ background: 'radial-gradient(ellipse, #EEF2FF 0%, transparent 65%)' }}
              />
              <img
                src={cozyPhoto}
                alt="Fineria uygulamasını kullanan bir yatırımcı"
                className="w-full rounded-3xl shadow-soft-xl object-cover"
                style={{ aspectRatio: '4/3', objectPosition: '58% 50%' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Problem */}
      <section className="py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: -24 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-brand mb-4 w-fit">
                <Target size={13} />
                Misyonumuz
              </div>
              <h2 className="text-responsive-section font-bold mb-6" style={{ color: 'var(--ink-900)' }}>
                Çözdüğümüz gerçek problem
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { title: 'Finansal Okuryazarlık Eksikliği', desc: 'Bütçe ve varlık yönetimi çoğu kişi için zor.' },
                  { title: 'Doğrulanmamış İçerik', desc: 'Sosyal medya tavsiyeleri güvenilir değil.' },
                  { title: 'Psikolojik Engeller', desc: 'Panik satış, kararları zorlaştırıyor.' },
                  { title: 'Karmaşık Profesyonel Araçlar', desc: 'Geleneksel platformlar yeni başlayanları dışlıyor.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--brand)' }} />
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
                      <div className="text-sm" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card p-8"
            >
              <h3 className="font-semibold mb-6 text-xl" style={{ color: 'var(--ink-900)' }}>
                Çözümümüz
              </h3>
              {[
                { num: '01', title: 'Net Analiz', desc: 'Piyasa verilerini anlamlı sonuçlara çeviririz.' },
                { num: '02', title: 'Size Özel', desc: 'Öneriler, sizin profilinize göre şekillenir.' },
                { num: '03', title: 'Güvenilir Topluluk', desc: 'Doğrulanmış yatırımcılardan gerçek deneyimler.' },
              ].map(item => (
                <div key={item.num} className="flex gap-5 pb-6 mb-6 border-b border-[var(--border-subtle)] last:border-0 last:pb-0 last:mb-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}>
                    {item.num}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
                    <div className="text-sm" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform in numbers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <TrendingUp size={13} />
              Rakamlarla Fineria
            </div>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              Büyüyen bir platform
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {marketStats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="card card-hover p-6 text-center"
              >
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--ink-900)' }}>{item.value}</div>
                <div className="text-sm font-medium mb-1" style={{ color: 'var(--ink-900)' }}>{item.label}</div>
                <div className="text-xs" style={{ color: 'var(--ink-500)' }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Competitor analysis */}
          <div className="card p-8">
            <h3 className="font-semibold mb-6 text-xl" style={{ color: 'var(--ink-900)' }}>
              Neden Fineria?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    {['Platform', 'Teknik Analiz', 'Tahminleme', 'Davranışsal Profil', 'Sosyal Ağ', 'Türkçe Destek'].map(h => (
                      <th key={h} className="text-left py-3 pr-4 text-xs font-semibold" style={{ color: 'var(--ink-500)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Geleneksel Platformlar', vals: ['Güçlü', false, false, false, true], isFineria: false },
                    { name: 'Grafik Araçları', vals: ['Güçlü', false, false, 'Sınırlı', false], isFineria: false },
                    { name: 'Haber Portalleri', vals: ['Orta', false, false, false, false], isFineria: false },
                    { name: 'Fineria', vals: ['Kapsamlı', 'Var', '3 Katman', 'Doğrulanmış', 'Native'], isFineria: true },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-[var(--border-subtle)] last:border-0" style={{ background: row.isFineria ? 'var(--brand-tint)' : 'transparent' }}>
                      <td className="py-3 pr-4 text-sm font-semibold" style={{ color: row.isFineria ? 'var(--brand-hover)' : 'var(--ink-900)' }}>{row.name}</td>
                      {row.vals.map((cell, ci) => (
                        <td key={ci} className="py-3 pr-4 text-sm">
                          {cell === false ? (
                            <XCircle size={16} style={{ color: 'var(--ink-300, #CBD5E1)' }} />
                          ) : cell === true ? (
                            <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          ) : (
                            <span style={{ color: row.isFineria ? 'var(--success)' : 'var(--ink-500)' }}>{cell as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Heart size={13} />
              Değerlerimiz
            </div>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              Neye inandığımız, nasıl çalıştığımız
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="card card-hover p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--brand-tint)' }}>
                  <v.icon size={24} style={{ color: 'var(--brand-hover)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--ink-900)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Users size={13} />
              Yol Haritası
            </div>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>Geliştirme takvimi</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border-subtle)]" />
            <div className="flex flex-col gap-6 pl-20">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className="absolute -left-[52px] top-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: item.done ? 'var(--brand)' : 'white',
                      border: `2px solid ${item.done ? 'var(--brand)' : 'var(--border-strong)'}`,
                      color: item.done ? 'white' : 'var(--ink-400)',
                    }}
                  >
                    {item.done ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <div className="card p-6">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}>
                        {item.phase}
                      </span>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--ink-900)' }}>{item.title}</h3>
                      {item.done && (
                        <span className="text-xs font-medium ml-auto flex items-center gap-1" style={{ color: 'var(--success)' }}>
                          Tamamlandı
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1.5 5.5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--ink-500)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
