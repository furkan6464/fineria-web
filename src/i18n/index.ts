import { useLocaleStore, type Locale } from './localeStore';
import { en } from './en';
import { tr } from './tr';
import type { Dictionary } from './tr';

export type { Locale, Dictionary };
export { useLocaleStore };

export function getDictionary(locale: Locale): Dictionary {
  return (locale === 'en' ? en : tr) as Dictionary;
}

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = getDictionary(locale);
  const numberLocale = locale === 'en' ? 'en-US' : 'tr-TR';
  return { locale, setLocale, t, numberLocale };
}

/** Simple `{name}` interpolation for dynamic strings. */
export function interpolate(
  template: string,
  params: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  );
}
