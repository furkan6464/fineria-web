import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyThemeChrome, isDarkUnderStatusBar } from '@/lib/themeChrome';

/**
 * Syncs mobile status-bar color with the section under the clock.
 * Dark hero → black; white content → white.
 */
export function ThemeChrome() {
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;
    let lastDark: boolean | null = null;

    const sync = () => {
      frame = 0;
      const dark = isDarkUnderStatusBar();
      if (dark === lastDark) return;
      lastDark = dark;
      applyThemeChrome(dark);
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    // Assume dark for known landings until first measure
    const assumeDark = pathname === '/' || pathname === '/ozellikler';
    applyThemeChrome(assumeDark);
    lastDark = assumeDark;

    const boot = window.setTimeout(sync, 40);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.clearTimeout(boot);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      applyThemeChrome(false);
    };
  }, [pathname]);

  return null;
}
