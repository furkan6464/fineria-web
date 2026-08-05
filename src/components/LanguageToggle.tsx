import { motion } from 'framer-motion';
import { useTranslation, type Locale } from '@/i18n';

interface LanguageToggleProps {
  /** Transparent dark navbar vs solid/light chrome */
  variant?: 'dark' | 'light';
  className?: string;
  compact?: boolean;
  /** Unique layoutId when multiple toggles are mounted */
  layoutId?: string;
}

export function LanguageToggle({
  variant = 'light',
  className = '',
  compact = false,
  layoutId = 'lang-pill',
}: LanguageToggleProps) {
  const { locale, setLocale, t } = useTranslation();
  const isDark = variant === 'dark';

  const shell = isDark
    ? 'border-white/15 bg-white/[0.06] text-white/45'
    : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--ink-400)]';

  const active = isDark
    ? 'bg-white shadow-[0_1px_8px_rgba(0,0,0,0.25)]'
    : 'bg-white shadow-[0_1px_6px_rgba(15,23,42,0.08)] ring-1 ring-[var(--border-subtle)]';

  const idle = isDark ? 'hover:text-white/80' : 'hover:text-[var(--ink-700)]';
  const activeText = isDark ? 'text-[#05060a]' : 'text-[var(--ink-900)]';

  const set = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div
      role="group"
      aria-label={t.language.aria}
      className={`relative inline-flex items-center rounded-full border p-0.5 ${shell} ${className}`}
    >
      {(['tr', 'en'] as const).map((code) => {
        const selected = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => set(code)}
            aria-pressed={selected}
            className={`relative rounded-full font-semibold tracking-[0.08em] transition-colors duration-200 ${
              compact ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]'
            } ${selected ? activeText : idle}`}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full ${active}`}
                transition={{ type: 'spring', stiffness: 520, damping: 36 }}
              />
            )}
            <span className="relative z-10">{code === 'tr' ? t.language.tr : t.language.en}</span>
          </button>
        );
      })}
    </div>
  );
}
