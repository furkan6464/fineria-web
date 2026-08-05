import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Zap, Rocket, Crown, CheckCircle2, HelpCircle,
  Building2, ArrowRight, X,
} from 'lucide-react';
import { CTA } from '@/components/CTA';
import { useTranslation } from '@/i18n';

interface PricingTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  excluded?: string[];
  popular?: boolean;
  cta: string;
}

const COMPARISON_VALS: (boolean | 'basic' | 'unlimited' | 'full' | 'custom' | 'email' | 'priority' | 'dedicated' | 'sla')[][] = [
  [true, true, true],
  ['basic', 'unlimited', 'unlimited'],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  ['basic', 'full', 'full'],
  [false, true, 'custom'],
  [false, false, true],
  [false, false, 'sla'],
  ['email', 'priority', 'dedicated'],
];

function TableCell({ val }: { val: boolean | string }) {
  if (val === true) return <CheckCircle2 size={16} className="mx-auto" style={{ color: 'var(--success)' }} />;
  if (val === false) return <span className="text-base" style={{ color: 'var(--ink-200, #E2E8F0)' }}>—</span>;
  return <span className="text-xs font-semibold" style={{ color: 'var(--brand-hover)' }}>{val}</span>;
}

function PricingCard({
  tier,
  i,
  popularLabel,
  freeLabel,
  trialLabel,
  locale,
}: {
  tier: PricingTier;
  i: number;
  popularLabel: string;
  freeLabel: string;
  trialLabel: string;
  locale: string;
}) {
  const isPopular = tier.popular === true;
  const currencyPrefix = locale === 'en' ? '$' : '₺';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative flex flex-col rounded-3xl"
      style={{
        background: isPopular ? 'var(--brand-tint)' : 'white',
        border: isPopular ? '1px solid #C7D2FE' : '1px solid var(--border-subtle)',
        boxShadow: isPopular ? '0 20px 48px rgba(79,70,229,0.12)' : '0 1px 2px rgba(15,23,42,0.04)',
        transform: isPopular ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {isPopular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-wider uppercase text-white rounded-full"
          style={{ background: 'var(--brand)', letterSpacing: '0.06em' }}
        >
          {popularLabel}
        </div>
      )}

      <div className="flex flex-col flex-1 p-8">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: isPopular ? 'white' : 'var(--bg-subtle)', color: 'var(--brand-hover)' }}
          >
            {tier.icon}
          </div>
          <div>
            <div className="font-semibold" style={{ color: 'var(--ink-900)' }}>{tier.name}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--ink-500)' }}>{tier.description}</div>
          </div>
        </div>

        <div className="mb-7">
          {typeof tier.price === 'number' ? (
            tier.price === 0 ? (
              <div className="text-4xl font-extrabold" style={{ color: 'var(--ink-900)' }}>{freeLabel}</div>
            ) : (
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold" style={{ color: 'var(--ink-900)' }}>{currencyPrefix}{tier.price}</span>
                <span className="text-base pb-1" style={{ color: 'var(--ink-500)' }}>{tier.period}</span>
              </div>
            )
          ) : (
            <div className="text-4xl font-extrabold" style={{ color: 'var(--ink-900)' }}>{tier.price}</div>
          )}
          {typeof tier.price === 'number' && tier.price > 0 && (
            <div className="text-xs mt-1" style={{ color: 'var(--ink-500)' }}>{trialLabel}</div>
          )}
        </div>

        <div className="flex flex-col gap-3 flex-1 mb-8">
          {tier.features.map((feat, i) => (
            <div key={`tier-feat-${i}`} className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: 'var(--success)' }} />
              <span className="text-sm" style={{ color: 'var(--ink-700)' }}>{feat}</span>
            </div>
          ))}
          {tier.excluded?.map((feat, i) => (
            <div key={`tier-feat-${i}`} className="flex items-center gap-2.5 opacity-45">
              <X size={15} className="flex-shrink-0" style={{ color: 'var(--ink-400)' }} />
              <span className="text-sm line-through" style={{ color: 'var(--ink-400)' }}>{feat}</span>
            </div>
          ))}
        </div>

        <a
          href="/kayit"
          className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isPopular ? 'btn-primary' : 'btn-secondary'}`}
        >
          {tier.cta}
          <ArrowRight size={15} />
        </a>
      </div>
    </motion.div>
  );
}

export function PricingPage() {
  const { t, locale } = useTranslation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true });

  const p = t.pricing;
  const cv = p.comparison.values;

  const tiers: PricingTier[] = [
    {
      id: 'free',
      name: p.tiers.starter.name,
      icon: <Zap size={20} />,
      price: 0,
      description: p.tiers.starter.description,
      features: [...p.tiers.starter.features],
      excluded: [...p.tiers.starter.excluded],
      cta: p.tiers.starter.cta,
    },
    {
      id: 'pro',
      name: p.tiers.pro.name,
      icon: <Rocket size={20} />,
      price: 5,
      period: p.period,
      description: p.tiers.pro.description,
      popular: true,
      features: [...p.tiers.pro.features],
      cta: p.tiers.pro.cta,
    },
    {
      id: 'enterprise',
      name: p.tiers.enterprise.name,
      icon: <Crown size={20} />,
      price: p.tiers.enterprise.price,
      description: p.tiers.enterprise.description,
      features: [...p.tiers.enterprise.features],
      cta: p.tiers.enterprise.cta,
    },
  ];

  const tableRows = p.comparison.rows.map((feat, i) => ({
    feat,
    vals: COMPARISON_VALS[i].map((val) => {
      if (typeof val === 'boolean') return val;
      return cv[val as keyof typeof cv];
    }),
  }));

  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge badge-brand mb-5 mx-auto w-fit">
              <Zap size={13} />
              {p.hero.badge}
            </div>
            <h1 className="text-responsive-hero font-extrabold mb-5" style={{ color: 'var(--ink-900)' }}>
              {p.hero.title}
            </h1>
            <p className="text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--ink-500)' }}>
              {p.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier, i) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                i={i}
                popularLabel={p.popular}
                freeLabel={p.free}
                trialLabel={p.trial}
                locale={locale}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 card p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFFBEB' }}>
                <Building2 size={22} style={{ color: 'var(--amber)' }} />
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>{p.enterpriseBanner.title}</div>
                <div className="text-sm" style={{ color: 'var(--ink-500)' }}>
                  {p.enterpriseBanner.desc}
                </div>
              </div>
            </div>
            <a href="#" className="btn-secondary flex items-center gap-2 whitespace-nowrap text-sm">
              {p.enterpriseBanner.cta}
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20 relative bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>{p.comparison.title}</h2>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-500)', width: '40%' }}>
                      {p.comparison.feature}
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="px-4 py-4 text-center" style={{ background: tier.popular ? 'var(--brand-tint)' : 'transparent' }}>
                        <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{tier.name}</div>
                        {tier.popular && <div className="text-xs mt-1 font-medium" style={{ color: 'var(--brand-hover)' }}>{p.popular}</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={`cmp-${i}`} className={i < tableRows.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''}>
                      <td className="px-6 py-3.5 text-sm" style={{ color: 'var(--ink-500)' }}>{row.feat}</td>
                      {row.vals.map((val, vi) => (
                        <td key={vi} className="px-4 py-3.5 text-center" style={{ background: vi === 1 ? 'var(--brand-tint)' : 'transparent' }}>
                          <TableCell val={val} />
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

      <section className="py-14 sm:py-20 relative bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>{p.faq.title}</h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {p.faq.items.map((faq, i) => (
              <motion.div
                key={`faq-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl p-5 bg-[var(--bg-subtle)]"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-hover)' }} />
                  <div>
                    <div className="text-sm font-semibold mb-1.5" style={{ color: 'var(--ink-900)' }}>{faq.q}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{faq.a}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
