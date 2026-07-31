import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DARK = '#05060a';
const LIGHT = '#FFFFFF';

function applyChrome(dark: boolean) {
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
}

/** Dark band still covers the strip under the status / nav area. */
function isDarkUnderStatusBar() {
  const probeY = 56; // roughly under the clock / top of content
  const sections = document.querySelectorAll<HTMLElement>('[data-chrome="dark"]');
  for (const section of sections) {
    const r = section.getBoundingClientRect();
    if (r.top <= probeY && r.bottom > probeY) return true;
  }
  return false;
}

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
      applyChrome(dark);
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    applyChrome(pathname === '/' || pathname === '/ozellikler');
    lastDark = pathname === '/' || pathname === '/ozellikler';

    const boot = window.setTimeout(sync, 80);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.clearTimeout(boot);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      applyChrome(false);
    };
  }, [pathname]);

  return null;
}
