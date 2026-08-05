import { create } from 'zustand';

export type Locale = 'tr' | 'en';

const STORAGE_KEY = 'fineria.locale';

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'en' || raw === 'tr') return raw;
  } catch {
    // private mode / unavailable
  }
  return 'tr';
}

function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale;
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: 'tr',

  setLocale: (locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
    applyDocumentLocale(locale);
    set({ locale });
  },

  hydrate: () => {
    const locale = readStoredLocale();
    applyDocumentLocale(locale);
    if (get().locale !== locale) set({ locale });
  },
}));
