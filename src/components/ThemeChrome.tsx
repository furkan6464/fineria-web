import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DARK = '#05060a';
const LIGHT = '#FFFFFF';

/** Paths whose first viewport is dark — match system status/home bar. */
const DARK_CHROME_PATHS = new Set(['/', '/ozellikler']);

/**
 * Keeps mobile status bar + overscroll chrome aligned with dark sections
 * so the clock/home area doesn't sit on a white strip.
 */
export function ThemeChrome() {
  const { pathname } = useLocation();

  useEffect(() => {
    const dark = DARK_CHROME_PATHS.has(pathname);
    const color = dark ? DARK : LIGHT;

    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);

    let apple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!apple) {
      apple = document.createElement('meta');
      apple.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(apple);
    }
    apple.setAttribute('content', dark ? 'black-translucent' : 'default');

    return () => {
      document.documentElement.style.backgroundColor = LIGHT;
      document.body.style.backgroundColor = LIGHT;
    };
  }, [pathname]);

  return null;
}
