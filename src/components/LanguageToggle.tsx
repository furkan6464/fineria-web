import { startTransition } from 'react';
import { useLocaleStore, type Locale } from '@/i18n';

interface LanguageToggleProps {
  /** Transparent dark navbar vs solid/light chrome */
  variant?: 'dark' | 'light';
  className?: string;
  compact?: boolean;
  /** Kept for API compatibility — CSS pill no longer needs layoutId */
  layoutId?: string;
}

export function LanguageToggle({
  variant = 'light',
  className = '',
  compact = false,
}: LanguageToggleProps) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const isDark = variant === 'dark';
  const enSelected = locale === 'en';

  const shell = isDark
    ? 'border-white/15 bg-white/[0.06] text-white/45'
    : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--ink-400)]';

  const pill = isDark
    ? 'bg-white shadow-[0_1px_8px_rgba(0,0,0,0.25)]'
    : 'bg-white shadow-[0_1px_6px_rgba(15,23,42,0.08)] ring-1 ring-[var(--border-subtle)]';

  const idle = isDark ? 'text-white/45' : 'text-[var(--ink-400)]';
  const activeText = isDark ? 'text-[#05060a]' : 'text-[var(--ink-900)]';

  const set = (next: Locale) => {
    if (next === locale) return;
    // Defer heavy tree updates so the toggle stays snappy on mobile
    startTransition(() => setLocale(next));
  };

  // Mobile uses compact — keep tap targets ≥40px high for easy thumbs
  const pad = compact
    ? 'min-h-10 min-w-[2.75rem] px-3.5 py-2.5 text-[12px]'
    : 'px-3 py-1.5 text-[11px]';

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-grid grid-cols-2 items-center rounded-full border p-0.5 ${shell} ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full transition-transform duration-200 ease-out will-change-transform ${pill}`}
        style={{ transform: enSelected ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {(['tr', 'en'] as const).map((code) => {
        const selected = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => set(code)}
            aria-pressed={selected}
            className={`relative z-10 touch-manipulation rounded-full font-semibold tracking-[0.08em] transition-colors duration-200 ${pad} ${
              selected ? activeText : idle
            }`}
          >
            {code === 'tr' ? 'TR' : 'EN'}
          </button>
        );
      })}
    </div>
  );
}
