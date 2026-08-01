import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyThemeChrome, shouldUseDarkChrome } from '@/lib/themeChrome';

/**
 * Syncs mobile status-bar / overscroll with hero state.
 * Transparent dark hero → black; solid white nav → white everywhere.
 */
export function ThemeChrome() {
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;
    let lastDark: boolean | null = null;

    const sync = () => {
      frame = 0;
      const dark = shouldUseDarkChrome(pathname);
      if (dark === lastDark) return;
      lastDark = dark;
      applyThemeChrome(dark);
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      applyThemeChrome(false);
    };
  }, [pathname]);

  return null;
}
