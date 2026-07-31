const DARK = '#05060a';
const LIGHT = '#FFFFFF';

/** Approximate content Y under the status / nav strip. */
export const CHROME_PROBE_Y = 56;

export function isDarkUnderStatusBar(probeY = CHROME_PROBE_Y) {
  const sections = document.querySelectorAll<HTMLElement>('[data-chrome="dark"]');
  for (const section of sections) {
    const r = section.getBoundingClientRect();
    if (r.top <= probeY && r.bottom > probeY) return true;
  }
  return false;
}

export function applyThemeChrome(dark: boolean) {
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

export { DARK as THEME_CHROME_DARK, LIGHT as THEME_CHROME_LIGHT };
