import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuthStore } from '@/stores/authStore';
import { isDarkTopRoute } from '@/lib/themeChrome';

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Özellikler', href: '/ozellikler' },
  { label: 'Piyasalar', href: '/piyasalar' },
  { label: 'Tahminleme', href: '/tahminleme' },
  { label: 'Fiyatlandırma', href: '/fiyatlar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const darkTop = isDarkTopRoute(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
    setScrolled(false);

    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });

    // scrollTo is async relative to layout — re-check after paint
    const id = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      setScrolled(window.scrollY > 12);
    });

    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const logoutPromise = logout();
      navigate('/', { replace: true });
      await logoutPromise;
    } finally {
      setLoggingOut(false);
      setMobileOpen(false);
    }
  };

  // Dark hero pages: transparent until scroll. Everywhere else: solid white.
  const solidNav = scrolled || mobileOpen || !darkTop;
  const lightInk = !solidNav;
  const ink = lightInk ? 'rgba(255,255,255,0.78)' : 'var(--ink-700)';
  const inkStrong = lightInk ? '#fff' : 'var(--ink-900)';
  const active = lightInk ? '#A5B4FC' : 'var(--brand-hover)';

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 w-full ${
          solidNav
            ? 'border-b border-[var(--border-subtle)] bg-white pb-3'
            : 'border-b border-transparent bg-transparent pb-4 sm:pb-5'
        }`}
        style={{
          paddingTop: solidNav
            ? 'calc(env(safe-area-inset-top, 0px) + 0.75rem)'
            : 'calc(env(safe-area-inset-top, 0px) + 1.25rem)',
        }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" onClick={() => setMobileOpen(false)} className="relative z-10">
            <Logo size={30} showText={true} className="sm:hidden" textColor={inkStrong} />
            <Logo size={34} showText={true} className="hidden sm:flex" textColor={inkStrong} />
          </Link>

          {/* Viewport-centered links (independent of logo / CTA widths) */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[5] hidden -translate-x-1/2 items-center lg:flex">
            <div className="pointer-events-auto flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: isActive ? active : ink }}
                  >
                    <span className="relative inline-block pb-1">
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                          style={{ background: lightInk ? '#A5B4FC' : 'var(--brand)' }}
                          transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 hidden items-center gap-3 lg:flex">
            {isAuthenticated && user ? (
              <>
                <span className="px-2 text-sm font-semibold" style={{ color: inkStrong }}>
                  @{user.handle}
                </span>
                <Link
                  to="/hesabim"
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    lightInk
                      ? 'border border-white/15 hover:bg-white/10'
                      : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]'
                  }`}
                  style={{ color: location.pathname === '/hesabim' ? active : inkStrong }}
                >
                  Hesabım
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-70 ${
                    lightInk
                      ? 'border border-white/15 hover:bg-white/10'
                      : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]'
                  }`}
                  style={{ color: inkStrong }}
                >
                  <LogOut size={15} />
                  {loggingOut ? 'Çıkış...' : 'Çıkış Yap'}
                </button>
              </>
            ) : (
              <>
                <Link to="/giris" className="px-4 py-2.5 text-sm font-semibold" style={{ color: inkStrong }}>
                  Giriş Yap
                </Link>
                <Link to="/kayit" className="btn-primary flex items-center gap-2 !px-5 !py-2.5 text-sm">
                  Hesap Aç
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative z-10 rounded-lg p-2 lg:hidden ${
              lightInk
                ? 'border border-white/15 text-white'
                : 'border border-[var(--border-subtle)] text-[var(--ink-900)]'
            }`}
            aria-label="Menü"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 max-h-[calc(100dvh-60px)] overflow-y-auto overscroll-contain border-b border-[var(--border-subtle)] bg-white shadow-soft-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-6 sm:py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-subtle)]"
                  style={{ color: location.pathname === item.href ? 'var(--brand-hover)' : 'var(--ink-700)' }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-1 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>
                      @{user.handle}
                    </div>
                    <Link
                      to="/hesabim"
                      onClick={() => setMobileOpen(false)}
                      className="btn-secondary text-center text-sm"
                      style={{ color: location.pathname === '/hesabim' ? 'var(--brand-hover)' : undefined }}
                    >
                      Hesabım
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="btn-secondary text-center text-sm disabled:opacity-70"
                    >
                      {loggingOut ? 'Çıkış...' : 'Çıkış Yap'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/giris" onClick={() => setMobileOpen(false)} className="btn-secondary text-center text-sm">
                      Giriş Yap
                    </Link>
                    <Link to="/kayit" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-sm">
                      Hesap Aç
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
