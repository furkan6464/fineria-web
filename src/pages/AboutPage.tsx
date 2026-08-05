import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Target, Users, Lightbulb, Globe2, Heart } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { Team } from '@/components/Team';
import { useTranslation } from '@/i18n';
import cozyPhoto from '@/assets/lifestyle/about-gundem-photo.webp';

const VALUE_ICONS = [Target, Lightbulb, Heart, Globe2] as const;
const ROADMAP_DONE = [true, true, true, false] as const;

export function AboutPage() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true });

  return (
    <div className="pt-24">
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-brand mb-5 w-fit">
                <Heart size={13} />
                {t.about.hero.badge}
              </div>
              <h1 className="text-responsive-hero font-extrabold mb-6" style={{ color: 'var(--ink-900)' }}>
                {t.about.hero.title}
              </h1>
              <p className="text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--ink-500)' }}>
                {t.about.hero.subtitle}
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
                alt={t.about.hero.imageAlt}
                className="w-full rounded-3xl shadow-soft-xl object-cover"
                style={{ aspectRatio: '4/3', objectPosition: '58% 50%' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: -24 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-brand mb-4 w-fit">
                <Target size={13} />
                {t.about.mission.badge}
              </div>
              <h2 className="text-responsive-section font-bold mb-6" style={{ color: 'var(--ink-900)' }}>
                {t.about.mission.title}
              </h2>
              <div className="flex flex-col gap-5">
                {t.about.mission.problems.map((item, i) => (
                  <div key={`about-item-${i}`} className="flex gap-4">
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
                {t.about.workingOn.title}
              </h3>
              {t.about.workingOn.items.map((item, i) => (
                <div key={`about-item-${i}`} className="flex gap-5 pb-6 mb-6 border-b border-[var(--border-subtle)] last:border-0 last:pb-0 last:mb-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}>
                    {String(i + 1).padStart(2, '0')}
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

      <Team />

      <section className="py-14 sm:py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Heart size={13} />
              {t.about.values.badge}
            </div>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              {t.about.values.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.values.items.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <motion.div
                  key={`value-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card card-hover p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--brand-tint)' }}>
                    <Icon size={24} style={{ color: 'var(--brand-hover)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--ink-900)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Users size={13} />
              {t.about.roadmap.badge}
            </div>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>{t.about.roadmap.title}</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border-subtle)]" />
            <div className="flex flex-col gap-6 pl-20">
              {t.about.roadmap.phases.map((item, i) => {
                const done = ROADMAP_DONE[i];
                return (
                  <motion.div
                    key={`phase-${i}`}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div
                      className="absolute -left-[52px] top-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: done ? 'var(--brand)' : 'white',
                        border: `2px solid ${done ? 'var(--brand)' : 'var(--border-strong)'}`,
                        color: done ? 'white' : 'var(--ink-400)',
                      }}
                    >
                      {done ? (
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
                        {done && (
                          <span className="text-xs font-medium ml-auto" style={{ color: 'var(--success)' }}>
                            {t.about.roadmap.done}
                          </span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--ink-500)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
