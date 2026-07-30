import { motion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Layers3,
  LineChart,
  Search,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppMockupImage } from '@/components/AppMockupImage';
import piyasalarMockup from '@/assets/app-mockups/piyasalar.svg';
import gundemMockup from '@/assets/app-mockups/gundem.svg';
import anaSayfaMockup from '@/assets/app-mockups/ana-sayfa.svg';

const capabilities = [
  {
    icon: Search,
    number: '01',
    title: 'Aradığınızı anında bulun',
    description:
      'BIST, kripto ve emtia varlıklarını sade bir arama deneyimiyle keşfedin.',
  },
  {
    icon: LineChart,
    number: '02',
    title: 'Hareketi tek bakışta okuyun',
    description:
      'Fiyat, değişim ve trend bilgisini kalabalık ekranlar arasında kaybolmadan görün.',
  },
  {
    icon: BellRing,
    number: '03',
    title: 'Önemli anları kaçırmayın',
    description:
      'Takip ettiğiniz varlıklar ve gündem için kişisel bir piyasa akışı oluşturun.',
  },
];

const flow = [
  { title: 'Keşfet', text: 'Piyasayı ve öne çıkan varlıkları tarayın.' },
  { title: 'Takip et', text: 'İlgilendiğiniz sembolleri tek yerde toplayın.' },
  { title: 'Anlamlandır', text: 'Fiyat hareketini gündem ve analizle birlikte okuyun.' },
];

export function MarketsPage() {
  return (
    <div className="overflow-hidden bg-white pt-24">
      <section className="relative pb-16 pt-10 sm:pt-14 lg:pb-28 lg:pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full opacity-60 blur-3xl sm:h-[520px] sm:w-[900px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.05) 45%, transparent 72%)',
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="badge badge-brand mx-auto mb-5 w-fit">
              <Sparkles size={13} />
              Fineria Piyasalar
            </div>
            <h1
              className="text-responsive-hero font-extrabold leading-[1.05]"
              style={{ color: 'var(--ink-900)', letterSpacing: '-0.045em' }}
            >
              Piyasayı izlemek değil,
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(100deg, #4F46E5 5%, #7C3AED 55%, #A855F7 100%)',
                }}
              >
                anlamak için tasarlandı.
              </span>
            </h1>
            <p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:mt-6 sm:text-lg"
              style={{ color: 'var(--ink-500)' }}
            >
              Fiyatları, trendleri ve piyasa gündemini tek bir akışta bir araya
              getiriyoruz. Daha az gürültü, daha net bir bakış.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Link to="/kayit" className="btn-primary inline-flex items-center gap-2">
                Erken erişime katıl
                <ArrowRight size={16} />
              </Link>
              <a href="#deneyim" className="btn-secondary inline-flex items-center gap-2">
                Deneyimi keşfet
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-12 max-w-5xl sm:mt-16"
          >
            <div
              className="relative overflow-hidden rounded-[1.5rem] border sm:rounded-[2rem]"
              style={{
                background:
                  'radial-gradient(circle at 50% 30%, #23203c 0%, #0d0b18 45%, #06060a 80%)',
                borderColor: 'rgba(255,255,255,0.09)',
                boxShadow: '0 45px 100px -45px rgba(49,46,129,0.55)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
                  backgroundSize: '42px 42px',
                  maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
                }}
                aria-hidden
              />

              <div className="relative z-20 flex flex-col items-center gap-4 px-5 pt-8 text-center sm:px-10 sm:pt-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ürün önizlemesi
                </div>
                <p className="max-w-lg text-lg font-semibold leading-snug text-white sm:text-[1.6rem]">
                  Veriden görünüme,
                  <span className="bg-gradient-to-r from-violet-300 to-indigo-200 bg-clip-text text-transparent">
                    {' '}
                    görünümden içgörüye.
                  </span>
                </p>
              </div>

              <div className="relative z-10 mt-9 flex items-end justify-center gap-5 px-5 sm:mt-12 sm:gap-8 sm:px-6 lg:gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="hidden w-[186px] translate-y-9 opacity-70 lg:block"
                >
                  <AppMockupImage src={gundemMockup} label="Fineria piyasa gündemi" width={186} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.15 }}
                  className="relative z-10 w-full max-w-[210px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)] sm:max-w-[236px]"
                >
                  <AppMockupImage src={piyasalarMockup} label="Fineria piyasalar ekranı" width={236} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="hidden w-[186px] translate-y-9 opacity-70 lg:block"
                >
                  <AppMockupImage src={anaSayfaMockup} label="Fineria ana ekranı" width={186} />
                </motion.div>
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24"
                style={{ background: 'linear-gradient(to top, #06060a 12%, transparent)' }}
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="deneyim" className="bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-tint)]">
                <Layers3 size={20} style={{ color: 'var(--brand-hover)' }} />
              </div>
              <h2
                className="text-responsive-section font-bold"
                style={{ color: 'var(--ink-900)' }}
              >
                Her şey yerli yerinde.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed sm:text-base" style={{ color: 'var(--ink-500)' }}>
                Piyasa ekranını bir veri duvarı olmaktan çıkarıp, yatırımcının
                günlük akışına uyum sağlayan bir ürüne dönüştürüyoruz.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {capabilities.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-tint)]">
                      <item.icon size={18} style={{ color: 'var(--brand-hover)' }} />
                    </div>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--ink-400)' }}>
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-semibold" style={{ color: 'var(--ink-900)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="badge badge-brand mb-5 w-fit">Fineria akışı</div>
              <h2
                className="text-responsive-section font-bold"
                style={{ color: 'var(--ink-900)' }}
              >
                Piyasanın tamamı değil,
                <span className="block" style={{ color: 'var(--brand-hover)' }}>
                  sizin için önemli olan.
                </span>
              </h2>
              <div className="mt-8 flex flex-col gap-6 sm:mt-9 sm:gap-7">
                {flow.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    className="flex gap-4"
                  >
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                      style={{
                        background: index === 2 ? 'var(--brand)' : 'var(--brand-tint)',
                        color: index === 2 ? 'white' : 'var(--brand-hover)',
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--ink-900)' }}>
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: 'var(--ink-500)' }}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative mx-auto w-full max-w-[340px]"
            >
              <div
                className="absolute inset-8 rounded-full blur-3xl"
                style={{ background: 'rgba(99,102,241,0.16)' }}
                aria-hidden
              />
              <div className="relative flex justify-center rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-5 shadow-xl shadow-slate-900/5 sm:rounded-[2rem] sm:p-8">
                <AppMockupImage
                  src={gundemMockup}
                  label="Fineria kişisel piyasa akışı"
                  width={285}
                />
              </div>
            </motion.div>
          </div>

          <div className="mt-16 rounded-[1.5rem] bg-[#0a0910] px-6 py-10 text-center sm:mt-24 sm:rounded-[2rem] sm:px-12 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Yakında Fineria'da
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-xl font-bold text-white sm:text-3xl">
              Piyasa takibini daha sakin, daha kişisel ve daha anlaşılır hâle getirin.
            </h2>
            <Link
              to="/kayit"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#111018] transition-transform hover:scale-[1.02]"
            >
              Erken erişime katıl
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
