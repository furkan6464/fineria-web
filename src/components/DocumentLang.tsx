import { useEffect } from 'react';
import { useLocaleStore, getDictionary } from '@/i18n';

/** Keeps <html lang> and document meta tags in sync with the active locale. */
export function DocumentLang() {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    const t = getDictionary(locale);
    document.documentElement.lang = locale;
    document.title = t.meta.documentTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:title"]', 'content', t.meta.ogTitle);
    setMeta('meta[property="og:description"]', 'content', t.meta.ogDescription);
  }, [locale]);

  return null;
}
