import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Users, Landmark, Activity, Star } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { icon: Users, value: 125000, suffix: '+', label: 'Aktif Kullanıcı', sublabel: 'Türkiye genelinde' },
  { icon: Landmark, value: 2.4, prefix: '₺', suffix: ' Milyar', label: 'Yönetilen Varlık', sublabel: 'Toplam AUM', decimals: 1 },
  { icon: Activity, value: 99.97, suffix: '%', label: 'Platform Çalışma Süresi', sublabel: 'Son 12 ayda', decimals: 2 },
  { icon: Star, value: 4.8, suffix: '/5', label: 'Kullanıcı Puanı', sublabel: '32.000+ değerlendirme', decimals: 1 },
];

function CounterNumber({
  target, prefix = '', suffix = '', decimals = 0, active,
}: {
  target: number; prefix?: string; suffix?: string; decimals?: number; active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = Date.now();
    const duration = 1800;
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress >= 1) {
        setCurrent(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimals]);

  return (
    <span className="font-mono">
      {prefix}{current.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative bg-white border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
            Rakamlarla Fineria
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card card-hover p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto" style={{ background: 'var(--brand-tint)' }}>
                <stat.icon size={22} style={{ color: 'var(--brand-hover)' }} />
              </div>

              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--ink-900)' }}>
                <CounterNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} active={isInView} />
              </div>

              <div className="font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>{stat.label}</div>
              <div className="text-sm" style={{ color: 'var(--ink-500)' }}>{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
