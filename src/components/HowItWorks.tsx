import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { UserPlus, SlidersHorizontal, TrendingUp, LineChart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Hesabınızı açın',
    description: 'Kimliğinizi birkaç adımda onaylayın.',
    detail: '~2 dakika sürer',
  },
  {
    icon: SlidersHorizontal,
    title: 'Yatırım profilinizi belirleyin',
    description: 'Hedeflerinize uygun bir plan alın.',
    detail: 'Kısa bir anket',
  },
  {
    icon: TrendingUp,
    title: 'İlk yatırımınızı yapın',
    description: 'Tek tıkla yatırımınızı başlatın.',
    detail: 'Minimum ₺100',
  },
  {
    icon: LineChart,
    title: 'Portföyünüzü takip edin',
    description: 'Yatırımınızı anlık olarak izleyin.',
    detail: 'Aylık raporlama',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="nasil-calisir" className="py-24 relative bg-[var(--bg-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">Nasıl Çalışır</div>
          <h2 className="text-responsive-section font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
            Dört adımda yatırıma başlayın
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--ink-500)' }}>
            Hesap açılışından ilk yatırımınıza kadar tüm süreç dijital ve şeffaftır.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 relative"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-tint)' }}>
                  <step.icon size={20} style={{ color: 'var(--brand-hover)' }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: 'var(--ink-200, #E2E8F0)' }}>
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--ink-900)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-500)' }}>{step.description}</p>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}>
                {step.detail}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-14"
        >
          <a href="/kayit" className="btn-primary flex items-center gap-2 text-base">
            Ücretsiz Hesap Aç
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
