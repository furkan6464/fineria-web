import { Logo } from './Logo';

import type { CSSProperties } from 'react';

interface SocialIconProps {
  size?: number;
  style?: CSSProperties;
}

function LinkedinIcon({ size = 16, style }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5 5 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16, style }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, style }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M2.5 8.5a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3v-7Z" />
      <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerLinks = {
  Ürün: [
    { label: 'Özellikler', href: '/ozellikler' },
    { label: 'Piyasalar', href: '/piyasalar' },
    { label: 'Tahminleme', href: '/tahminleme' },
    { label: 'Fiyatlandırma', href: '/fiyatlar' },
  ],
  Kurumsal: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '#' },
  ],
  Yasal: [
    { label: 'Gizlilik Politikası', href: '#' },
    { label: 'Kullanım Koşulları', href: '#' },
  ],
};

const socials = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)] pb-10 pt-14 sm:pt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:gap-10 lg:mb-16 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <Logo size={34} showText={true} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--ink-500)' }}>
              Fineria Finance, bireysel yatırımcıların portföylerini tek bir platformdan
              takip etmesini sağlayan bir finansal teknoloji girişimidir.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--border-strong)] transition-colors"
                >
                  <s.icon size={16} style={{ color: 'var(--ink-500)' }} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--ink-900)' }}>{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[var(--ink-900)]"
                      style={{ color: 'var(--ink-500)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:gap-4 md:text-left">
          <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
            © 2026 Fineria Finance. Tüm hakları saklıdır.
          </p>
          <p className="text-xs" style={{ color: 'var(--ink-400)' }}>
            App Store ve Google Play · Yakında
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed" style={{ color: 'var(--ink-400)' }}>
          Fineria Finance bir yatırım tavsiyesi platformu değildir. Platformda yer alan içerikler
          bilgilendirme amaçlıdır; yatırım kararlarınızın sorumluluğu size aittir.
          Geçmiş performans gelecekteki sonuçların garantisi değildir.
        </p>
      </div>
    </footer>
  );
}
