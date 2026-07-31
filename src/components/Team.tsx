import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, GraduationCap } from 'lucide-react';

/**
 * İsim, fotoğraf ve LinkedIn adreslerini buradan güncelleyin.
 * `photo` public klasöründeki bir yol veya dış URL olabilir.
 */
interface Person {
  name: string;
  role: string;
  focus: string;
  linkedin?: string;
  photo?: string;
}

const founders: Person[] = [
  { name: 'Ad Soyad', role: 'Kurucu Ortak · CEO', focus: 'Vizyon & Strateji' },
  { name: 'Ad Soyad', role: 'Kurucu Ortak · CTO', focus: 'Teknoloji & Altyapı' },
  { name: 'Ad Soyad', role: 'Kurucu Ortak', focus: 'Yapay Zekâ & Veri' },
  { name: 'Ad Soyad', role: 'Kurucu Ortak', focus: 'Ürün & Deneyim' },
  { name: 'Ad Soyad', role: 'Kurucu Ortak', focus: 'Büyüme & İş Geliştirme' },
];

const academicAdvisor: Person = {
  name: 'Ad Soyad',
  role: 'Akademik Danışman',
  focus: 'Finansal modelleme ve veri bilimi alanında akademik yönlendirme.',
};

const mentor: Person = {
  name: 'Ad Soyad',
  role: 'Mentör',
  focus: 'Girişimcilik, ürün stratejisi ve yatırım süreçlerinde rehberlik.',
};

const PORTRAIT_GRADIENTS = [
  'linear-gradient(160deg, #3730a3 0%, #1e1b3a 52%, #0a0912 100%)',
  'linear-gradient(160deg, #5b21b6 0%, #221a3d 52%, #0a0912 100%)',
  'linear-gradient(160deg, #4338ca 0%, #1c1a38 52%, #0a0912 100%)',
  'linear-gradient(160deg, #6d28d9 0%, #241c40 52%, #0a0912 100%)',
  'linear-gradient(160deg, #4c1d95 0%, #1d1836 52%, #0a0912 100%)',
];

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Marka diliyle çizilmiş, logo kopyası olmayan sade LinkedIn işareti. */
function LinkedInGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="1" y="1" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <circle cx="6.1" cy="6.2" r="1.15" fill="currentColor" />
      <path d="M6.1 8.9v5.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M9.9 14V11.2c0-1.3.8-2.3 2.1-2.3s2 1 2 2.3V14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.9 8.9V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInButton({ person, floating = false }: { person: Person; floating?: boolean }) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-all duration-300';
  const idle = floating
    ? 'border-white/15 bg-black/35 text-white/60 backdrop-blur-md'
    : 'border-white/10 bg-white/[0.05] text-white/55';
  const hover =
    'hover:border-violet-300/45 hover:bg-violet-400/15 hover:text-white hover:shadow-[0_0_22px_-6px_rgba(167,139,250,0.7)]';

  const inner = (
    <>
      <LinkedInGlyph size={14} />
      <span className="hidden sm:inline">LinkedIn</span>
      <ArrowUpRight size={11} className="opacity-60 transition-transform duration-300 group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5" />
    </>
  );

  if (!person.linkedin) {
    return (
      <span className={`${base} ${idle} cursor-default opacity-45`} title="LinkedIn adresi yakında eklenecek">
        {inner}
      </span>
    );
  }

  return (
    <a
      href={person.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name} LinkedIn profili`}
      className={`group/li ${base} ${idle} ${hover}`}
    >
      {inner}
    </a>
  );
}

function FounderCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* hover'da beliren gradyan çerçeve */}
      <div
        className="absolute -inset-px rounded-[1.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'linear-gradient(150deg, rgba(167,139,250,.7), rgba(99,102,241,.15) 45%, transparent 75%)' }}
        aria-hidden
      />

      <div className="relative aspect-[3/4.1] overflow-hidden rounded-[1.6rem] border border-white/[0.08]">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]"
            style={{ background: PORTRAIT_GRADIENTS[index % PORTRAIT_GRADIENTS.length] }}
            aria-hidden
          >
            <span className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 text-[3.4rem] font-bold tracking-tight text-white/[0.13]">
              {initials(person.name)}
            </span>
          </div>
        )}

        {/* okunabilirlik için alt karartma */}
        <div
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{ background: 'linear-gradient(to top, rgba(6,6,10,.96) 18%, rgba(6,6,10,.6) 55%, transparent)' }}
          aria-hidden
        />

        {/* Dokunmatik cihazlarda hover yok — küçük ekranda sürekli görünür. */}
        <div className="absolute right-2.5 top-2.5 z-10 transition-all duration-300 sm:right-3 sm:top-3 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <LinkedInButton person={person} floating />
        </div>

        <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-white/25">
          0{index + 1}
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
          <p className="text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-violet-300/80 sm:text-[9.5px] sm:tracking-[0.16em]">
            {person.focus}
          </p>
          <h3 className="mt-1.5 text-[0.95rem] font-semibold leading-tight text-white sm:text-[1.02rem]">
            {person.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-white/40 sm:text-[11.5px]">{person.role}</p>
          <span className="mt-3 block h-px w-8 bg-gradient-to-r from-violet-400/70 to-transparent transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.article>
  );
}

function GuideCard({
  person,
  icon: Icon,
  label,
  delay,
}: {
  person: Person;
  icon: typeof GraduationCap;
  label: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] p-6 transition-colors duration-500 hover:border-violet-300/20 sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: 'rgba(139,92,246,.28)' }}
        aria-hidden
      />

      <div className="relative flex items-start gap-5">
        <div className="relative h-[76px] w-[76px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10">
          {person.photo ? (
            <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/70"
              style={{ background: 'linear-gradient(150deg, #322b5e 0%, #16132a 60%, #0a0912 100%)' }}
              aria-hidden
            >
              {initials(person.name)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-violet-300/15 bg-violet-400/[0.08] px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.15em] text-violet-300">
            <Icon size={12} />
            {label}
          </div>
          <h3 className="text-[1.05rem] font-semibold text-white">{person.name}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">{person.focus}</p>
          <div className="mt-4">
            <LinkedInButton person={person} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Team() {
  return (
    <section className="relative overflow-hidden bg-[#07060b] py-16 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 12% 6%, rgba(79,70,229,.26), transparent 70%), radial-gradient(ellipse 45% 40% at 88% 78%, rgba(126,34,206,.2), transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 15%, transparent 72%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            Ekibimiz
          </div>

          <h2 className="mx-auto mt-5 max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-[-0.045em] text-white sm:mt-6 sm:text-[3.25rem]">
            Fineria Finance'in arkasındaki
            <span className="block bg-gradient-to-r from-violet-300 via-indigo-200 to-white bg-clip-text text-transparent">
              insanlar.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/45 sm:mt-6 sm:text-lg">
            Finans, mühendislik ve tasarımı aynı masada buluşturan beş kurucu ortak;
            akademik bakış ve girişimcilik deneyimiyle güçlenen tek bir ekip.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {founders.map((person, index) => (
            <FounderCard key={`${person.role}-${index}`} person={person} index={index} />
          ))}
        </div>

        <div className="my-10 flex items-center gap-4 sm:my-14 sm:gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.09]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
            Bize yön verenler
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.09]" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <GuideCard person={academicAdvisor} icon={GraduationCap} label="Akademik Danışman" delay={0} />
          <GuideCard person={mentor} icon={Compass} label="Mentör" delay={0.12} />
        </div>
      </div>
    </section>
  );
}
