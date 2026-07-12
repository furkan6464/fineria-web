import { Logo } from './Logo';
import { ShieldCheck, Lock, FileCheck2 } from 'lucide-react';

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
    { label: 'Kariyer', href: '#' },
    { label: 'Basın Odası', href: '#' },
    { label: 'İletişim', href: '#' },
  ],
  Kaynaklar: [
    { label: 'Yardım Merkezi', href: '#' },
    { label: 'Ücret Tarifesi', href: '#' },
    { label: 'Sistem Durumu', href: '#' },
    { label: 'API Dokümantasyonu', href: '#' },
  ],
  Yasal: [
    { label: 'Gizlilik Politikası', href: '#' },
    { label: 'Kullanım Koşulları', href: '#' },
    { label: 'KVKK Aydınlatma Metni', href: '#' },
    { label: 'Risk Bildirim Formu', href: '#' },
  ],
};

const trustBadges = [
  { icon: ShieldCheck, label: 'BDDK Lisanslı', desc: 'Bankacılık Düzenleme ve Denetleme Kurumu gözetiminde faaliyet gösterir' },
  { icon: Lock, label: '256-bit Şifreleme', desc: 'Banka düzeyinde uçtan uca veri güvenliği' },
  { icon: FileCheck2, label: 'KVKK Uyumlu', desc: 'Kişisel verileriniz mevzuata tam uyumlu şekilde işlenir' },
];

const socials = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="pt-20 pb-10 bg-[var(--bg-subtle)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust strip */}
        <div className="grid sm:grid-cols-3 gap-6 pb-14 mb-14 border-b border-[var(--border-subtle)]">
          {trustBadges.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0">
                <item.icon size={18} style={{ color: 'var(--brand-hover)' }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{item.label}</div>
                <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Top row */}
        <div className="grid lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo size={34} showText={true} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--ink-500)' }}>
              Fineria, bireysel ve kurumsal yatırımcıların portföylerini tek bir platformdan
              yönetmesini sağlayan lisanslı bir finansal teknoloji şirketidir.
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
            © 2026 Fineria Finansal Teknolojiler A.Ş. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink-500)' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
            Tüm sistemler çalışıyor
          </div>
        </div>

        <p className="mt-6 text-xs text-center leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--ink-400)' }}>
          Fineria Finansal Teknolojiler A.Ş., Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) tarafından
          lisanslandırılmış olup sermaye piyasası faaliyetleri SPK denetimi altındadır. Yatırım
          işlemleri risk içerir; geçmiş performans gelecekteki sonuçların garantisi değildir.
        </p>
      </div>
    </footer>
  );
}
