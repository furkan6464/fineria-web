import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuthStore } from '@/stores/authStore';
import { isDarkUnderStatusBar } from '@/lib/themeChrome';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
    setScrolled(false);
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

  // Match ThemeChrome: sample whether a dark band is under the status strip
  const [overDark, setOverDark] = useState(
    () => location.pathname === '/' || location.pathname === '/ozellikler',
  );

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      setOverDark(isDarkUnderStatusBar());
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };
    sync();
    const boot = window.setTimeout(sync, 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.clearTimeout(boot);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  const solidNav = scrolled || mobileOpen || !overDark;
  // Text/icons follow the nav surface, not the page band under it
  const lightInk = !solidNav;
  const ink = lightInk ? 'rgba(255,255,255,0.78)' : 'var(--ink-700)';
  const inkStrong = lightInk ? '#fff' : 'var(--ink-900)';
  const active = lightInk ? '#A5B4FC' : 'var(--brand-hover)';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidNav
            ? 'border-b border-[var(--border-subtle)] bg-white/95 py-3 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-4 sm:py-5'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Logo size={30} showText={true} className="sm:hidden" textColor={inkStrong} />
            <Logo size={34} showText={true} className="hidden sm:flex" textColor={inkStrong} />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? active : ink }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: lightInk ? '#A5B4FC' : 'var(--brand)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
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
            className={`rounded-lg p-2 lg:hidden ${
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
